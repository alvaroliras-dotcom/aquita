/* Aquita — interacciones mínimas */
(function(){
  // Menú móvil
  var burger = document.querySelector('.burger');
  var overlay = document.querySelector('.nav-overlay');
  function toggle(){ document.body.classList.toggle('menu-open'); }
  if(burger){ burger.addEventListener('click', toggle); }
  if(overlay){ overlay.addEventListener('click', toggle); }
  // Cerrar al pulsar un enlace del menú
  document.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click', function(){
      if(document.body.classList.contains('menu-open') && !a.parentElement.classList.contains('has-sub')){
        document.body.classList.remove('menu-open');
      }
    });
  });
  // Año dinámico en el footer
  var y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }
  // Formularios de demostración (sin backend): aviso al enviar
  document.querySelectorAll('form[data-demo]').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var ok = f.querySelector('.form-ok');
      if(ok){ ok.style.display='block'; f.reset(); ok.scrollIntoView({behavior:'smooth',block:'center'}); }
    });
  });
})();
