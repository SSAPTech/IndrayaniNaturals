// Utility functions
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
    return element;
}

// Initialize spice of the day
function initializeSpiceOfTheDay() {
    try {
        const spices = [
            {
                "id": "cinnamon",
                "name": "Cinnamon",
                "description": "Sweet and woody spice from the inner bark of trees.",
                "origin": "Sri Lanka, India",
                "uses": "Baking, desserts, curries, and hot beverages",
                "funFact": "Cinnamon was once more valuable than gold in ancient trade.",
                "image": "images/spices/cinnamon.jpg"
            },
            {
                "id": "turmeric",
                "name": "Turmeric",
                "description": "Bright yellow spice with earthy flavor.",
                "origin": "India, Southeast Asia",
                "uses": "Curries, rice dishes, and traditional medicine",
                "funFact": "Known as 'Indian saffron' due to its vibrant color.",
                "image": "images/spices/turmeric.jpg"
            },
            {
                "id": "cardamom",
                "name": "Cardamom",
                "description": "Aromatic spice with a complex flavor profile.",
                "origin": "India, Guatemala",
                "uses": "Desserts, coffee, and savory dishes",
                "funFact": "One of the world's most expensive spices.",
                "image": "images/spices/cardamom.jpg"
            }
        ];

        // Get random spice
        const randomSpice = spices[Math.floor(Math.random() * spices.length)];
        
        // Update DOM with error handling
        const elements = {
            name: getElement('.spice-name'),
            description: getElement('.spice-description'),
            origin: getElement('.spice-origin'),
            uses: getElement('.spice-uses'),
            funFact: getElement('.spice-fun-fact'),
            image: getElement('.spice-image')
        };

        if (Object.values(elements).some(el => !el)) {
            console.warn('Some spice elements not found');
            return;
        }

        elements.name.textContent = randomSpice.name;
        elements.description.textContent = randomSpice.description;
        elements.origin.textContent = randomSpice.origin;
        elements.uses.textContent = randomSpice.uses;
        elements.funFact.textContent = randomSpice.funFact;
        elements.image.src = randomSpice.image;
    } catch (error) {
        console.error('Error initializing spice of the day:', error);
    }
}

// Initialize forms with error handling
function initializeForms() {
    try {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const handleSubmit = (e) => {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            };

            form.addEventListener('submit', handleSubmit);
            
            // Cleanup function
            return () => {
                form.removeEventListener('submit', handleSubmit);
            };
        });
    } catch (error) {
        console.error('Error initializing forms:', error);
    }
}

// Add smooth scroll behavior with error handling
function initializeSmoothScroll() {
    try {
        const handleClick = function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', handleClick);
        });

        // Cleanup function
        return () => {
            anchors.forEach(anchor => {
                anchor.removeEventListener('click', handleClick);
            });
        };
    } catch (error) {
        console.error('Error initializing smooth scroll:', error);
    }
}

// Initialize animations with error handling
function initializeAnimations() {
    try {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Cleanup function
        return () => {
            observer.disconnect();
        };
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
}

// Loading Animation with error handling
function initializeLoading() {
    try {
        const loading = document.querySelector('.loading');
        if (!loading) return;

        const hideLoading = () => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        };

        // Add loading timeout
        const loadingTimeout = setTimeout(hideLoading, 2000);

        // Cleanup function
        return () => {
            clearTimeout(loadingTimeout);
        };
    } catch (error) {
        console.error('Error initializing loading:', error);
    }
}

