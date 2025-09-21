// DOM elements
const currentYearElement = document.getElementById('currentYear');
const lastModifiedElement = document.getElementById('lastModified');
const hamburgerButton = document.querySelector('.hamburger');
const navigationElement = document.getElementById('navigation');
const themeToggle = document.getElementById('themeToggle');
const membershipForm = document.getElementById('membershipForm');
const timestampField = document.getElementById('timestamp');
const modalLinks = document.querySelectorAll('.info-link');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

// Set copyright year and last modified date
currentYearElement.textContent = new Date().getFullYear();
lastModifiedElement.textContent = document.lastModified;

// Set form timestamp
timestampField.value = new Date().toISOString();

// Toggle mobile navigation
hamburgerButton.addEventListener('click', () => {
    navigationElement.classList.toggle('show');
});

// Theme toggle functionality
function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// Modal functionality
modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Form validation
membershipForm.addEventListener('submit', (e) => {
    let isValid = true;
    const requiredFields = membershipForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '';
        }
    });
    
    // Validate title pattern if provided
    const titleField = document.getElementById('title');
    if (titleField.value && !titleField.checkValidity()) {
        isValid = false;
        titleField.style.borderColor = 'red';
        alert('Organization title must be at least 7 characters and contain only letters, hyphens, and spaces.');
    }
    
    if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields correctly.');
    }
});

// Add input event listeners to remove error styling
const formInputs = membershipForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.style.borderColor = '';
    });
});