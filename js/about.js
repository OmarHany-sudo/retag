// About page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Animate statistics counters
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                
                animateCounter(target, 0, finalValue, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * easeOutQuart(progress));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Add plus sign for certain numbers
                if (end >= 100) {
                    element.textContent = current + '+';
                }
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(
        '.mission-card, .advantage-card, .client-category, .stat-card'
    );

    const elementObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        elementObserver.observe(el);
    });

    // Stagger animation for cards
    const cardGroups = [
        document.querySelectorAll('.mission-card'),
        document.querySelectorAll('.advantage-card'),
        document.querySelectorAll('.client-category'),
        document.querySelectorAll('.stat-card')
    ];

    cardGroups.forEach(cards => {
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Parallax effect for hero section
    const aboutHero = document.querySelector('.about-hero');
    if (aboutHero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            aboutHero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Interactive hover effects for advantage cards
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Team section interaction
    const teamImage = document.querySelector('.team-img');
    if (teamImage) {
        teamImage.addEventListener('click', function() {
            this.style.transform = this.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
        });
    }

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });

    // Smooth reveal animation for text sections
    const textSections = document.querySelectorAll('.about-text, .team-description');
    textSections.forEach(section => {
        const paragraphs = section.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            p.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        });
    });

    const textObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paragraphs = entry.target.querySelectorAll('p');
                paragraphs.forEach(p => {
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                });
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    textSections.forEach(section => {
        textObserver.observe(section);
    });

    // Add click tracking for analytics (optional)
    const trackableElements = document.querySelectorAll('.advantage-card, .client-category, .cta .btn');
    trackableElements.forEach(element => {
        element.addEventListener('click', function() {
            const elementType = this.classList.contains('advantage-card') ? 'advantage' :
                               this.classList.contains('client-category') ? 'client-category' : 'cta-button';
            const elementText = this.querySelector('h3')?.textContent || this.textContent;
            
            console.log(`About page interaction: ${elementType} - ${elementText}`);
            
            // Here you could send analytics data to your tracking service
            // Example: gtag('event', 'about_page_interaction', { element_type: elementType, element_text: elementText });
        });
    });

    // Add dynamic content based on time of day
    const currentHour = new Date().getHours();
    const greetingElements = document.querySelectorAll('.greeting');
    
    let greeting = 'مرحباً بكم';
    if (currentHour < 12) {
        greeting = 'صباح الخير';
    } else if (currentHour < 18) {
        greeting = 'مساء الخير';
    } else {
        greeting = 'مساء الخير';
    }
    
    greetingElements.forEach(el => {
        el.textContent = greeting;
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        
        progressBar.style.width = progress + '%';
    });

    console.log('About page loaded successfully!');
});

