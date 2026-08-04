document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // TYPEWRITER EFFECT
    // ==========================================================================
    const typeTextEl = document.getElementById('type-text');
    const words = ["Embedded Systems", "Self-Balancing Robots", "MATLAB & Simulink", "Electrical Design"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typeTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50; // Deleting is faster
        } else {
            typeTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 120; // Normal typing speed
        }

        // Handle word completions
        if (!isDeleting && charIndex === currentWord.length) {
            typeDelay = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 300; // Pause before next word starts typing
        }

        setTimeout(typeEffect, typeDelay);
    }
    
    // Start Typing
    if (typeTextEl) {
        setTimeout(typeEffect, 1000);
    }

    // ==========================================================================
    // MOBILE NAVBAR TOGGLE
    // ==========================================================================
    const navToggle = document.getElementById('nav-menu-toggle');
    const navMenu = document.getElementById('nav-navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on clicking any navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu if clicked anywhere outside the navbar
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ==========================================================================
    // ACTIVE NAVIGATION LINKS ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');

    function highlightNavMenu() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for header height
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
                if (activeLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightNavMenu);

    // ==========================================================================
    // SKILLS TAB MODULE
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.skill-tab-btn');
    const tabContents = document.querySelectorAll('.skill-tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabButtons.forEach(button => button.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab button
            btn.classList.add('active');

            // Show active tab content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // COPY TO CLIPBOARD EMAIL WIDGET
    // ==========================================================================
    const copyBtn = document.getElementById('btn-copy-email');
    const copyFeedback = document.getElementById('email-feedback');

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = copyBtn.getAttribute('data-email');
            
            // Clipboard API
            navigator.clipboard.writeText(email).then(() => {
                // Show feedback message
                if (copyFeedback) {
                    copyFeedback.style.display = 'block';
                    copyBtn.querySelector('.btn-text').textContent = 'Email Copied!';
                    
                    // Reset feedback after 3 seconds
                    setTimeout(() => {
                        copyFeedback.style.display = 'none';
                        copyBtn.querySelector('.btn-text').textContent = 'Copy Email Address';
                    }, 3000);
                }
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // ==========================================================================
    // ENTRANCE ANIMATION ON SCROLL (REVEAL)
    // ==========================================================================
    const animElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    animElements.forEach(el => {
        // Initialize hidden state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        revealObserver.observe(el);
    });

    // CSS rule for revealed elements
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .animate-on-scroll.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
