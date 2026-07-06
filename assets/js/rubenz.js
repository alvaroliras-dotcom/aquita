/* Aquita — tema Rubenz · interacciones unificadas */
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
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }
  // Thumbnail flotante sobre los "works" de la home (firma Rubenz)
  document.querySelectorAll('.rb-work').forEach(function(w){
    var thumb = w.querySelector('.rb-thumb');
    if(!thumb) return;
    w.addEventListener('mousemove', function(ev){ thumb.style.left = ev.clientX+'px'; thumb.style.top = ev.clientY+'px'; });
    w.addEventListener('mouseenter', function(){ thumb.style.opacity='1'; thumb.style.transform='translate(-50%,-50%) scale(1)'; });
    w.addEventListener('mouseleave', function(){ thumb.style.opacity='0'; thumb.style.transform='translate(-50%,-50%) scale(.9)'; });
  });
})();
