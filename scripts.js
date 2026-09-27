/* ============================================================
   Abogados DTA · Tarjeta digital
   Todo lo editable está en CONFIG y SERVICIOS.
   ============================================================ */

const CONFIG = {
  firma:      'Abogados DTA',
  nombre:     'Alí Montalvo Avila',
  cargo:      'Abogado',
  titulo:     'Esp. Derecho Administrativo y Contractual',
  ciudad:     'Bogotá, Colombia',
  cobertura:  'Bogotá y en toda Colombia',
  telefono:   '+573105838217',            // formato internacional sin signos
  telefonoUI: '+57 310 583 8217',
  email:      'abogadosdta@gmail.com',    // corporativo
  email2:     'alimontalvo@hotmail.com',  // personal
  sitio:      'https://konfiozinc.github.io/abogados-dta/',
  redes: {
    facebook:  'https://www.facebook.com/abogadosdta',
    instagram: 'https://www.instagram.com/abogadosdta',
    tiktok:    'https://www.tiktok.com/@abogadosdta'
  }
};

/* Los 9 servicios: título + una frase. */
const SERVICIOS = [
  { t:'Administrativo y Contractual', d:'Blindamos sus derechos frente al Estado y en sus relaciones contractuales, con experiencia en litigios contra entidades públicas y en contratos estatales.' },
  { t:'Derecho de Familia',           d:'Acompañamiento en los momentos más sensibles de la familia, con discreción y solidez jurídica: divorcios, custodia, alimentos y sucesiones.' },
  { t:'Derecho Civil',                d:'Representación de sus intereses patrimoniales con rigor técnico: contratos, bienes, obligaciones y responsabilidad civil de cualquier cuantía.' },
  { t:'Derecho Penal',                d:'Defensa técnica en todas las etapas del proceso penal, protegiendo su libertad y sus garantías constitucionales.' },
  { t:'Disciplinario',                d:'Defensa de servidores públicos ante los órganos de control disciplinario, protegiendo su carrera y reputación institucional.' },
  { t:'Accidentes de Tránsito',       d:'Reclamación de las indemnizaciones que usted merece tras un accidente, gestionando el proceso ante aseguradoras y entidades competentes.' },
  { t:'Derecho Laboral',              d:'Defensa de los derechos de los trabajadores y asesoría a empleadores en el cumplimiento de la normativa laboral vigente.' },
  { t:'Justicia Penal Militar',       d:'Defensa exclusiva para integrantes de las Fuerzas Militares y la Policía Nacional, con conocimiento del fuero penal militar.' },
  { t:'Derecho Comercial',            d:'Asesoría jurídica integral para empresas y comerciantes en todo el ciclo de vida del negocio.' }
];

/* Galería del carrusel: reemplace los archivos en assets/galeria/ por sus fotos
   (mismo nombre) o cambie aquí las rutas. */
const GALERIA = [
  { src:'assets/galeria/slide-01.jpg', t:'Abogados DTA',                    d:'Alí Montalvo Avila · Blindaje Legal Para Quienes Protegen La Nación.' },
  { src:'assets/galeria/slide-02.jpg', t:'Administrativo y Contractual',    d:'Litigios contra el Estado y contratos estatales.' },
  { src:'assets/galeria/slide-03.jpg', t:'Derecho Penal',                   d:'Defensa técnica en todas las etapas del proceso penal.' },
  { src:'assets/galeria/slide-04.jpg', t:'Derecho de Familia',              d:'Divorcios, custodia, alimentos y sucesiones.' },
  { src:'assets/galeria/slide-05.jpg', t:'Derecho Laboral',                 d:'Despidos, prestaciones y seguridad social.' },
  { src:'assets/galeria/slide-06.jpg', t:'Accidentes de Tránsito',          d:'Reclamación de indemnizaciones ante aseguradoras.' }
];

/* ── utilidades ── */
const $  = (s) => document.querySelector(s);
const waLink = (msg) => 'https://wa.me/' + CONFIG.telefono + (msg ? '?text=' + encodeURIComponent(msg) : '');
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function toast(txt){
  const t = $('#toast');
  t.textContent = txt;
  t.classList.add('show');
  clearTimeout(window.__tToast);
  window.__tToast = setTimeout(() => t.classList.remove('show'), 2300);
}

/* ── modal único ── */
const overlay = $('#overlay');
const mTitulo = $('#modalTitulo');
const mBody   = $('#modalBody');
let ultimoFoco = null;

