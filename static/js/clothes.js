// Modal functionality for gallery images
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');
        const modalCaption = document.getElementById('modalCaption');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const closeBtn = document.getElementsByClassName('close')[0];
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.querySelector('.gallery-img').src;
                modalCaption.innerHTML = this.querySelector('.gallery-caption').innerHTML;
            });
        });
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
        
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Scroll animation for elements
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.clothing-card, .craft-card, .gallery-item, .step-item');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial styles for animation
        document.querySelectorAll('.clothing-card, .craft-card, .gallery-item, .step-item').forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Run animation on scroll
        window.addEventListener('scroll', animateOnScroll);
        // Run once on page load
        window.addEventListener('load', animateOnScroll);