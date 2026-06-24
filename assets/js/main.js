/* Aquita — tema PestRaid · interacciones */
(function(){
  // Menú móvil
  var burger = document.querySelector('.burger');
  var overlay = document.querySelector('.nav-overlay');
  function toggle(){ document.body.classList.toggle('menu-open'); }
  if(burger){ burger.addEventListener('click', toggle); }
  if(overlay){ overlay.addEventListener('click', toggle); }
  document.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click', function(){
      if(document.body.classList.contains('menu-open') && !a.parentElement.classList.contains('has-sub')){
        document.body.classList.remove('menu-open');
      }
    });
  });
  // Año dinámico
  var y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }
  // Formularios demo
  document.querySelectorAll('form[data-demo]').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var ok = f.querySelector('.form-ok');
      if(ok){ ok.style.display='block'; f.reset(); ok.scrollIntoView({behavior:'smooth',block:'center'}); }
    });
  });
  // Reveal on scroll
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

    // Contadores animados (0 -> valor)
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var el = e.target, target = parseInt(el.getAttribute('data-count'),10), suf = el.getAttribute('data-suffix')||'', dur=1400, t0=null;
        function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1); el.textContent = Math.floor(p*target)+suf; if(p<1) requestAnimationFrame(step); }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
    document.querySelectorAll('[data-count]').forEach(function(el){ el.textContent = el.getAttribute('data-count')+(el.getAttribute('data-suffix')||''); });
  }
})();
