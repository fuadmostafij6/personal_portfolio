// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scroll for Navigation Links
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

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.timeline-item, .project-card, .skill-category, .about-stats .stat'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    // Create or get a status element for user feedback
    let statusEl = document.querySelector('.form-status');
    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.className = 'form-status';
        statusEl.style.marginBottom = '12px';
        statusEl.style.fontSize = '0.95rem';
        const formWrapper = document.querySelector('.contact-form');
        formWrapper.insertBefore(statusEl, formWrapper.firstChild);
    }

    const setStatus = (text, type = 'info') => {
        statusEl.textContent = text;
        statusEl.style.color = type === 'error' ? '#dc2626' : type === 'success' ? '#059669' : '#374151';
    };

    const getFields = (form) => {
        // Prefer by id/name if available, fallback to position
        const nameInput = form.querySelector('#contact-name') || form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('#contact-email') || form.querySelector('input[type="email"]');
        const subjectInput = form.querySelector('#contact-subject') || form.querySelectorAll('input[type="text"]')[1];
        const messageInput = form.querySelector('#contact-message') || form.querySelector('textarea');
        return { nameInput, emailInput, subjectInput, messageInput };
    };

    const validate = ({ nameInput, emailInput, subjectInput, messageInput }) => {
        // Clear previous validity
        [nameInput, emailInput, subjectInput, messageInput].forEach((el) => el && el.setCustomValidity(''));

        const name = (nameInput?.value || '').trim();
        const email = (emailInput?.value || '').trim();
        const subject = (subjectInput?.value || '').trim();
        const message = (messageInput?.value || '').trim();

        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!name || name.length < 2) {
            nameInput.setCustomValidity('Please enter your name (at least 2 characters).');
            isValid = false;
        }
        if (!email || !emailRegex.test(email)) {
            emailInput.setCustomValidity('Please enter a valid email address.');
            isValid = false;
        }
        if (!subject || subject.length < 3) {
            subjectInput.setCustomValidity('Please enter a subject (at least 3 characters).');
            isValid = false;
        }
        if (!message || message.length < 10) {
            messageInput.setCustomValidity('Message should be at least 10 characters.');
            isValid = false;
        }

        if (!isValid) {
            // Report the first invalid field
            const firstInvalid = [nameInput, emailInput, subjectInput, messageInput].find((el) => !el.checkValidity());
            firstInvalid?.reportValidity();
        }

        return { isValid, name, email, subject, message };
    };

    const WEBHOOK_URL = 'http://localhost:5678/webhook-test/1b07d305-e20c-47f3-b18d-022dd1fc3389';

    const fetchWithTimeout = (resource, options = {}) => {
        const { timeout = 10000 } = options;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        return fetch(resource, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
    };

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        setStatus('Sending...', 'info');

        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.textContent = 'Sending...';

        const fields = getFields(this);
        const { isValid, name, email, subject, message } = validate(fields);
        if (!isValid) {
            setStatus('Please fix the highlighted fields and try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.textContent = originalText;
            return;
        }

        // Build FormData payload to minimize CORS preflight
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);
        formData.append('source', 'personal_portfolio');
        formData.append('submittedAt', new Date().toISOString());
        formData.append('pagePath', window.location.pathname);
        formData.append('userAgent', navigator.userAgent);

        try {
            const response = await fetchWithTimeout(WEBHOOK_URL, {
                method: 'POST',
                body: formData,
                timeout: 10000,
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            setStatus('Message sent successfully. Thank you!', 'success');
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';
            this.reset();
            // Clear custom validity after reset
            const { nameInput, emailInput, subjectInput, messageInput } = fields;
            [nameInput, emailInput, subjectInput, messageInput].forEach((el) => el && el.setCustomValidity(''));

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '#2563eb';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                setStatus('');
            }, 2500);
        } catch (err) {
            console.error('Contact form submission failed:', err);
            if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
                setStatus('Network error. Please check if n8n is running and try again.', 'error');
            } else if (err.message.includes('404')) {
                setStatus('Webhook not found. Please check if the n8n workflow is in test mode.', 'error');
            } else {
                setStatus('Failed to send. Please try again later or email me directly.', 'error');
            }
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.textContent = originalText;
        }
    });
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroName = document.querySelector('.name');
    if (heroName) {
        const nameText = heroName.textContent;
        // Small delay before starting the typing effect
        setTimeout(() => {
            typeWriter(heroName, nameText, 80);
        }, 500);
    }
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg-animation');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Skills Animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.opacity = '0';
            skill.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                skill.style.transition = 'all 0.3s ease';
                skill.style.opacity = '1';
                skill.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
}

// Trigger skills animation when skills section is in view
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when about section is in view
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat h3');
                stats.forEach(stat => {
                    const target = parseFloat(stat.textContent);
                    if (!isNaN(target)) {
                        animateCounter(stat, target);
                    }
                });
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any loading elements if they exist
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

// Add smooth hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0)';
    });
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);