const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

// Al hacer clic en la hamburguesa, añade o quita la clase 'active'
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    
    // Opcional: Cambia el icono de barras por una "X" al abrir
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// Cerrar el menú automáticamente al hacer clic en una opción (ancla)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});
const gallery = document.querySelector('.services-gallery');
const dots = document.querySelectorAll('.dot');

gallery.addEventListener('scroll', () => {
    // Calculamos qué tarjeta está más cerca del centro
    const width = gallery.clientWidth;
    const scrollPosition = gallery.scrollLeft;
    const index = Math.round(scrollPosition / width);

    // Limpiamos la clase 'active' de todos y se la damos al actual
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
});