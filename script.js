// Portfolio JavaScript with Slideshow Functionality

// Global variables for slideshow state
const slideshowStates = {};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshows();
    initializeNavigation();
    initializeMobileMenu();
    initializeKeyboardNavigation();
    updateActiveNavigation();
});

// Initialize all slideshows on the page
function initializeSlideshows() {
    const slideshows = document.querySelectorAll('.slideshow');

    slideshows.forEach(slideshow => {
        const slideshowId = slideshow.id;
        const slides = slideshow.querySelectorAll('.slide');

        if (slides.length > 0) {
            slideshowStates[slideshowId] = {
                currentSlide: 0,
                totalSlides: slides.length
            };

            // Update counter
            updateSlideCounter(slideshowId);

            // Show first slide
            showSlide(slideshowId, 0);
        }
    });
}

// Change slide function (called by navigation buttons)
function changeSlide(slideshowId, direction) {
    const state = slideshowStates[slideshowId];
    if (!state) return;

    // Calculate new slide index
    let newSlide = state.currentSlide + direction;

    // Wrap around if needed
    if (newSlide >= state.totalSlides) {
        newSlide = 0;
    } else if (newSlide < 0) {
        newSlide = state.totalSlides - 1;
    }

    showSlide(slideshowId, newSlide);
}

// Show specific slide
function showSlide(slideshowId, slideIndex) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slide');
    const state = slideshowStates[slideshowId];

    if (!state || slideIndex >= state.totalSlides || slideIndex < 0) return;

    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Show target slide
    slides[slideIndex].classList.add('active');

    // Update state
    state.currentSlide = slideIndex;

    // Update counter
    updateSlideCounter(slideshowId);
}

// Update slide counter display
function updateSlideCounter(slideshowId) {
    const counterElement = document.getElementById(slideshowId + 'Counter');
    const state = slideshowStates[slideshowId];

    if (counterElement && state) {
        counterElement.textContent = `${state.currentSlide + 1} / ${state.totalSlides}`;
    }
}

// Initialize section navigation
function initializeNavigation() {
    // Handle hash changes (URL navigation)
    window.addEventListener('hashchange', handleHashChange);

    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                showSection(href.substring(1));
                window.history.pushState(null, null, href);
                updateActiveNavigation();
            }
        });
    });

    // Show initial section based on hash or default to home
    const initialSection = window.location.hash ? window.location.hash.substring(1) : 'home';
    showSection(initialSection);
}

// Handle browser back/forward navigation
function handleHashChange() {
    const section = window.location.hash ? window.location.hash.substring(1) : 'home';
    showSection(section);
    updateActiveNavigation();
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // Scroll to top of section
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);
    } else {
        // Default to home if section not found
        document.getElementById('home').classList.add('active');
    }
}

// Update active navigation highlighting
function updateActiveNavigation() {
    const currentHash = window.location.hash || '#home';

    // Update desktop navigation
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    navLinks.forEach(link => {
        link.classList.remove('current');
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('current');
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    let isMenuOpen = false;

    if (!mobileMenuToggle || !mobileNav) return;

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
}

// Keyboard navigation for slideshows
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Get currently active section
        const activeSection = document.querySelector('.section.active');
        if (!activeSection) return;

        // Find slideshow in active section
        const slideshow = activeSection.querySelector('.slideshow');
        if (!slideshow) return;

        const slideshowId = slideshow.id;

        // Handle arrow keys
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            changeSlide(slideshowId, -1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            changeSlide(slideshowId, 1);
        }

        // Handle escape key to close mobile menu
        if (e.key === 'Escape') {
            const mobileNav = document.querySelector('.mobile-nav');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

            if (mobileNav && mobileNav.style.display === 'block') {
                mobileNav.style.display = 'none';
                document.body.style.overflow = 'auto';
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
}

// Auto-advance slideshow (optional, can be enabled per slideshow)
function startAutoAdvance(slideshowId, interval = 5000) {
    setInterval(() => {
        changeSlide(slideshowId, 1);
    }, interval);
}

// Touch/swipe support for mobile
function initializeTouchNavigation() {
    let startX = 0;
    let endX = 0;

    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const difference = startX - endX;
        const threshold = 50; // Minimum swipe distance

        if (Math.abs(difference) > threshold) {
            // Get currently active section
            const activeSection = document.querySelector('.section.active');
            if (!activeSection) return;

            // Find slideshow in active section
            const slideshow = activeSection.querySelector('.slideshow');
            if (!slideshow) return;

            const slideshowId = slideshow.id;

            if (difference > 0) {
                // Swiped left - next slide
                changeSlide(slideshowId, 1);
            } else {
                // Swiped right - previous slide
                changeSlide(slideshowId, -1);
            }
        }
    }
}

// Initialize touch navigation
document.addEventListener('DOMContentLoaded', function() {
    initializeTouchNavigation();
});

// Utility function for debouncing
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

    if (window.innerWidth > 600 && mobileNav && mobileNav.style.display === 'block') {
        mobileNav.style.display = 'none';
        document.body.style.overflow = 'auto';
        mobileMenuToggle.classList.remove('active');
    }
}, 100);

window.addEventListener('resize', handleResize);

// Image loading optimization
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slide img, .about-image img');

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

// Preload next/previous images in slideshows for smoother transitions
function preloadSlideImages(slideshowId) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;

    const state = slideshowStates[slideshowId];
    if (!state) return;

    const slides = slideshow.querySelectorAll('.slide');
    const currentIndex = state.currentSlide;

    // Preload next and previous images
    const nextIndex = (currentIndex + 1) % state.totalSlides;
    const prevIndex = (currentIndex - 1 + state.totalSlides) % state.totalSlides;

    [nextIndex, prevIndex].forEach(index => {
        const img = slides[index]?.querySelector('img');
        if (img && !img.complete) {
            const preloadImg = new Image();
            preloadImg.src = img.src;
        }
    });
}

// Call preload for visible slideshows
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        Object.keys(slideshowStates).forEach(slideshowId => {
            preloadSlideImages(slideshowId);
        });
    }, 1000);
});