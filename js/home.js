// Home Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero image rotation
    const heroRotator = new HeroImageRotator();
    heroRotator.init();
});

// Hero Image Rotation
class HeroImageRotator {
    constructor() {
        this.heroImages = document.querySelectorAll('.hero-image');
        this.currentIndex = 0;
        this.interval = 5000; // Change image every 5 seconds
        this.transitionDuration = 1000; // Match CSS transition duration
        this.isTransitioning = false;
        this.rotationInterval = null;
    }

    init() {
        if (this.heroImages.length === 0) return;
        
        // Set initial active image
        this.heroImages[0].classList.add('active');
        
        // Start rotation
        this.startRotation();
        
        // Add event listeners for smoother transitions
        this.addEventListeners();
    }

    startRotation() {
        this.rotationInterval = setInterval(() => this.rotateImages(), this.interval);
    }

    rotateImages() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        // Remove active class from current image
        this.heroImages[this.currentIndex].classList.remove('active');
        
        // Move to next image
        this.currentIndex = (this.currentIndex + 1) % this.heroImages.length;
        
        // Add active class to new image
        this.heroImages[this.currentIndex].classList.add('active');

        // Reset transition flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, this.transitionDuration);
    }

    addEventListeners() {
        // Pause rotation on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(this.rotationInterval);
            });

            heroSection.addEventListener('mouseleave', () => {
                this.startRotation();
            });
        }
    }
}

// Smooth scroll for anchor links
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