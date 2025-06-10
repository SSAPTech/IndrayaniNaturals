// Contact Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize map
    initializeMap();
});

function initializeAnimations() {
    // Add animation classes to elements
    const elements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
    elements.forEach(element => {
        element.classList.add('animate');
    });
}

function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show success message
                showMessage('Message sent successfully!', 'success');
                form.reset();
            }
        });
    }
}

function validateForm(data) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showMessage('Please enter a valid name', 'error');
        isValid = false;
    }
    
    // Validate email
    if (!data.email || !emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address', 'error');
        isValid = false;
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        showMessage('Please enter a message (minimum 10 characters)', 'error');
        isValid = false;
    }
    
    return isValid;
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    messageDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function initializeMap() {
    // Initialize Google Maps if needed
    if (typeof google !== 'undefined') {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            const location = { lat: 19.0760, lng: 72.8777 }; // Mumbai coordinates
            const map = new google.maps.Map(mapElement, {
                zoom: 15,
                center: location,
            });
            
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: 'Indrayani Naturals'
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