// Gestione del popup del form di contatto
function openContactPopup() {
    document.getElementById('contactPopup').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactPopup() {
    document.getElementById('contactPopup').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners per il popup
document.addEventListener('DOMContentLoaded', function() {
    // Chiudi popup con il pulsante X
    document.querySelector('.close-popup').addEventListener('click', closeContactPopup);
    
    // Chiudi popup cliccando fuori
    document.getElementById('contactPopup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeContactPopup();
        }
    });
    
    // Gestione del form
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostra indicatore di caricamento
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;
        
        // Raccogli i dati del form
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Invia i dati usando Formspree
        fetch('https://formspree.io/f/xkgzdnoz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                message: message,
                _subject: `Nuovo messaggio da ${name} - YRoute69`
            })
        })
        .then(response => {
            if (response.ok) {
                // Successo
                alert('Grazie per l\'iscrizione. Ti aggiorneremo appena sarà pronta la prima versione in anteprima');
                this.reset();
                closeContactPopup();
            } else {
                throw new Error('Errore nell\'invio');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            alert('Si è verificato un errore. Riprova più tardi o contattaci direttamente a info@yroute69.com');
        })
        .finally(() => {
            // Ripristina il pulsante
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
    
    // Animazioni al scroll
    initScrollAnimations();
    
    // Smooth scroll per i link interni
    initSmoothScroll();
    
    // Interazioni con le card dei servizi
    initServiceCards();
});

// Animazioni al scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Osserva tutte le sezioni
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Osserva elementi specifici
    document.querySelectorAll('.feature-card, .diamond-card, .character').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Interazioni con le card dei servizi
function initServiceCards() {
    document.querySelectorAll('.diamond-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            console.log('Categoria selezionata:', category);
            
            // Aggiungi effetto di selezione
            document.querySelectorAll('.diamond-card').forEach(c => {
                c.style.transform = 'rotate(45deg) scale(1)';
            });
            this.style.transform = 'rotate(45deg) scale(1.2)';
            
            // Reset dopo 1 secondo
            setTimeout(() => {
                this.style.transform = 'rotate(45deg) scale(1)';
            }, 1000);
        });
    });
}

// Parallax effect per la sezione hero
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .image-collage, .destination-images');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Animazione del testo della hero section
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Avvia l'effetto quando la sezione è visibile
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(heroTitle);
    }
}

// Contatore animato per le statistiche
function initCounters() {
    const counters = document.querySelectorAll('.interest-item span');
    
    const animateCounter = (element) => {
        const text = element.textContent;
        const percentage = parseInt(text.match(/\d+/)[0]);
        const prefix = text.replace(/\d+%/, '');
        
        let current = 0;
        const increment = percentage / 50;
        
        const updateCounter = () => {
            if (current < percentage) {
                current += increment;
                element.textContent = `${prefix}${Math.floor(current)}%`;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = text;
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Effetto hover per i pulsanti
function initButtonEffects() {
    document.querySelectorAll('.btn-primary, .btn-black, .book-btn, .get-started-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Gestione del form di ricerca
function initSearchForm() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        const inputs = searchForm.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }
}

// Animazione delle immagini al caricamento
function initImageAnimations() {
    const images = document.querySelectorAll('.img-1, .img-2, .img-3, .img-4, .img-5, .dest-img');
    
    images.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            img.style.transition = 'all 0.8s ease';
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Effetto di scorrimento fluido per la sezione app
function initAppScroll() {
    const appContent = document.querySelector('.app-content');
    if (appContent) {
        let isScrolling = false;
        
        appContent.addEventListener('wheel', function(e) {
            if (!isScrolling) {
                isScrolling = true;
                
                const scrollAmount = e.deltaY > 0 ? 100 : -100;
                this.scrollLeft += scrollAmount;
                
                setTimeout(() => {
                    isScrolling = false;
                }, 100);
            }
        });
    }
}

// Inizializzazione di tutte le funzionalità
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initTypewriterEffect();
    initCounters();
    initButtonEffects();
    initSearchForm();
    initImageAnimations();
    initAppScroll();
    initDashboardCarousel();
    
    // Aggiungi classe per animazioni CSS
    document.body.classList.add('loaded');
});

// Gestione responsive per il menu mobile (se necessario)
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Utility per il debug
function debugInfo() {
    console.log('Route69 Landing Page - Debug Info:');
    console.log('Sections found:', document.querySelectorAll('section').length);
    console.log('Feature cards:', document.querySelectorAll('.feature-card').length);
    console.log('Diamond cards:', document.querySelectorAll('.diamond-card').length);
    console.log('Characters:', document.querySelectorAll('.character').length);
}

// Carosello automatico per dashboard
function initDashboardCarousel() {
    const carousel = document.querySelector('.simple-carousel');
    console.log('Carosello trovato:', carousel);
    
    if (!carousel) {
        console.log('Carosello non trovato!');
        return;
    }
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    console.log('Slide trovate:', slides.length);
    console.log('Indicatori trovati:', indicators.length);
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Nascondi tutte le slide
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Mostra la slide corrente
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Cambia slide ogni 4 secondi
    setInterval(nextSlide, 4000);
    
    // Click sugli indicatori
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Esporta funzioni per uso esterno
window.Route69 = {
    openContactPopup,
    closeContactPopup,
    debugInfo
};
