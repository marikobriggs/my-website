const path = window.location.pathname;
document.querySelectorAll('.sidebar-nav a, .mobile-nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  const active = href === '/' ? (path === '/' || path === '/index.html') : path.startsWith(href);
  a.classList.toggle('active', active);
});
