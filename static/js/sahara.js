document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animateElements = document.querySelectorAll('[data-aos]');
    
    const checkIfInView = () => {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (elementPosition.top < windowHeight * 0.85) {
                const delay = element.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay);
            }
        });
    };
    
    // Add animated class to elements in view on load
    checkIfInView();
    
    // Add animated class to elements as they come into view on scroll
    window.addEventListener('scroll', checkIfInView);

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        [data-aos] {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        [data-aos].animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        [data-aos="fade-right"] {
            transform: translateX(-20px);
        }
        
        [data-aos="fade-right"].animated {
            transform: translateX(0);
        }
        
        [data-aos="fade-left"] {
            transform: translateX(20px);
        }
        
        [data-aos="fade-left"].animated {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate form submission
                emailInput.value = '';
                alert('Thank you for subscribing to our newsletter!');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Create hamburger menu for mobile if it doesn't exist
    if (!document.querySelector('.hamburger')) {
        const nav = document.querySelector('nav');
        const hamburgerDiv = document.createElement('div');
        hamburgerDiv.className = 'hamburger';
        
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            hamburgerDiv.appendChild(span);
        }
        
        if (nav) {
            nav.appendChild(hamburgerDiv);
        }
    }

    // Interactive map hover effects
    const mapRegions = document.querySelectorAll('.map-regions li');
    const interactiveMap = document.getElementById('morocco-map');
    
    if (mapRegions.length > 0 && interactiveMap) {
        // Create map overlay for highlighting regions
        const mapOverlay = document.createElement('div');
        mapOverlay.className = 'map-overlay';
        mapOverlay.style.position = 'absolute';
        mapOverlay.style.top = '0';
        mapOverlay.style.left = '0';
        mapOverlay.style.width = '100%';
        mapOverlay.style.height = '100%';
        mapOverlay.style.backgroundColor = 'rgba(44, 110, 73, 0.2)';
        mapOverlay.style.opacity = '0';
        mapOverlay.style.transition = 'opacity 0.3s ease';
        mapOverlay.style.pointerEvents = 'none';
        
        interactiveMap.style.position = 'relative';
        interactiveMap.appendChild(mapOverlay);
        
        mapRegions.forEach((region, index) => {
            region.addEventListener('mouseenter', () => {
                mapOverlay.style.opacity = '1';
                
                // Different positions for different regions
                switch(index) {
                    case 0: // Eastern Region
                        mapOverlay.style.clipPath = 'polygon(70% 30%, 100% 30%, 100% 70%, 70% 70%)';
                        break;
                    case 1: // Draa Valley
                        mapOverlay.style.clipPath = 'polygon(40% 40%, 60% 40%, 60% 80%, 40% 80%)';
                        break;
                    case 2: // Middle Sahara
                        mapOverlay.style.clipPath = 'polygon(30% 60%, 50% 60%, 50% 90%, 30% 90%)';
                        break;
                    case 3: // Western Sahara
                        mapOverlay.style.clipPath = 'polygon(0% 60%, 30% 60%, 30% 100%, 0% 100%)';
                        break;
                    case 4: // Anti-Atlas Fringe
                        mapOverlay.style.clipPath = 'polygon(20% 40%, 40% 40%, 40% 60%, 20% 60%)';
                        break;
                }
            });
            
            region.addEventListener('mouseleave', () => {
                mapOverlay.style.opacity = '0';
            });
        });
    }

    // Image gallery lightbox effect for city and oasis images
    const cardImages = document.querySelectorAll('.card-img');
    
    if (cardImages.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        lightbox.style.display = 'none';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '1000';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.style.maxWidth = '90%';
        lightboxImg.style.maxHeight = '90%';
        lightboxImg.style.borderRadius = '8px';
        lightboxImg.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
        
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '30px';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.transition = 'var(--transition)';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Add click event to images
        cardImages.forEach(img => {
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});