function abrirModal(titulo, html){
  ultimoFoco = document.activeElement;
  mTitulo.textContent = titulo;
  mBody.innerHTML = html;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    const f = overlay.querySelector('.cerrar');
    if (f) f.focus({ preventScroll: true });
  }, 60);
}
function cerrarModal(){
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus({ preventScroll: true });
}

/* ── servicios (acordeón) ── */
function abrirServicios(){
  const items = SERVICIOS.map((s, i) => `
    <div class="acc-item">
      <button class="acc-head" type="button" aria-expanded="false" data-acc="${i}">
        <span class="acc-num">${i + 1}</span>
        <span>${esc(s.t)}</span>
        <span class="chev" aria-hidden="true">▼</span>
      </button>
      <div class="acc-body">
        <p>${esc(s.d)}</p>
        <a class="row" href="${waLink('Hola Dr. Alí, necesito asesoría en ' + s.t + '.')}" target="_blank" rel="noopener">
          <span class="ic" aria-hidden="true">💬</span>
          <span><b>Consultar este tema</b><small>Respuesta directa por WhatsApp</small></span>
        </a>
      </div>
    </div>`).join('');
  abrirModal('Servicios Jurídicos', items + '<p class="sheet-foot">Cada consulta se atiende de forma confidencial.</p>');
}

/* ── sobre el abogado ── */
function abrirSobre(){
  abrirModal('Sobre el Abogado', `
    <div class="row">
      <span class="ic" aria-hidden="true">⚖️</span>
      <span><b>${esc(CONFIG.nombre)}</b><small>${esc(CONFIG.cargo)} · ${esc(CONFIG.firma)}</small></span>
    </div>
    <div class="row">
      <span class="ic" aria-hidden="true">🎓</span>
      <span><b>Especialización</b><small>${esc(CONFIG.titulo)}</small></span>
    </div>
    <div class="row">
      <span class="ic" aria-hidden="true">📍</span>
      <span><b>Atención</b><small>${esc(CONFIG.cobertura)}</small></span>
    </div>
    <div class="row">
      <span class="ic" aria-hidden="true">📞</span>
      <span><b>${esc(CONFIG.telefonoUI)}</b><small>Llamadas y WhatsApp</small></span>
    </div>
    <a class="row" href="mailto:${CONFIG.email}">
      <span class="ic" aria-hidden="true">✉️</span>
      <span><b>${esc(CONFIG.email)}</b><small>Correo corporativo</small></span>
    </a>
    <p class="hint">"Blindaje Legal Para Quienes Protegen La Nación"<br>Defensa · Transparencia · Acción</p>`);
}

/* ── compartir (QR + redes + vCard) ── */
function abrirCompartir(){
  const url  = CONFIG.sitio;
  const qr   = 'https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=10&data=' + encodeURIComponent(url);
  const txt  = 'Tarjeta digital del Dr. ' + CONFIG.nombre + ' – ' + CONFIG.firma + ' · ' + CONFIG.telefonoUI;
  abrirModal('Compartir Tarjeta', `
    <div class="qr-box"><img src="${qr}" alt="Código QR de la tarjeta digital de ${esc(CONFIG.nombre)}" width="180" height="180" loading="lazy"></div>
    <p class="hint">Escanee el código o comparta el enlace directo.</p>

    <button class="row" type="button" id="btnNativo">
      <span class="ic" aria-hidden="true">📤</span>
      <span><b>Compartir ahora</b><small>WhatsApp, correo, redes y más</small></span>
    </button>
    <button class="row" type="button" id="btnCopiar">
      <span class="ic" aria-hidden="true">🔗</span>
      <span><b>Copiar enlace</b><small>${esc(url.replace('https://', ''))}</small></span>
    </button>
    <a class="row" href="https://api.whatsapp.com/send?text=${encodeURIComponent(txt + ' ' + url)}" target="_blank" rel="noopener">
      <span class="ic" aria-hidden="true">💬</span>
      <span><b>Enviar por WhatsApp</b><small>Recomendar este contacto</small></span>
    </a>
    <button class="row" type="button" id="btnVcard2">
      <span class="ic" aria-hidden="true">👤</span>
      <span><b>Guardar contacto</b><small>Agregar a la agenda (vCard)</small></span>
    </button>
    <div class="gold-sep" aria-hidden="true"><span>REDES</span></div>
    <a class="row" href="${CONFIG.redes.facebook}" target="_blank" rel="noopener"><span class="ic" aria-hidden="true">f</span><span><b>Facebook</b><small>@abogadosdta</small></span></a>
    <a class="row" href="${CONFIG.redes.instagram}" target="_blank" rel="noopener"><span class="ic" aria-hidden="true">◎</span><span><b>Instagram</b><small>@abogadosdta</small></span></a>
    <a class="row" href="${CONFIG.redes.tiktok}" target="_blank" rel="noopener"><span class="ic" aria-hidden="true">♪</span><span><b>TikTok</b><small>@abogadosdta</small></span></a>
    <p class="sheet-foot">${esc(CONFIG.firma)} · ${esc(CONFIG.ciudad)}</p>`);

  $('#btnNativo').onclick = async () => {
    const data = { title: CONFIG.firma + ' – ' + CONFIG.nombre, text: txt, url };
    if (navigator.share) {
      try { await navigator.share(data); } catch (e) { /* cancelado */ }
    } else {
      copiar(url);
    }
  };
  $('#btnCopiar').onclick = () => copiar(url);
  $('#btnVcard2').onclick = guardarContacto;
}

