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
        
        // Form validation for registration
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const institution = document.getElementById('institution').value;
            const position = document.getElementById('position').value;
            const expertise = document.getElementById('expertise').value;
            const interests = document.getElementById('interests').value;
            const country = document.getElementById('country').value;
            const terms = document.getElementById('terms').checked;
            
            // Simple validation
            let isValid = true;
            let errorMessage = '';
            
            if (!firstName || !lastName || !email || !password || !confirmPassword || 
                !institution || !position || !expertise || !interests || !country) {
                isValid = false;
                errorMessage = 'Please fill in all required fields.';
            } else if (password !== confirmPassword) {
                isValid = false;
                errorMessage = 'Passwords do not match.';
            } else if (password.length < 8) {
                isValid = false;
                errorMessage = 'Password must be at least 8 characters long.';
            } else if (!terms) {
                isValid = false;
                errorMessage = 'You must agree to the Terms of Service and Privacy Policy.';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
            
            if (isValid) {
                // Simulate registration process
                showNotification('Registration successful! Creating your research profile...', 'success');
                // In a real application, you would submit the form data to a server
                setTimeout(() => {
                    window.location.href = 'researchers.html'; // Redirect to researchers page
                }, 2000);
            } else {
                showNotification(errorMessage, 'error');
            }
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
        
        // Password strength indicator (optional enhancement)
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                const strengthIndicator = document.getElementById('password-strength');
                
                if (!strengthIndicator) {
                    // Create strength indicator if it doesn't exist
                    const indicator = document.createElement('div');
                    indicator.id = 'password-strength';
                    indicator.style.marginTop = '5px';
                    indicator.style.fontSize = '0.8rem';
                    this.parentNode.appendChild(indicator);
                }
                
                const indicator = document.getElementById('password-strength');
                let strength = 0;
                let message = '';
                
                if (password.length >= 8) strength++;
                if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
                if (password.match(/\d/)) strength++;
                if (password.match(/[^a-zA-Z\d]/)) strength++;
                
                switch(strength) {
                    case 0:
                    case 1:
                        message = 'Weak password';
                        indicator.style.color = '#e63946';
                        break;
                    case 2:
                        message = 'Moderate password';
                        indicator.style.color = '#f4a261';
                        break;
                    case 3:
                        message = 'Strong password';
                        indicator.style.color = '#2a9d8f';
                        break;
                    case 4:
                        message = 'Very strong password';
                        indicator.style.color = '#2a9d8f';
                        break;
                }
                
                indicator.textContent = message;
            });
        }
        
        // Notification system
        function showNotification(message, type = 'info') {
            // Check if notification already exists
            if (document.querySelector('.notification')) {
                return;
            }
            
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <p>${message}</p>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            `;
            
            document.body.appendChild(notification);
            
            // Add styles for notification if not already added
            if (!document.querySelector('#notification-styles')) {
                const style = document.createElement('style');
                style.id = 'notification-styles';
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