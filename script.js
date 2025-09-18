// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    let isMenuOpen = false;

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            mobileNav.style.display = 'block';
            body.style.overflow = 'hidden';
            mobileMenuToggle.classList.add('active');
        } else {
            mobileNav.style.display = 'none';
            body.style.overflow = 'auto';
            mobileMenuToggle.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.style.display = 'none';
            body.style.overflow = 'auto';
            mobileMenuToggle.classList.remove('active');
            isMenuOpen = false;
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen &&
            !mobileMenuToggle.contains(event.target) &&
            !mobileNav.contains(event.target)) {
            mobileNav.style.display = 'none';
            body.style.overflow = 'auto';
            mobileMenuToggle.classList.remove('active');
            isMenuOpen = false;
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600 && isMenuOpen) {
            mobileNav.style.display = 'none';
            body.style.overflow = 'auto';
            mobileMenuToggle.classList.remove('active');
            isMenuOpen = false;
        }
    });
});

// Image Loading and Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.portfolio-image');

    // Create intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Add loaded class when image loads
                img.addEventListener('load', function() {
                    img.classList.add('loaded');
                });

                // If image is already loaded (cached)
                if (img.complete) {
                    img.classList.add('loaded');
                }

                observer.unobserve(img);
            }
        });
    });

    // Observe all images
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal anchor links
            if (href !== '#' && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();

                    // Calculate offset for fixed header
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Active Navigation Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id], main[id], .row[id]');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('current');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('current');
            }
        });
    }

    // Throttle scroll events
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

        if (mobileNav.style.display === 'block') {
            mobileNav.style.display = 'none';
            document.body.style.overflow = 'auto';
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Image Error Handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.portfolio-image');

    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder for broken images
            this.style.backgroundColor = '#f0f0f0';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#999';
            this.style.fontSize = '14px';
            this.alt = 'Image not available';
        });
    });
});

// Performance Optimization: Debounce Resize Events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized resize handler
const handleResize = debounce(function() {
    // Handle any resize-specific logic here
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    if (window.innerWidth > 600 && mobileNav.style.display === 'block') {
        mobileNav.style.display = 'none';
        document.body.style.overflow = 'auto';
        mobileMenuToggle.classList.remove('active');
    }
}, 100);

window.addEventListener('resize', handleResize);