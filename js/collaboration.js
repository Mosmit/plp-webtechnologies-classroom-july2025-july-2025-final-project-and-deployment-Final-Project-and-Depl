// Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            body.classList.toggle('no-scroll', navMenu.classList.contains('active'));
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Back to top button
        const backToTopButton = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Fade in elements on scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeInOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const fadeInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, fadeInOptions);
        
        fadeElements.forEach(element => {
            fadeInObserver.observe(element);
        });
        
        // Form validation for newsletter
        document.querySelector('.newsletter').addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && isValidEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
                emailInput.focus();
            }
        });
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <p>${message}</p>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            `;
            
            document.body.appendChild(notification);
            
            // Add styles for notification
            const style = document.createElement('style');
            style.textContent = `
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 350px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    transform: translateY(100px);
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                
                .notification.visible {
                    transform: translateY(0);
                    opacity: 1;
                }
                
                .notification.success {
                    background: #4caf50;
                }
                
                .notification.error {
                    background: #f44336;
                }
                
                .notification.info {
                    background: #2196f3;
                }
                
                .notification p {
                    margin: 0;
                    padding-right: 20px;
                }
                
                .notification-close {
                    background: transparent;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                }
            `;
            
            if (!document.querySelector('#notification-styles')) {
                style.id = 'notification-styles';
                document.head.appendChild(style);
            }
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('visible');
            }, 10);
            
            // Close button event
            notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.classList.remove('visible');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.classList.remove('visible');
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }
            }, 5000);
        }
        
        // Set active navigation link based on current page
        function setActiveNavLink() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.nav-link').forEach(link => {
                const linkPage = link.getAttribute('href');
                if (linkPage === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            setActiveNavLink();
        });