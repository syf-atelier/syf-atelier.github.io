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


// ======================================================
// 6. ANIMACIONES AL HACER SCROLL (Intersection Observer)
// ======================================================
document.addEventListener("DOMContentLoaded", function() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento es visible en la pantalla
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Dejamos de observar el elemento para que la animación se ejecute solo una vez
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Margen de seguridad inferior
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
// ======================================================
// 7. LÓGICA DEL BOTÓN FLOTANTE (FAB) Y ACCESIBILIDAD
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Control del Menú Flotante
    const fabMain = document.getElementById('fab-main');
    const fabContainer = document.querySelector('.fab-container');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');

    if (fabMain) {
        fabMain.addEventListener('click', () => {
            fabContainer.classList.toggle('active');
            // Cierra el modal si se cierra el menú FAB
            if (!fabContainer.classList.contains('active')) {
                settingsModal.classList.remove('active');
            }
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('active');
            fabContainer.classList.remove('active'); // Oculta las bolitas
        });
    }

    if (closeSettings) {
        closeSettings.addEventListener('click', () => {
            settingsModal.classList.remove('active');
        });
    }

    // 2. Control de Tema (Modo Claro/Oscuro) con Memoria
    const themeBtn = document.getElementById('theme-btn');
    const currentTheme = localStorage.getItem('sf-theme');
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        if(themeBtn) themeBtn.innerText = 'Modo Oscuro';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeBtn.innerText = isLight ? 'Modo Oscuro' : 'Modo Claro';
            localStorage.setItem('sf-theme', isLight ? 'light' : 'dark');
        });
    }

    // 3. Control de Tamaño de Texto (+ / -) con Memoria
    const decreaseBtn = document.getElementById('text-decrease-btn');
    const increaseBtn = document.getElementById('text-increase-btn');
    const sizeDisplay = document.getElementById('text-size-display');
    
    let currentZoom = parseInt(localStorage.getItem('sf-text-zoom')) || 100;

    function applyTextZoom(zoomValue) {
        // 1. Quitar todos los tamaños anteriores
        document.body.classList.remove('text-zoom-80', 'text-zoom-90', 'text-zoom-110', 'text-zoom-120', 'text-zoom-130', 'text-zoom-140');
        
        // 2. Aplicar el nuevo tamaño si no es el 100% (default)
        if (zoomValue !== 100) {
            document.body.classList.add(`text-zoom-${zoomValue}`);
        }
        
        // 3. Actualizar el número en el menú
        if (sizeDisplay) {
            sizeDisplay.innerText = zoomValue + '%';
        }
        
        // 4. Guardar para que no se borre al cambiar de página
        localStorage.setItem('sf-text-zoom', zoomValue);
    }

    // Iniciar con el valor guardado
    applyTextZoom(currentZoom);

    // Botón Disminuir (-)
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (currentZoom > 80) { // Límite mínimo: 80%
                currentZoom -= 10;
                applyTextZoom(currentZoom);
            }
        });
    }

    // Botón Aumentar (+)
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            if (currentZoom < 140) { // Límite máximo: 140%
                currentZoom += 10;
                applyTextZoom(currentZoom);
            }
        });
    }

    // 4. Lector de Voz (Text-to-Speech)
    const ttsToggle = document.getElementById('tts-toggle');
    let ttsEnabled = false;

    if (ttsToggle) {
        ttsToggle.addEventListener('change', (e) => {
            ttsEnabled = e.target.checked;
            if (!ttsEnabled) {
                window.speechSynthesis.cancel(); // Detiene la voz si se apaga
            }
        });
    }

    // Escucha clics en la pantalla para leer el texto
    document.addEventListener('click', (e) => {
        if (!ttsEnabled) return;

        // Elementos que queremos que lea al hacer clic
        const target = e.target.closest('p, h1, h2, h3, h4, span, li, a');
        
        // Evitar que lea botones internos del panel de configuración
        if (target && !target.closest('.settings-modal')) {
            const textToRead = target.innerText;
            if (textToRead) {
                window.speechSynthesis.cancel(); // Detiene audios previos
                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.lang = 'es-CL'; // Español de Chile
                utterance.rate = 0.9;     // Velocidad un poco más relajada
                window.speechSynthesis.speak(utterance);
            }
        }
    });
});