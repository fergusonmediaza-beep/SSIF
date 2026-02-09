// ============================================
// SIDEBAR NAVIGATION
// ============================================
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const navLinks = document.querySelectorAll('.nav-link');

// Open sidebar
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    menuToggle.classList.add('active');
});

// Close sidebar
closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
    menuToggle.classList.remove('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Handle navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Smooth scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Close sidebar on mobile
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ============================================
// ACTIVE SECTION TRACKING
// ============================================
const sections = document.querySelectorAll('section[id]');
const desktopNavLinks = document.querySelectorAll('.desktop-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Update sidebar active link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Update desktop nav active link
    desktopNavLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--color-secondary)';
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        e.preventDefault();
        
        const targetId = href;
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// ASSET CARD INTERACTIONS
// ============================================
const assetCards = document.querySelectorAll('.asset-card');

assetCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// STAT CARDS COUNTER ANIMATION
// ============================================
const statValues = document.querySelectorAll('.stat-value');

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !statValue.dataset.animated) {
                statValue.dataset.animated = 'true';
                
                // Extract numeric value
                const text = statValue.textContent;
                const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (!isNaN(numericValue)) {
                    statValue.textContent = '0';
                    setTimeout(() => {
                        animateValue(statValue, 0, numericValue, 2000);
                    }, 300);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const gearAnimation = document.querySelector('.gear-animation');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
    
    if (gearAnimation) {
        gearAnimation.style.transform = `translateY(-50%) rotate(${scrolled * 0.1}deg)`;
    }
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.querySelector('.main-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================
const buttons = document.querySelectorAll('button, .cta-primary, .cta-secondary');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ============================================
// DOWNLOAD BUTTON FUNCTIONALITY
// ============================================
const downloadButton = document.querySelector('.download-button');

if (downloadButton) {
    downloadButton.addEventListener('click', () => {
        // Simulate download
        alert('Investment Memorandum download will be available soon. Please contact us at info@epfssif.co.za');
    });
}

// ============================================
// CTA BUTTONS FUNCTIONALITY
// ============================================
document.querySelectorAll('.cta-button, .cta-primary:not([href="#investors"]):not([href="#donors"])').forEach(button => {
    if (!button.hasAttribute('href') || button.getAttribute('href') === '#') {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Thank you for your interest! Please contact us at invest@epfssif.co.za to get started.');
        });
    }
});

// ============================================
// RESPONSIVE IMAGE LOADING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loading="lazy" to all images
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Initialize all animations
    console.log('EPF Sustainable Social Impact Fund - Website Loaded');
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // Close sidebar with Escape key
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll handling code runs here
    });
}, { passive: true });

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
// Add focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================
window.addEventListener('load', () => {
    // Fade in page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Trigger initial animations
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%cEPF Sustainable Social Impact Fund', 'font-size: 24px; font-weight: bold; color: #00D4AA;');
console.log('%cEngineering the Future of Impact Investing', 'font-size: 14px; color: #0A2540;');
console.log('%cPowered by Effectus Capital Management', 'font-size: 12px; color: #6C757D;');
