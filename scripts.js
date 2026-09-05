function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      document.getElementById('copyIcon').innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="#d4af37"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
      document.getElementById('copyLabel').textContent = '¡Copiado!';
      document.getElementById('copyIcon').style.color = '#d4af37';
      setTimeout(() => {
        document.getElementById('copyIcon').innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';
        document.getElementById('copyLabel').textContent = 'Copiar';
        document.getElementById('copyIcon').style.color = '';
      }, 2000);
    });
  }

  function saveContact() {
    const vcf = `BEGIN:VCARD
VERSION:3.0
FN:Alí Montalvo Avila
N:Montalvo Avila;Alí;;;
ORG:Abogados DTA
TITLE:Abogado - Esp. Derecho Administrativo y Contractual
TEL;TYPE=CELL,VOICE:+573105838217
EMAIL;TYPE=PERSONAL:alimontalvo@hotmail.com
EMAIL;TYPE=WORK:abogadosdta@gmail.com
ADR;TYPE=WORK:;;Bogotá;;; ;Colombia
NOTE:Blindaje Legal Para Quienes Protegen La Nación. Defensa · Transparencia · Acción
END:VCARD`;
    const blob = new Blob([vcf], {type: 'text/vcard'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ali_Montalvo_Avila_DTA.vcf';
    a.click();
    URL.revokeObjectURL(url);
  }
;
/* Ripple effect on every .ripple-btn */
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = (e.clientX || (rect.left + rect.width/2)) - rect.left - size/2;
      const y = (e.clientY || (rect.top  + rect.height/2)) - rect.top  - size/2;
      const circle = document.createElement('span');
      circle.classList.add('ripple-circle');
      circle.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
;
function openSvc(id) {
    document.querySelectorAll('.svc-overlay').forEach(o => o.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeSvc() {
    document.querySelectorAll('.svc-overlay').forEach(o => o.classList.remove('active'));
    document.body.style.overflow = '';
  }
  // Close on swipe down
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.svc-sheet').forEach(sheet => {
      let startY = 0;
      sheet.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, {passive:true});
      sheet.addEventListener('touchend', e => {
        if (e.changedTouches[0].clientY - startY > 60) closeSvc();
      }, {passive:true});
    });
  });
