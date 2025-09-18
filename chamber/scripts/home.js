// DOM elements
const currentYearElement = document.getElementById('currentYear');
const lastModifiedElement = document.getElementById('lastModified');
const hamburgerButton = document.querySelector('.hamburger');
const navigationElement = document.getElementById('navigation');
const themeToggle = document.getElementById('themeToggle');
const spotlightsContainer = document.getElementById('spotlightsContainer');
const weatherContent = document.getElementById('weather-content');

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

// Fetch member data and display spotlights
async function getMembers() {
    try {
        // <-- FIXED PATH: fetch relative to the page (index.html is root)
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`Members fetch failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

// Display spotlight members (gold and silver only)
function displaySpotlights(members) {
    // Filter gold and silver members (coerce to number just in case)
    const spotlightMembers = members.filter(member => {
        const lvl = Number(member.membershipLevel);
        return lvl === 2 || lvl === 3;
    });
    
    // Randomly select 2-3 members
    const selectedMembers = [];
    const numSpotlights = Math.min(spotlightMembers.length, Math.floor(Math.random() * 2) + 2);
    
    while (selectedMembers.length < numSpotlights && spotlightMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * spotlightMembers.length);
        selectedMembers.push(spotlightMembers[randomIndex]);
        spotlightMembers.splice(randomIndex, 1);
    }
    
    // Clear container
    spotlightsContainer.innerHTML = '';
    
    // Create spotlight cards
    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        
        // <-- FIXED IMAGE PATH: images are served from /images relative to index.html
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" class="spotlight-image" loading="lazy">
            <h3>${member.name}</h3>
            <p class="member-address">${member.address}</p>
            <p class="member-phone">${member.phone}</p>
            <p class="member-website"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <span class="member-level ${getMembershipClass(Number(member.membershipLevel))}">${getMembershipText(Number(member.membershipLevel))}</span>
        `;
        
        spotlightsContainer.appendChild(card);
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

// Fetch weather data
async function getWeather() {
    const apiKey = '02b144170dee63c4e1929ddd3326a9f4'; // consider server-side proxy in production
    const city = 'Lagos, NG'; // 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(url),
            fetch(forecastUrl)
        ]);

        // Check HTTP status for each response
        if (!weatherResponse.ok) {
            const errJson = await safeJson(weatherResponse);
            console.error('Weather API error', weatherResponse.status, errJson);
            showError(`Weather API error: ${errJson.message || weatherResponse.status}`);
            return;
        }
        if (!forecastResponse.ok) {
            const errJson = await safeJson(forecastResponse);
            console.error('Forecast API error', forecastResponse.status, errJson);
            showError(`Forecast API error: ${errJson.message || forecastResponse.status}`);
            return;
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        if (typeof displayWeather !== 'function') {
            console.warn('displayWeather() not found. Logging data instead.');
            console.log({ weatherData, forecastData });
            simpleDisplay(weatherData);
            return;
        }

        displayWeather(weatherData, forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Unable to load weather data at this time. Check console for details.');
    }
}

// Helper to safely try parsing JSON (avoids crash on empty body)
async function safeJson(response) {
    try {
        return await response.json();
    } catch (e) {
        return { message: response.statusText || 'Unknown error' };
    }
}

// <-- FIXED: use correct id "weather-content" that existed in my HTML
function showError(msg) {
    const el = document.getElementById('weather-content') || document.querySelector('.weather-content');
    if (el) el.innerHTML = `<p>${msg}</p>`;
}

// Simple fallback display if displayWeather missing
function simpleDisplay(weatherData) {
    const el = document.getElementById('weather-content') || document.querySelector('.weather-content');
    if (!el) {
        console.log('No #weather-content element found. Here is the data:', weatherData);
        return;
    }
    const desc = weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : 'N/A';
    const temp = weatherData.main ? `${weatherData.main.temp} °C` : 'N/A';
    el.innerHTML = `<h3>${weatherData.name}</h3><p>${desc}</p><p>${temp}</p>`;
}

// Display weather information
function displayWeather(weatherData, forecastData) {
    const temperature = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Get 3-day forecast
    const forecast = getThreeDayForecast(forecastData);
    
    weatherContent.innerHTML = `
        <div class="weather-data">
            <div class="weather-current">
                <img src="${iconUrl}" alt="${description}" class="weather-icon">
                <div class="weather-temp">${temperature}°C</div>
                <div class="weather-desc">${description}</div>
            </div>
            <div class="forecast">
                <h4>3-Day Forecast</h4>
                <div class="forecast-days">
                    ${forecast.map(day => `
                        <div class="forecast-day">
                            <div>${day.date}</div>
                            <div>${day.temp}°C</div>
                            <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.desc}">
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Extract 3-day forecast from API data
function getThreeDayForecast(forecastData) {
    const forecasts = [];
    const days = {};
    
    // Group forecasts by date
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!days[date]) {
            days[date] = {
                date: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
                temps: [],
                icons: [],
                descs: []
            };
        }
        
        days[date].temps.push(item.main.temp);
        days[date].icons.push(item.weather[0].icon);
        days[date].descs.push(item.weather[0].description);
    });
    
    // Get today's date to exclude from forecast
    const today = new Date().toDateString();
    
    // Process next 3 days
    let count = 0;
    for (const date in days) {
        if (date !== today && count < 3) {
            const day = days[date];
            const avgTemp = Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length);
            // Use the most frequent icon/description or first one
            const icon = day.icons[0];
            const desc = day.descs[0];
            
            forecasts.push({
                date: day.date,
                temp: avgTemp,
                icon: icon,
                desc: desc
            });
            
            count++;
        }
    }
    
    return forecasts;
}

// Initialize the page
getMembers();
getWeather();
