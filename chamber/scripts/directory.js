// DOM elements
const directoryContainer = document.getElementById('directoryContainer');
const gridViewButton = document.getElementById('gridView');
const listViewButton = document.getElementById('listView');
const currentYearElement = document.getElementById('currentYear');
const lastModifiedElement = document.getElementById('lastModified');
const hamburgerButton = document.querySelector('.hamburger');
const navigationElement = document.getElementById('navigation');
const themeToggle = document.getElementById('themeToggle');

// Set copyright year and last modified date
currentYearElement.textContent = new Date().getFullYear();
lastModifiedElement.textContent = document.lastModified;

// Toggle mobile navigation
hamburgerButton.addEventListener('click', () => {
    navigationElement.classList.toggle('show');
});

// View toggle functionality
gridViewButton.addEventListener('click', () => {
    directoryContainer.classList.remove('list');
    gridViewButton.classList.add('active');
    listViewButton.classList.remove('active');
});

listViewButton.addEventListener('click', () => {
    directoryContainer.classList.add('list');
    listViewButton.classList.add('active');
    gridViewButton.classList.remove('active');
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

// Fetch member data and display members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
        // Fallback data in case of error
        const fallbackData = {
            members: [
                {
                    "name": "Epic Gaming Lounge",
                    "address": "123 Gaming Street, Tech City",
                    "phone": "(555) 123-4567",
                    "website": "https://epicgaminglounge.com",
                    "image": "../images/epic-gaming.jpg",
                    "membershipLevel": 3
                },
                {
                    "name": "Neon Esports Arena",
                    "address": "456 Tournament Road, Tech City",
                    "phone": "(555) 234-5678",
                    "website": "https://neonesports.com",
                    "image": "neon-esports.jpg",
                    "membershipLevel": 3
                },
                {
                    "name": "Pixel Paradise Cafe",
                    "address": "789 Retro Lane, Tech City",
                    "phone": "(555) 345-6789",
                    "website": "https://pixelparadise.cafe",
                    "image": "pixel-paradise.jpg",
                    "membershipLevel": 2
                },
                {
                    "name": "VR Dimension",
                    "address": "101 Virtual Drive, Tech City",
                    "phone": "(555) 456-7890",
                    "website": "https://vrdimension.com",
                    "image": "vr-dimension.jpg",
                    "membershipLevel": 2
                },
                {
                    "name": "Game Dev Studios",
                    "address": "202 Developer Avenue, Tech City",
                    "phone": "(555) 567-8901",
                    "website": "https://gamedevstudios.com",
                    "image": "game-dev.jpg",
                    "membershipLevel": 1
                },
                {
                    "name": "Controller Repair Hub",
                    "address": "303 Fix-It Road, Tech City",
                    "phone": "(555) 678-9012",
                    "website": "https://controllerrepairhub.com",
                    "image": "controller-repair.jpg",
                    "membershipLevel": 1
                },
                {
                    "name": "Streamer's Gear",
                    "address": "404 Broadcast Boulevard, Tech City",
                    "phone": "(555) 789-0123",
                    "website": "https://streamersgear.com",
                    "image": "streamers-gear.jpg",
                    "membershipLevel": 2
                }
            ]
        };
        displayMembers(fallbackData.members);
    }
}

// Display members in the directory
function displayMembers(members) {
    directoryContainer.innerHTML = ''; // Clear existing content
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" class="member-image" loading="lazy">
            <div class="member-details">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-address">${member.address}</p>
                <p class="member-phone">${member.phone}</p>
                <p class="member-website"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                <span class="member-level ${getMembershipClass(member.membershipLevel)}">${getMembershipText(member.membershipLevel)}</span>
            </div>
        `;
        
        directoryContainer.appendChild(card);
    });
}

// Get membership class based on level
function getMembershipClass(level) {
    switch(level) {
        case 1: return 'level-member';
        case 2: return 'level-silver';
        case 3: return 'level-gold';
        default: return 'level-member';
    }
}

// Get membership text based on level
function getMembershipText(level) {
    switch(level) {
        case 1: return 'Member';
        case 2: return 'Silver Member';
        case 3: return 'Gold Member';
        default: return 'Member';
    }
}

// Initialize the directory
getMembers();