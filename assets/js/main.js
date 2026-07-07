/* Aquita — interacciones + capa WOW (Jean Paul) */
(function(){
  var docEl = document.documentElement;
  docEl.classList.add('js');

  // ---- Menú móvil ----
  var burger = document.querySelector('.burger');
  var overlay = document.querySelector('.nav-overlay');
  // El overlay ya viene en el HTML (a nivel de body). Red de seguridad por si
  // alguna página no lo trajera: lo creamos en el mismo sitio para no romper
  // el z-index.
  if(!overlay){
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.setAttribute('aria-hidden','true');
    document.body.appendChild(overlay);
  }
  function setMenu(open){
    document.body.classList.toggle('menu-open', open);
    if(burger){ burger.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  }
  function toggle(){ setMenu(!document.body.classList.contains('menu-open')); }
  if(burger){ burger.addEventListener('click', toggle); }
  overlay.addEventListener('click', function(){ setMenu(false); });
  document.addEventListener('keydown', function(e){
    if((e.key === 'Escape' || e.key === 'Esc') && document.body.classList.contains('menu-open')){ setMenu(false); }
  });
  document.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click', function(){
      if(document.body.classList.contains('menu-open') && !a.parentElement.classList.contains('has-sub')){
        setMenu(false);
      }
    });
  });

  // ---- Año dinámico ----
  var y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }

  // ---- Formularios demo ----
  var CAMPOS={nombre:'Nombre',telefono:'Teléfono',plaga:'Plaga o problema',poblacion:'Población',mensaje:'Mensaje'};
  document.querySelectorAll('form[data-demo]').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var c = f.querySelector('input[name="consentimiento"]');
      if(c && !c.checked){ c.focus(); return; }
      var fd = new FormData(f), lineas = [];
      fd.forEach(function(v,k){ if(k!=='consentimiento' && String(v).trim()){ lineas.push((CAMPOS[k]||k)+': '+v); } });
      var asunto = encodeURIComponent('Solicitud desde la web de Aquita');
      var cuerpo = encodeURIComponent(lineas.join('\n')+'\n\n(Enviado desde aquita.es)');
      window.location.href = 'mailto:info@aquita.es?subject='+asunto+'&body='+cuerpo;
      var ok = f.querySelector('.form-ok');
      if(ok){ ok.style.display='block'; ok.scrollIntoView({behavior:'smooth',block:'center'}); }
      setTimeout(function(){ f.reset(); }, 400);
    });
  });

  // ---- Barra de progreso de scroll ----
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  // ---- Peek (flecha) dentro de las card-photo ----
  document.querySelectorAll('.card-photo .card-ph').forEach(function(ph){
    if(!ph.querySelector('.peek')){
      var s=document.createElement('span'); s.className='peek'; s.textContent='→'; ph.appendChild(s);
    }
  });

  var header = document.querySelector('.site-header');
  var heroCards = document.querySelectorAll('.hero-card, .brand-emblema, .hero.has-bg .wrap > h1');
  var docH = 0;
  function calc(){ docH = (document.documentElement.scrollHeight - window.innerHeight) || 1; }
  calc(); window.addEventListener('resize', calc);

  var ticking=false;
  function onScroll(){
    var sy = window.pageYOffset || docEl.scrollTop;
    // progreso
    bar.style.width = Math.min(sy/docH*100,100) + '%';
    // header shrink
    if(header){ header.classList.toggle('shrink', sy > 40); }
    // parallax suave del contenido del hero
    heroCards.forEach(function(el){
      el.style.transform = 'translate3d(0,'+(sy*0.14)+'px,0)';
    });
    ticking=false;
  }
  window.addEventListener('scroll', function(){
    if(!ticking){ requestAnimationFrame(onScroll); ticking=true; }
  }, {passive:true});

  // ---- Reveal + stagger + acentos con IntersectionObserver ----
  var animTargets = '.reveal, .grid, .stats, .steps, .section-head, .split';
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin:'0px 0px -8% 0px' });
    document.querySelectorAll(animTargets).forEach(function(el){ io.observe(el); });

    // Contadores 0 -> valor
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var el=e.target, target=parseInt(el.getAttribute('data-count'),10), suf=el.getAttribute('data-suffix')||'', dur=1600, t0=null;
        function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1); var eased=1-Math.pow(1-p,3); el.textContent=Math.floor(eased*target)+suf; if(p<1) requestAnimationFrame(step); }
        requestAnimationFrame(step); cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });
  } else {
    document.querySelectorAll(animTargets).forEach(function(el){ el.classList.add('in'); });
    document.querySelectorAll('[data-count]').forEach(function(el){ el.textContent = el.getAttribute('data-count')+(el.getAttribute('data-suffix')||''); });
  }

  onScroll();
})();
