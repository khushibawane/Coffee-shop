// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                submitBtn.disabled = true;
                submitBtn.textContent = 'Subscribing...';

                setTimeout(() => {
                    showNotification('Thank you for subscribing!');
                    emailInput.value = '';
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });
    }

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#5c3d2e';
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 15px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.4s ease';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 400);
        }, 3000);
    }

    const animateSections = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('fade-in');
            }
        });
    };

    // Add combined CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.8s ease;
        }

        section.fade-in {
            opacity: 1;
            transform: translateY(0);
        }

        .info-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .info-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .info-card:nth-child(1) { transition-delay: 0.1s; }
        .info-card:nth-child(2) { transition-delay: 0.3s; }
        .info-card:nth-child(3) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);

    window.addEventListener('load', animateSections);
    window.addEventListener('scroll', animateSections);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    const menuTabs = document.getElementById('menuTabs');
    if (menuTabs) {
        const tabLinks = menuTabs.querySelectorAll('.nav-link');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabPanes.forEach(pane => {
            pane.style.transition = 'opacity 0.3s ease';
        });

        const hash = window.location.hash;
        if (hash) {
            const activeTab = menuTabs.querySelector(`[data-bs-target="${hash}"]`);
            if (activeTab) {
                tabLinks.forEach(l => l.classList.remove('active'));
                activeTab.classList.add('active');

                const activePane = document.querySelector(hash);
                if (activePane) {
                    tabPanes.forEach(p => p.classList.remove('show', 'active'));
                    activePane.classList.add('show', 'active');
                }
            }
        }

        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'transform 0.3s ease';
            });

            item.addEventListener('mouseleave', function () {
                this.style.transform = 'translateX(0)';
            });
        });
    }

    const infoCards = document.querySelectorAll('.info-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    infoCards.forEach(card => observer.observe(card));
});
