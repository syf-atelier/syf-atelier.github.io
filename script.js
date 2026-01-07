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

// 4. Lógica de "Doble Función" para el botón de Servicios (Dropdown)
// El 'if (dropbtn)' evita que el código falle en páginas donde no hay dropdown
if (dropbtn && dropdown) {
    dropbtn.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            // Detectamos si el clic fue en el icono de la flecha
            const isArrow = e.target.classList.contains('fa-chevron-down') || e.target.closest('i');

            if (isArrow) {
                // Caso 1: Clic en la flecha -> Desplegar sub-opciones
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
            } else {
                // Caso 2: Clic en el texto -> Navegar y CERRAR menú
                if (navList) navList.classList.remove('active');
                const icon = mobileMenu ? mobileMenu.querySelector('i') : null;
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
                
                // Redirección si estamos fuera del index
                const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
                if (!isIndex) {
                    window.location.href = 'index.html#servicios';
                }
            }
        }
    });
}

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