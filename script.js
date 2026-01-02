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