// Card Animation on Scroll
function handleCardAnimations() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    const productCards = document.querySelectorAll('.product-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Wait for page to be fully loaded before starting animations
    window.addEventListener('load', () => {
        // Observe recipe cards
        recipeCards.forEach(card => {
            observer.observe(card);
        });
        
        // Observe product cards
        productCards.forEach(card => {
            observer.observe(card);
        });
    });
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Hero Image Rotation
function initHeroImageRotation() {
    const heroImages = document.querySelectorAll('.hero-image');
    let currentIndex = 0;
    const interval = 5000; // Change image every 5 seconds

    function rotateImages() {
        // Remove active class from current image
        heroImages[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % heroImages.length;
        
        // Add active class to new image
        heroImages[currentIndex].classList.add('active');
    }

    // Start rotation
    setInterval(rotateImages, interval);
}

// Initialize hero image rotation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroImageRotation();
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeLoading();
    initializeThemeToggle();
    
    // Only initialize spice of the day on the home page
    if (document.querySelector('.spice-name')) {
        initializeSpiceOfTheDay();
    }
    
    initializeForms();
    initializeSmoothScroll();
    handleCardAnimations();

    // Add scroll-based navbar effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .about-section, .contact-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

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

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Product Card Hover Effect
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Show More/Less Functionality
    const showMoreButtons = document.querySelectorAll('.btn-show-more');
    
    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (details.style.display === 'none' || !details.style.display) {
                details.style.display = 'block';
                this.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
            } else {
                details.style.display = 'none';
                this.innerHTML = 'Show More <i class="fas fa-chevron-down"></i>';
            }
        });
    });

    // Smooth scroll for navigation links
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

    // Spice Details Modal Functionality
    const modal = document.getElementById('spiceModal');
    const modalContent = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('.btn-details');

    // Spice details data
    const spiceDetails = {
        'garam-masala': {
            title: 'Garam Masala',
            description: 'The perfect blend of aromatic spices that adds warmth and depth to your dishes.',
            ingredients: [
                'Chilli & Coconut',
                'Black Pepper & Cumin',
                'Cloves & Mace',
                'Cardamom & Cinnamon'
            ],
            usage: 'Perfect for curries, dals, and marinades. Add at the end of cooking for maximum flavor.',
            price: '₹299/100g',
            image: '../images/products/garam-masala.jpg'
        },
        'biryani-masala': {
            title: 'Biryani Masala',
            description: 'Aromatic blend perfect for biryani, khichadi, and rice-based dishes.',
            ingredients: [
                'Cumin & Fennel Seeds',
                'Nutmeg & Cloves',
                'Star Anise & Cinnamon',
                'Cardamom & Bay Leaf'
            ],
            usage: 'Add while cooking rice or marinating meat for authentic biryani flavor.',
            price: '₹299/100g',
            image: '../images/products/biryani-masala.jpg'
        },
        'chicken-masala': {
            title: 'Chicken Masala',
            description: 'Versatile blend for curries, tandoori, and grilled chicken dishes.',
            ingredients: [
                'Coriander & Cumin',
                'Ginger & Garlic',
                'Black Pepper & Cloves',
                'Cinnamon & Cardamom'
            ],
            usage: 'Perfect for marinating chicken or adding to curries for authentic flavor.',
            price: '₹299/100g',
            image: '../images/products/chicken-masala.jpg'
        }
    };

    // Open modal with spice details
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const spiceId = this.dataset.spice;
            const details = spiceDetails[spiceId];
            
            if (details) {
                modalContent.innerHTML = `
                    <div class="modal-spice-details">
                        <div class="modal-spice-image">
                            <img src="${details.image}" alt="${details.title}">
                        </div>
                        <div class="modal-spice-info">
                            <h3>${details.title}</h3>
                            <p class="modal-description">${details.description}</p>
                            <div class="product-details">
                                <div class="details-section">
                                    <h5>Key Ingredients</h5>
                                    <ul>
                                        ${details.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="details-section">
                                    <h5>Usage</h5>
                                    <p>${details.usage}</p>
                                </div>
                            </div>
                            <button class="btn-show-more">
                                Show More Details <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="modal-footer">
                                <span class="modal-price">${details.price}</span>
                                <a href="contact.html" class="btn btn-spice">Buy Now</a>
                            </div>
                        </div>
                    </div>
                `;

                // Add event listener to the new show more button
                const showMoreBtn = modalContent.querySelector('.btn-show-more');
                const productDetails = modalContent.querySelector('.product-details');
                
                showMoreBtn.addEventListener('click', function() {
                    if (productDetails.style.display === 'none' || !productDetails.style.display) {
                        productDetails.style.display = 'block';
                        this.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
                    } else {
                        productDetails.style.display = 'none';
                        this.innerHTML = 'Show More Details <i class="fas fa-chevron-down"></i>';
                    }
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}); 