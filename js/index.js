/**
 * EPF SUSTAINABLE SOCIAL IMPACT FUND - HOME PAGE JAVASCRIPT
 * 
 * Features:
 * - Loading screen animation
 * - Mobile menu toggle
 * - Navigation scroll effects
 * - Video playback handling
 * - Smooth scrolling
 * - SYNCHRONIZED counter animations for dashboard stats
 */

// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 1.5 seconds
    setTimeout(function() {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition completes
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 400);
    }, 1500);
});


// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Open mobile menu
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    mobileSidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when overlay is clicked
sidebarOverlay.addEventListener('click', function() {
    hamburger.classList.remove('active');
    mobileSidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close menu when a link is clicked
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});


// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled down
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});


// ============================================
// VIDEO PLAYBACK HANDLING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.querySelector('.hero-video-container video');
    
    if (videoElement) {
        // Ensure video plays on mobile devices
        videoElement.play().catch(function(error) {
            console.log('Video autoplay prevented:', error);
        });
        
        // Pause video when not in viewport (performance optimization)
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    videoElement.play().catch(function(error) {
                        console.log('Video play error:', error);
                    });
                } else {
                    videoElement.pause();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(videoElement);
    }
});


// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only apply smooth scroll if it's an actual anchor link
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});


// ============================================
// SYNCHRONIZED COUNTER ANIMATIONS
// Counts from 0 to target, all finishing at same time
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    const duration = 2000; // 2 seconds - all counters finish together
    
    counters.forEach(function(counter) {
        const target = parseFloat(counter.getAttribute('data-target'));
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Cap at 1 (100%)
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = target * easeOutQuart;
            
            // Format the number
            if (counter.textContent.includes('%')) {
                // Percentage counter
                counter.textContent = Math.floor(currentValue) + '%';
            } else if (counter.textContent.includes('R')) {
                // Currency counter
                if (currentValue >= 1000000) {
                    counter.textContent = 'R' + (currentValue / 1000000).toFixed(0) + 'M';
                } else {
                    counter.textContent = 'R' + Math.floor(currentValue).toLocaleString();
                }
            } else {
                counter.textContent = Math.floor(currentValue).toLocaleString();
            }
            
            // Continue animation if not finished
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Set final value
                if (counter.textContent.includes('%')) {
                    counter.textContent = target + '%';
                } else if (counter.textContent.includes('R')) {
                    counter.textContent = 'R' + (target / 1000000).toFixed(0) + 'M';
                }
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Trigger counter animation when dashboard section is visible
const dashboardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            animateCounters();
            dashboardObserver.unobserve(entry.target); // Only animate once
        }
    });
}, { 
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
});

document.addEventListener('DOMContentLoaded', function() {
    const dashboardSection = document.querySelector('.dashboard-stats');
    if (dashboardSection) {
        dashboardObserver.observe(dashboardSection);
    }
});


// ============================================
// FADE-IN ANIMATION FOR STAT CARDS
// ============================================
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card');
            statCards.forEach(function(card, index) {
                setTimeout(function() {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', function() {
    const dashboardStats = document.querySelector('.dashboard-stats');
    if (dashboardStats) {
        // Set initial state
        const statCards = dashboardStats.querySelectorAll('.stat-card');
        statCards.forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        statsObserver.observe(dashboardStats);
    }
});