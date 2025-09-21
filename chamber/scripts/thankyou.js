// DOM elements
const currentYearElement = document.getElementById('currentYear');
const lastModifiedElement = document.getElementById('lastModified');
const hamburgerButton = document.querySelector('.hamburger');
const navigationElement = document.getElementById('navigation');
const themeToggle = document.getElementById('themeToggle');
const applicationDataElement = document.getElementById('applicationData');

// Set copyright year and last modified date
currentYearElement.textContent = new Date().getFullYear();
lastModifiedElement.textContent = document.lastModified;

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

// Display application data from URL parameters
function displayApplicationData() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get all form values
    const firstName = urlParams.get('firstName') || 'Not provided';
    const lastName = urlParams.get('lastName') || 'Not provided';
    const title = urlParams.get('title') || 'Not provided';
    const email = urlParams.get('email') || 'Not provided';
    const phone = urlParams.get('phone') || 'Not provided';
    const businessName = urlParams.get('businessName') || 'Not provided';
    const membershipLevel = getMembershipLevelText(urlParams.get('membershipLevel'));
    const description = urlParams.get('description') || 'Not provided';
    const timestamp = urlParams.get('timestamp') ? new Date(urlParams.get('timestamp')).toLocaleString() : 'Not provided';
    
    // Create HTML to display the data
    const html = `
        <div class="data-row">
            <div class="data-label">Name:</div>
            <div class="data-value">${firstName} ${lastName}</div>
        </div>
        <div class="data-row">
            <div class="data-label">Organization Title:</div>
            <div class="data-value">${title}</div>
        </div>
        <div class="data-row">
            <div class="data-label">Email:</div>
            <div class="data-value">${email}</div>
        </div>
        <div class="data-row">
            <div class="data-label">Phone:</div>
            <div class="data-value">${phone}</div>
        </div>
        <div class="data-row">
            <div class="data-label">Business Name:</div>
            <div class="data-value">${businessName}</div>
        </div>
        <div class="data-row">
            <div class="data-label">Membership Level:</div>
            <div class="data-value">${membershipLevel}</div>
        </div>
        <div class="data-row">
            <div class="data-label">Business Description:</div>
            <div class="data-value">${description}</div>
        </div>
        <div class="data-row">
            <div class="data-label">Application Date:</div>
            <div class="data-value">${timestamp}</div>
        </div>
    `;
    
    applicationDataElement.innerHTML = html;
}

// Convert membership level code to text
function getMembershipLevelText(levelCode) {
    switch(levelCode) {
        case 'np': return 'NP Membership (Non-Profit)';
        case 'bronze': return 'Bronze Membership';
        case 'silver': return 'Silver Membership';
        case 'gold': return 'Gold Membership';
        default: return 'Not specified';
    }
}

// Display application data when page loads
displayApplicationData();