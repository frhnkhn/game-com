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
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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
});
