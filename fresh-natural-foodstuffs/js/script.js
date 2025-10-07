// Main JavaScript - Common functionality across all pages

// DOM elements
let themeToggle, mobileMenuBtn, mainNav, searchInput, searchBtn;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

// Theme functionality
function initializeTheme() {
    themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Set default to light mode - always start with light mode
    document.body.classList.remove('dark-mode');
    localStorage.setItem('freshNaturalTheme', 'light');
    updateThemeIcon('moon');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('freshNaturalTheme');
    
    // Only apply dark mode if user explicitly chose it before
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon('sun');
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon('moon');
        // Ensure light mode is saved
        localStorage.setItem('freshNaturalTheme', 'light');
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('freshNaturalTheme', 'dark');
            updateThemeIcon('sun');
        } else {
            localStorage.setItem('freshNaturalTheme', 'light');
            updateThemeIcon('moon');
        }
    });
}

function updateThemeIcon(icon) {
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    if (!themeIcon) return;
    
    if (icon === 'sun') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mainNav = document.querySelector('.main-nav');
    
    if (!mobileMenuBtn || !mainNav) return;

    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        
        // Update menu icon
        const menuIcon = mobileMenuBtn.querySelector('i');
        if (mainNav.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            const menuIcon = mobileMenuBtn.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mobileMenuBtn && 
            !mainNav.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            mainNav.classList.remove('active');
            const menuIcon = mobileMenuBtn.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });
}

// Search functionality
function initializeSearch() {
    searchInput = document.querySelector('.search-bar input');
    searchBtn = document.querySelector('.search-bar button');
    
    if (!searchInput || !searchBtn) return;

    // Search on button click
    searchBtn.addEventListener('click', function() {
        performSearch();
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    if (!searchInput) return;
    
    const query = searchInput.value.trim();
    if (query) {
        // Store search query and redirect to marketplace
        sessionStorage.setItem('searchQuery', query);
        window.location.href = 'marketplace.html';
    }
}

// Navigation functionality
function initializeNavigation() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// WhatsApp integration
function generateWhatsAppMessage(cartItems = null, singleProduct = null) {
    const phoneNumber = '2348082059707'; // number
    
    let message = "Hello! I'm interested in the following products from Fresh & Natural Foodstuffs:\n\n";
    
    if (singleProduct) {
        message += `• ${singleProduct.name} - ${formatCurrency(singleProduct.price)}\n`;
        message += `Quantity: ${singleProduct.quantity || 1}\n\n`;
        message += "Please provide more details about availability and pricing.";
    } else if (cartItems && cartItems.length > 0) {
        cartItems.forEach(item => {
            message += `• ${item.name} - ${formatCurrency(item.price)} x ${item.quantity}\n`;
        });
        
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal: ${formatCurrency(total)}\n\n`;
        message += "Please confirm availability and discuss final pricing.";
    } else {
        message = "Hello! I'm interested in your products. Can you provide more information?";
    }
    
    message += "\n\n*Note:* I understand that prices may vary and will be confirmed during our discussion.";
    
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// Format currency (defined here since it's used in WhatsApp function)
function formatCurrency(amount) {
    return '₦' + amount.toLocaleString('en-NG');
}

// Form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // In other real application, you would send this data to a server
        // For now, we'll show a success message
        showFormSuccessMessage();
        contactForm.reset();
    });
}

function showFormSuccessMessage() {
    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success-message';
    successMsg.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <div>
                <h3>Message Sent Successfully!</h3>
                <p>We'll get back to you within 24 hours. You can also reach us directly on WhatsApp for immediate assistance.</p>
            </div>
        </div>
    `;

    // Add styles
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        color: #333;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        width: 90%;
        text-align: center;
        border: 2px solid #4CAF50;
    `;

    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(successMsg);

    // Remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
        if (document.body.contains(successMsg)) {
            document.body.removeChild(successMsg);
        }
    }, 5000);

    // Also remove when clicking overlay
    overlay.addEventListener('click', function() {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
        if (document.body.contains(successMsg)) {
            document.body.removeChild(successMsg);
        }
    });
}

// Product image lazy loading
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize all common functionality
function initializeAll() {
    initializeTheme();
    initializeMobileMenu();
    initializeSearch();
    initializeNavigation();
    initializeContactForm();
    initializeLazyLoading();
    
    // Update cart count if cart manager exists
    if (typeof cartManager !== 'undefined') {
        cartManager.updateCartCount();
    }
}

// Make functions globally available for other scripts
window.formatCurrency = formatCurrency;
window.generateWhatsAppMessage = generateWhatsAppMessage;
window.debounce = debounce;