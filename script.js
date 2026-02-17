// ======================================================
// 1. LÓGICA DEL MENÚ DE NAVEGACIÓN Y HAMBURGUESA
// ======================================================
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');
const dropbtn = document.querySelector('.dropbtn');
const dropdown = document.querySelector('.dropdown');

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

// 2. CIERRE AUTOMÁTICO AL HACER CLIC EN UN LINK
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

// 3. LÓGICA PARA MÚLTIPLES DROPDOWNS (Servicios y Nosotros)
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropbtn');
    if (btn) {
        btn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const isArrow = e.target.classList.contains('fa-chevron-down') || e.target.closest('.fa-chevron-down');
                if (isArrow) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Cierra otros menús abiertos
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });
                    dropdown.classList.toggle('active');
                } else {
                    // Caso: Clic en texto -> Navegar y cerrar
                    if (navList) navList.classList.remove('active');
                    const icon = mobileMenu ? mobileMenu.querySelector('i') : null;
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-xmark');
                    }
                }
            }
        });
    }
});

// Cerrar dropdowns al hacer click fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(d => d.classList.remove('active'));
    }
});

// ======================================================
// 4. LÓGICA DE LA GALERÍA DE SERVICIOS (Slider pequeño)
// ======================================================
const gallery = document.querySelector('.services-gallery');
// OJO: Aquí mantenemos 'dots' para la galería de servicios
const serviceDots = document.querySelectorAll('.dot'); 

if (gallery && serviceDots.length > 0) {
    gallery.addEventListener('scroll', () => {
        const width = gallery.clientWidth;
        const scrollPosition = gallery.scrollLeft;
        const index = Math.round(scrollPosition / width);

        serviceDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    });
}

// ======================================================
// 5. NUEVA LÓGICA DEL HERO SLIDER (PORTADA Misión/Visión)
// ======================================================
const heroContainer = document.querySelector('.hero-slider-wrapper');
const heroSlides = document.querySelectorAll('.hero-slide');
// IMPORTANTE: Usamos un nombre nuevo 'heroDots' para no chocar con el anterior
const heroDots = document.querySelectorAll('.h-dot'); 

let currentHeroSlide = 0;
let slideInterval;

// Función global para que funcione el onclick="goToSlide(x)" en el HTML
window.goToSlide = function(index) {
    currentHeroSlide = index;
    
    if (heroContainer) {
        const scrollAmount = heroContainer.clientWidth * currentHeroSlide;
        heroContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        updateHeroDots();
        resetTimer(); 
    }
}

function updateHeroDots() {
    heroDots.forEach(dot => dot.classList.remove('active'));
    if(heroDots[currentHeroSlide]) {
        heroDots[currentHeroSlide].classList.add('active');
    }
}

function nextSlide() {
    currentHeroSlide++;
    if (currentHeroSlide >= heroSlides.length) {
        currentHeroSlide = 0;
    }
    // Llamamos a la función interna sin reiniciar timer agresivamente
    if (heroContainer) {
        const scrollAmount = heroContainer.clientWidth * currentHeroSlide;
        heroContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        updateHeroDots();
    }
}

function startTimer() {
    // Solo iniciamos si existe el slider
    if (heroSlides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000); // 5 segundos
    }
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

// Detectar scroll manual en el Hero (por si alguien desliza con el dedo)
if (heroContainer) {
    heroContainer.addEventListener('scroll', () => {
        const scrollPosition = heroContainer.scrollLeft;
        const slideWidth = heroContainer.clientWidth;
        const index = Math.round(scrollPosition / slideWidth);

        if (index !== currentHeroSlide && index < heroSlides.length) {
            currentHeroSlide = index;
            updateHeroDots();
        }
    });
}

// Iniciar el automático
startTimer();