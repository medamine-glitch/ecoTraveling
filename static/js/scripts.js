
// Animation for cards on scroll
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const tipItems = document.querySelectorAll('.tip-item');
    
    // Animate on scroll function
    function animateOnScroll(elements, className) {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    tipItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run on scroll
    window.addEventListener('scroll', function() {
        animateOnScroll(cards);
        animateOnScroll(tipItems);
    });
    
    // Run once on load
    animateOnScroll(cards);
    animateOnScroll(tipItems);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Floating animation for destination cards
    let floatIndex = 0;
    setInterval(() => {
        const card = cards[floatIndex % cards.length];
        card.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
        }, 700);
        
        floatIndex++;
    }, 2000);
});// Add scroll effect for navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}); 