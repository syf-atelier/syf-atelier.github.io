// 1. Selección de elementos con validación
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');
const dropbtn = document.querySelector('.dropbtn');
const dropdown = document.querySelector('.dropdown');

// 2. Lógica del Menú Hamburguesa (Abrir/Cerrar)
// Este bloque funciona en todas las páginas siempre que tengan el ID 'mobile-menu'
if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        const icon = mobileMenu.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }
    });
}

// 3. Lógica de Cierre Automático al hacer clic en un link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // EXCEPCIÓN: Si es el botón de servicios en móvil, no cerramos aún
        if (link.classList.contains('dropbtn') && window.innerWidth <= 768) {
            return; 
        }

        // Para el resto de los links, cerramos el menú
        if (navList) navList.classList.remove('active');
        
        const icon = mobileMenu ? mobileMenu.querySelector('i') : null;
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        }
    });
});

// 4. Lógica MEJORADA para Múltiples Dropdowns (Servicios y Nosotros)
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropbtn');
    
    if (btn) {
        btn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Detectamos si el clic fue en la flecha
                const isArrow = e.target.classList.contains('fa-chevron-down') || e.target.closest('.fa-chevron-down');

                if (isArrow) {
                    // Caso 1: Clic en la flecha -> Desplegar/Cerrar ESTE menú
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Cierra otros menús abiertos para que no se amontonen
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });

                    dropdown.classList.toggle('active');
                } else {
                    // Caso 2: Clic en el texto -> Navegar y CERRAR menú
                    if (navList) navList.classList.remove('active');
                    const icon = mobileMenu ? mobileMenu.querySelector('i') : null;
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-xmark');
                    }
                    
                    // Permitir la navegación natural del enlace
                }
            }
        });
    }
});

// Cerrar dropdowns al hacer click fuera (Opcional pero recomendado para UX)
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(d => d.classList.remove('active'));
    }
});

// 5. Lógica de la Galería (Slider Dots)
const gallery = document.querySelector('.services-gallery');
const dots = document.querySelectorAll('.dot');

if (gallery && dots.length > 0) {
    gallery.addEventListener('scroll', () => {
        const width = gallery.clientWidth;
        const scrollPosition = gallery.scrollLeft;
        const index = Math.round(scrollPosition / width);

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    });
}