// AURA VENTURES - Interactive Features & Animations
// Modern, performance-optimized JavaScript for enhanced UX

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // =============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed navigation
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // NAVIGATION BACKGROUND ON SCROLL
    // =============================================
    const nav = document.querySelector('.nav');
    let isScrolled = false;
    
    function updateNavBackground() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50 && !isScrolled) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            isScrolled = true;
        } else if (scrollTop <= 50 && isScrolled) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = 'none';
            isScrolled = false;
        }
    }
    
    // Throttled scroll listener for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateNavBackground();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // =============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // =============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special handling for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll('.feature-card, .stat-item, .about-feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // =============================================
    // DYNAMIC STATS ANIMATION
    // =============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateStatNumber(element) {
        const finalValue = element.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
        const suffix = finalValue.replace(/[0-9.]/g, '');
        
        if (isNaN(numericValue)) return;
        
        const duration = 2000; // 2 seconds
        const increment = numericValue / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            // Format the number appropriately
            let displayValue;
            if (numericValue >= 1000000000) {
                displayValue = (current / 1000000000).toFixed(1) + 'B';
            } else if (numericValue >= 1000000) {
                displayValue = (current / 1000000).toFixed(1) + 'M';
            } else if (numericValue >= 1000) {
                displayValue = (current / 1000).toFixed(1) + 'K';
            } else {
                displayValue = Math.floor(current);
            }
            
            element.textContent = displayValue + suffix.replace(/[0-9.KMB]/g, '');
        }, 16);
    }
    
    // =============================================
    // FLOATING CARDS PARALLAX EFFECT
    // =============================================
    const floatingCards = document.querySelectorAll('.floating-card');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrollTop < heroHeight) {
            floatingCards.forEach((card, index) => {
                const speed = 0.5 + (index * 0.2); // Different speeds for each card
                const yPos = scrollTop * speed;
                card.style.transform = `translateY(${yPos}px)`;
            });
        }
    }
    
    // Throttled parallax scroll listener
    let parallaxTicking = false;
    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            requestAnimationFrame(function() {
                updateParallax();
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    });
    
    // =============================================
    // CTA BUTTON RIPPLE EFFECT
    // =============================================
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            // Ensure button has relative positioning
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // =============================================
    // MOUSE CURSOR GLOW EFFECT (Desktop Only)
    // =============================================
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorGlow = null;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!cursorGlow) {
                cursorGlow = document.createElement('div');
                cursorGlow.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    filter: blur(10px);
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(cursorGlow);
            }
            
            cursorGlow.style.left = (mouseX - 10) + 'px';
            cursorGlow.style.top = (mouseY - 10) + 'px';
        });
        
        // Hide glow when mouse leaves window
        document.addEventListener('mouseleave', function() {
            if (cursorGlow) {
                cursorGlow.style.opacity = '0';
            }
        });
        
        document.addEventListener('mouseenter', function() {
            if (cursorGlow) {
                cursorGlow.style.opacity = '1';
            }
        });
    }
    
    // =============================================
    // PERFORMANCE OPTIMIZATION
    // =============================================
    
    // Preload critical assets
    const criticalAssets = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = asset;
        link.as = 'style';
        document.head.appendChild(link);
    });
    
    // Lazy load non-critical elements
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('[data-src]');
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.src = element.dataset.src;
                    element.classList.remove('lazy');
                    lazyObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(el => lazyObserver.observe(el));
    }
    
    console.log('ðŸš€ AURA VENTURES - Marketing site loaded successfully!');
});