function copiar(texto){
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto).then(() => toast('Enlace copiado ✓'), () => toast('Copie: ' + texto));
  } else {
    const t = document.createElement('textarea');
    t.value = texto; t.setAttribute('readonly', '');
    t.style.position = 'absolute'; t.style.left = '-9999px';
    document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); toast('Enlace copiado ✓'); }
    catch (e) { toast('Copie: ' + texto); }
    document.body.removeChild(t);
  }
}

/* ── guardar contacto (vCard) ── */
function guardarContacto(){
  const v = [
    'BEGIN:VCARD', 'VERSION:3.0',
    'N:Montalvo Avila;Alí;;;',
    'FN:' + CONFIG.nombre,
    'ORG:' + CONFIG.firma,
    'TITLE:' + CONFIG.cargo + ' - ' + CONFIG.titulo,
    'TEL;TYPE=CELL,VOICE:' + CONFIG.telefono,
    'EMAIL;TYPE=WORK:' + CONFIG.email,
    'EMAIL;TYPE=PERSONAL:' + CONFIG.email2,
    'ADR;TYPE=WORK:;;' + CONFIG.ciudad + ';;;Colombia',
    'URL:' + CONFIG.sitio,
    'NOTE:' + CONFIG.firma + ' - Blindaje Legal Para Quienes Protegen La Nación.',
    'END:VCARD'
  ].join('\r\n');
  const blob = new Blob([v], { type: 'text/vcard;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Ali-Montalvo-Avila-Abogados-DTA.vcf';
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1200);
  toast('Abriendo contacto para guardar…');
}

/* ── carrusel automático ── */
function iniciarCarrusel(){
  const pista  = $('#pista');
  const puntos = $('#cPuntos');
  if (!pista || !GALERIA.length) return;

  pista.innerHTML = GALERIA.map((s, i) => `
    <figure class="slide" data-i="${i}">
      <img src="${s.src}" alt="${esc(s.t)}. ${esc(s.d)}" width="1000" height="750" decoding="async">
    </figure>`).join('');

  puntos.innerHTML = GALERIA.map((s, i) =>
    `<button class="punto${i === 0 ? ' on' : ''}" type="button" data-ir="${i}" aria-label="Ver imagen ${i + 1}: ${esc(s.t)}"${i === 0 ? ' aria-current="true"' : ''}></button>`
  ).join('');

  let i = 0, timer = null, pausado = false, reanudar = null;
  const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ir(n){
    i = (n + GALERIA.length) % GALERIA.length;
    pista.style.transform = 'translateX(' + (-i * 100) + '%)';
    puntos.querySelectorAll('.punto').forEach((p, k) => {
      p.classList.toggle('on', k === i);
      if (k === i) { p.setAttribute('aria-current', 'true'); } else { p.removeAttribute('aria-current'); }
    });
  }
  function pausarTemporal(ms){
    pausado = true;
    clearTimeout(reanudar);
    reanudar = setTimeout(() => { pausado = false; }, ms);
  }
  function tick(){
    if (pausado || document.hidden || overlay.classList.contains('active')) return;
    ir(i + 1);
  }
  function arrancar(){
    if (reducir || timer) return;
    timer = setInterval(tick, 4200);
  }

  $('#cPrev').onclick = () => { ir(i - 1); pausarTemporal(9000); };
  $('#cNext').onclick = () => { ir(i + 1); pausarTemporal(9000); };
  puntos.addEventListener('click', (e) => {
    const b = e.target.closest('.punto');
    if (!b) return;
    ir(Number(b.dataset.ir));
    pausarTemporal(9000);
  });

  // Deslizar con el dedo
  let x0 = null, movido = false;
  const carrusel = $('#carrusel');
  carrusel.addEventListener('pointerdown', (e) => { x0 = e.clientX; movido = false; });
  carrusel.addEventListener('pointermove', (e) => {
    if (x0 === null) return;
    if (Math.abs(e.clientX - x0) > 8) movido = true;
  });
  carrusel.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40){ ir(dx < 0 ? i + 1 : i - 1); pausarTemporal(9000); }
  });
  carrusel.addEventListener('pointercancel', () => { x0 = null; });

  // Pausa al pasar el mouse o al enfocar controles
  carrusel.addEventListener('pointerenter', () => { pausado = true; });
  carrusel.addEventListener('pointerleave', () => { pausado = false; });
  carrusel.addEventListener('focusin',    () => { pausado = true; });
  carrusel.addEventListener('focusout',   () => { pausado = false; });

  // Tocar una imagen la abre en grande
  pista.addEventListener('click', (e) => {
    const fig = e.target.closest('.slide');
    if (!fig || movido) return;
    const s = GALERIA[Number(fig.dataset.i)];
    abrirModal(s.t, `<img class="foto-full" src="${s.src}" alt="${esc(s.t)}. ${esc(s.d)}" width="1000" height="750">
      <p class="hint">${esc(s.d)}</p>`);
  });

  ir(0);
  arrancar();
}

