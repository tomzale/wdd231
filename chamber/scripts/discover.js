// DOM elements
const currentYearElement = document.getElementById('currentYear');
const lastModifiedElement = document.getElementById('lastModified');
const hamburgerButton = document.querySelector('.hamburger');
const navigationElement = document.getElementById('navigation');
const themeToggle = document.getElementById('themeToggle');
const attractionsContainer = document.getElementById('attractionsContainer');
const visitMessage = document.getElementById('visitMessage');

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

// Visit tracking functionality
function trackVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = Date.now();
    
    if (!lastVisit) {
        // First visit
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const timeDifference = currentTime - lastVisitTime;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitMessage.textContent = `You last visited 1 day ago.`;
        } else {
            visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }
    
    // Store current visit time
    localStorage.setItem('lastVisit', currentTime.toString());
}

// Fetch attractions data and display
async function getAttractions() {
    try {
        const response = await fetch('../data/discover.json');
        const data = await response.json();
        displayAttractions(data.attractions);
    } catch (error) {
        console.error('Error fetching attractions data:', error);
        // Fallback data
        const fallbackData = {
            attractions: [
                {
                    "id": 1,
                    "name": "Neon Esports Arena",
                    "address": "456 Tournament Road, Tech City",
                    "description": "State-of-the-art esports venue hosting professional tournaments.",
                    "image": "neon-esports.jpg"
                },
               {
  "id": 2,
  "name": "Pixel Paradise Retro Cafe",
  "address": "9, Idubor, Benin City",
  "description": "Classic arcade games and retro consoles with themed drinks.",
  "image": "game-dev.jpg"
                },
                {
                    "id": 3,
                    "name": "VR Innovation Hub",
                    "address": "11, Ajah, Lagos",
                    "description": "Cutting-edge virtual reality experiences with latest technology.",
                    "image": "g3.jpg"
                },
                {
                    "id": 4,
                    "name": "Gaming Tech Museum",
                    "address": "202 History Avenue, Tech City",
                    "description": "Interactive museum showcasing gaming technology evolution.",
                    "image": "g4.jpg"
                },
                {
                    "id": 5,
                    "name": "Cyber Park Esports Center",
                    "address": "303 Competition Boulevard, Tech City",
                    "description": "Premier training facility for aspiring esports athletes.",
                    "image": "g5.jpg"
                },
                {
                    "id": 6,
                    "name": "Streamer's Studio Complex",
                    "address": "404 Broadcast Street, Tech City",
                    "description": "Professional streaming studios for content creators.",
                    "image": "g6.jpg"
                },
                {
                    "id": 7,
                    "name": "Tech Innovation Campus",
                    "address": "505 Future Drive, Tech City",
                    "description": "Modern campus housing gaming startups and tech companies.",
                    "image": "hero-bg.png"
                },
                {
                    "id": 8,
                    "name": "Gamer's Gear Marketplace",
                    "address": "606 Equipment Road, Tech City",
                    "description": "Largest gaming equipment store in the region.",
                    "image": "gvr.jpg"
                }
            ]
        };
        displayAttractions(fallbackData.attractions);
    }
}

// Display attractions using grid layout
function displayAttractions(attractions) {
    attractionsContainer.innerHTML = '';
    
    attractions.forEach(attraction => {
        const card = document.createElement('article');
        card.classList.add('attraction-card');
        card.setAttribute('data-id', attraction.id);
        
        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="../images/${attraction.image}" alt="${attraction.name}" loading="lazy">
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;
        
        attractionsContainer.appendChild(card);
    });
}

// Initialize the page
trackVisit();
getAttractions();