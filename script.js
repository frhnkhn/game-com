/**
 * GAMECOM Website Script
 * Vanilla JavaScript implementation for interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.click();
            }
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        
        lastScroll = currentScroll;
    });

    // 3. Scroll Animations (Fade Up)
    const fadeElements = document.querySelectorAll('.fade-up');

    const fadeObserverOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // 4. Active Nav Link Update on Scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (navLink && !navLink.classList.contains('btn')) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // 5. Countdown Timer
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMinutes = document.getElementById('cd-minutes');
    const cdSeconds = document.getElementById('cd-seconds');

    if (cdDays && cdHours && cdMinutes && cdSeconds) {
        // Set target date to October 8, 2026 10:00 AM
        const targetDate = new Date('October 8, 2026 10:00:00');

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                return; // Timer ended
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            cdDays.innerText = days.toString().padStart(2, '0');
            cdHours.innerText = hours.toString().padStart(2, '0');
            cdMinutes.innerText = minutes.toString().padStart(2, '0');
            cdSeconds.innerText = seconds.toString().padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // 6. Lightbox Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.querySelector('.close-lightbox');

    if (lightbox && closeLightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const lightboxContent = lightbox.querySelector('.lightbox-content');
                
                if (img) {
                    lightboxContent.innerHTML = `<img src="${img.src}" class="lightbox-img" alt="${img.alt || 'Gallery Image'}">`;
                } else {
                    lightboxContent.innerHTML = `<div class="placeholder-img lightbox-img">FULL SIZE IMAGE</div>`;
                }
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close on clicking outside the content
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 7. Contact Form Validation and Fake Submit
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation is handled by HTML5 'required' attributes

            // Simulate API call / processing
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'SENDING...';
            btn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;

                formSuccess.style.display = 'block';

                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // 8. Parallax Effect for Hero Elements
    const heroBg = document.getElementById('hero-bg');
    const parallaxElements = document.querySelectorAll('.parallax-element');

    if (heroBg && parallaxElements.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.05;
                // Scale down the effect significantly for a subtle liquid glass feel
                el.style.transform = `translateX(${x * speed * 15}px) translateY(${y * speed * 15}px)`;
            });
        });
    }

    // 9. Session Details Modal
    const sessionDetailsBtns = document.querySelectorAll('.details-btn');
    const sessionModal = document.getElementById('session-modal');
    const closeSessionModal = document.querySelector('.close-session-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalIcon = document.getElementById('modal-icon');

    if (sessionModal && sessionDetailsBtns.length > 0) {
        sessionDetailsBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Traverse up to find the session card content
                const sessionContent = btn.closest('.session-content');
                if (sessionContent) {
                    const title = sessionContent.querySelector('h3').innerText;
                    
                    // Look for a hidden full description, otherwise fallback to the short paragraph
                    const fullDescEl = sessionContent.querySelector('.session-full-desc');
                    const desc = fullDescEl ? fullDescEl.innerHTML : sessionContent.querySelector('p').innerText;
                    
                    const icon = sessionContent.querySelector('.session-icon').className;

                    // Update modal content
                    modalTitle.innerText = title;
                    modalDesc.innerHTML = desc;
                    modalIcon.innerHTML = `<i class="${icon}"></i>`;
                }

                sessionModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close modal functions
        const closeModal = () => {
            sessionModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (closeSessionModal) {
            closeSessionModal.addEventListener('click', closeModal);
        }

        // Close on clicking outside the content
        sessionModal.addEventListener('click', (e) => {
            if (e.target === sessionModal) {
                closeModal();
            }
        });
    }

    // 10. Past Event Details Modal
    const viewPeBtns = document.querySelectorAll('.view-pe-btn');
    const peModal = document.getElementById('past-event-modal');
    const closePeModal = document.querySelector('.close-pe-modal');
    const peModalTitle = document.getElementById('pe-modal-title');
    const peModalDate = document.getElementById('pe-modal-date');
    const peModalDesc = document.getElementById('pe-modal-desc');
    const peModalImg = document.getElementById('pe-modal-img');

    if (peModal && viewPeBtns.length > 0) {
        viewPeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const eventCard = btn.closest('.past-event-card');
                if (eventCard) {
                    const title = eventCard.querySelector('h4').innerText;
                    const date = eventCard.querySelector('span').innerText;
                    
                    const fullDescEl = eventCard.querySelector('.pe-full-desc');
                    const desc = fullDescEl ? fullDescEl.innerHTML : eventCard.querySelector('p').innerText;
                    
                    const imgEl = eventCard.querySelector('.pe-image img');
                    
                    peModalTitle.innerText = title;
                    peModalDate.innerText = date;
                    peModalDesc.innerHTML = desc;
                    
                    if (imgEl) {
                        peModalImg.src = imgEl.src;
                        peModalImg.style.display = 'block';
                        peModalImg.parentElement.style.display = 'block';
                    } else {
                        peModalImg.style.display = 'none';
                        peModalImg.parentElement.style.display = 'none';
                    }
                }

                peModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeEventModal = () => {
            peModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (closePeModal) {
            closePeModal.addEventListener('click', closeEventModal);
        }

        peModal.addEventListener('click', (e) => {
            if (e.target === peModal) {
                closeEventModal();
            }
        });
    }
});

window.addEventListener('scroll', () => {
    const bar = document.getElementById('scrollProgress');
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (bar) bar.style.width = scrolled + '%';
});