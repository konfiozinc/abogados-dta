/* Servidor local de desarrollo — DTA Abogados (recarga automática)
   Uso: node _dta_server.js   (puerto 8178, variable DTA_PORT) */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.DTA_PORT || 8178;
const ROOT = path.resolve(__dirname);
const DEFAULT = 'DTA_Abogados.html';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
  '.vcf': 'text/vcard; charset=utf-8', '.txt': 'text/plain; charset=utf-8'
};

function huella() {
  let max = 0;
  const pila = [ROOT];
  while (pila.length) {
    const dir = pila.pop();
    let entradas;
    try { entradas = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { continue; }
    for (const e of entradas) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { pila.push(p); continue; }
      try { max = Math.max(max, fs.statSync(p).mtimeMs); } catch (err) { /* ignorar */ }
    }
  }
  return max;
}

const reloader = '<script>(function(){var v=null;setInterval(function(){fetch(\'/__version\',{cache:\'no-store\'}).then(function(r){return r.json()}).then(function(d){if(v===null){v=d.v}else if(d.v!==v){location.reload()}}).catch(function(){})},900)})();</scr' + 'ipt>';

const server = http.createServer(function (req, res) {
  const ruta = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  if (ruta === '/__version') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ v: huella() }));
    return;
  }

  let archivo = path.normalize(path.join(ROOT, ruta === '/' ? DEFAULT : ruta));
  if (!archivo.startsWith(ROOT)) { archivo = path.join(ROOT, DEFAULT); }

  if (fs.existsSync(archivo) && fs.statSync(archivo).isDirectory()) {
    archivo = path.join(archivo, DEFAULT);
  }
  if (!fs.existsSync(archivo)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 - No encontrado: ' + ruta);
    return;
  }

  const tipo = MIME[path.extname(archivo).toLowerCase()] || 'application/octet-stream';
  fs.readFile(archivo, function (err, datos) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 - Error leyendo archivo');
      return;
    }
    let cuerpo = datos;
    if (tipo.startsWith('text/html')) {
      cuerpo = Buffer.from(datos.toString('utf8').replace('</body>', reloader + '</body>'));
    }
    res.writeHead(200, {
      'Content-Type': tipo,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(cuerpo);
  });
});

server.listen(PORT, '127.0.0.1', function () {
  console.log('OK · Sirviendo: http://127.0.0.1:' + PORT);
  console.log('Carpeta raíz: ' + ROOT);
  console.log('Recarga automática activa.');
});