/* ── arranque ── */
document.addEventListener('DOMContentLoaded', () => {
  $('#aWhatsapp').href = waLink('Hola Dr. Alí, vi su tarjeta digital y necesito asesoría legal.');
  $('#fabWa').href     = waLink('Hola Dr. Alí, necesito asesoría legal.');
  $('#aMapa').href     = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONFIG.ciudad);
  $('#aCorreo').href   = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent('Consulta jurídica – ' + CONFIG.firma);
  $('#anio').textContent = new Date().getFullYear();

  iniciarCarrusel();

  $('#btnServicios').onclick = abrirServicios;
  $('#btnSobre').onclick     = abrirSobre;
  $('#btnCompartir').onclick = abrirCompartir;
  $('#btnGuardar').onclick   = guardarContacto;
  $('#btnCerrar').onclick    = cerrarModal;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) cerrarModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('active')) cerrarModal(); });

  // Acordeón de servicios (delegado: funciona con el modal re-renderizado)
  mBody.addEventListener('click', (e) => {
    const head = e.target.closest('.acc-head');
    if (!head) return;
    const item = head.parentElement;
    const estabaAbierto = item.classList.contains('open');
    mBody.querySelectorAll('.acc-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
    });
    if (!estabaAbierto) {
      item.classList.add('open');
      head.setAttribute('aria-expanded', 'true');
    }
  });

  // Feedback táctil sobrio
  document.querySelectorAll('.ripple-btn').forEach(el => {
    el.addEventListener('pointerdown',   () => { el.style.opacity = '.82'; });
    el.addEventListener('pointerup',     () => { el.style.opacity = ''; });
    el.addEventListener('pointercancel', () => { el.style.opacity = ''; });
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').catch(() => {});
    });
  }
});

/* ============================================================
   Google Analytics 4 · eventos personalizados
   Clic en WhatsApp (wa.me y api.whatsapp.com). Delegado en document para
   cubrir también enlaces creados en tiempo de ejecución. Sin datos personales.
   ============================================================ */
function dtaTrack(nombre, etiqueta) {
  try {
    if (typeof gtag === 'function') {
      gtag('event', nombre, {
        event_category: 'engagement',
        event_label: etiqueta,
        value: 1,
        transport_type: 'beacon'
      });
    }
  } catch (e) { /* el tracking nunca debe romper la página */ }
}

document.addEventListener('click', (e) => {
  const a = (e.target && e.target.closest)
    ? e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp.com/send"]')
    : null;
  if (!a) return;
  let etiqueta = 'otro';
  const texto = (a.textContent || '').toLowerCase();
  if (a.closest('footer')) etiqueta = 'footer';
  else if (a.closest('header') || a.closest('.card-top')) etiqueta = 'encabezado';
  else if (texto.indexOf('compartir') !== -1 || a.getAttribute('href').indexOf('api.whatsapp.com') !== -1) etiqueta = 'compartir';
  else if (a.closest('.servicio') || a.closest('.acordeon') || a.closest('.item')) etiqueta = 'servicio';
  else if (a.closest('.botonera') || a.closest('.acciones') || a.closest('.cta')) etiqueta = 'boton_principal';
  dtaTrack('click_whatsapp', etiqueta);
});
