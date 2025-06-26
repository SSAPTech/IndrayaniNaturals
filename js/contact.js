// =====================
// Contact Page JavaScript
// =====================
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeMap();
});

// =====================
// Contact Form Handling
// =====================
function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            if (validateForm(data)) {
                showMessage('Message sent successfully!', 'success');
                form.reset();
            }
        });
    }
}

function validateForm(data) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.name || data.name.trim().length < 2) {
        showMessage('Please enter a valid name', 'error');
        isValid = false;
    }
    if (!data.email || !emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address', 'error');
        isValid = false;
    }
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
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// =====================
// Google Map Initialization
// =====================
function initializeMap() {
    if (typeof google !== 'undefined') {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            const location = { lat: 19.0760, lng: 72.8777 };
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

// =====================
// Smooth Scroll for Anchor Links
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}); 