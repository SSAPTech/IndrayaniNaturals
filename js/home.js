// Home Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize featured products
    initializeFeaturedProducts();
});

function initializeAnimations() {
    // Add animation classes to elements
    const elements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
    elements.forEach(element => {
        element.classList.add('animate');
    });
}

function initializeFeaturedProducts() {
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.featured-products .card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
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