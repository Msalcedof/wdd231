// Footer Information - Set only once
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Fetch Members JSON Data (For Directory)
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to fetch data');

    const members = await response.json();
    console.log('Fetched members:', members); // Log the fetched members data to check if it’s working
    displayMembers(members);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displayMembers(members) {
  const directory = document.querySelector('.directory');
  directory.innerHTML = ''; // Clear existing content

  members.forEach(member => {
    const imgSrc = member.image ? `images/${member.image}` : 'default.jpg'; // Default image fallback
    const memberCard = `
      <div class="card ${member.membershipLevel.toLowerCase()}">
        <img src="${imgSrc}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address || 'No address available'}</p>
        <p>${member.phone || 'N/A'}</p>
        <a href="${member.website || '#'}" target="_blank">Visit Website</a>
        <p>Membership Level: ${member.membershipLevel}</p>
      </div>
    `;
    directory.innerHTML += memberCard;
  });
}

// Fetch Weather Data
async function fetchWeather() {
  const apiKey = 'c5a298490cfa85ca921a33aa6d68c0ab'; // Your OpenWeatherMap API key
  const city = 'Choloma,Honduras'; // City location
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    // Fetch current weather data
    const currentWeatherResponse = await fetch(currentWeatherUrl);
    if (!currentWeatherResponse.ok) throw new Error('Failed to fetch current weather data');
    const currentData = await currentWeatherResponse.json();

    // Get current weather details
    const temperature = Math.round(currentData.main.temp);
    const description = currentData.weather[0]?.description || 'No description available';
    const weatherIconCode = currentData.weather[0].icon;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;

    // Display current weather
    document.getElementById('current-weather').innerHTML = `
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Description:</strong> ${description}</p>
      <img src="${weatherIconUrl}" alt="Weather Icon" style="width: 50px; height: 50px;">
    `;

    // Fetch 5-day forecast data
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');
    const forecastData = await forecastResponse.json();

    // Group the forecast data into 5-day periods (3-hour intervals)
    const forecast = [];
    let currentDay = null;
    let dayTemps = { min: null, max: null, description: null };

    // Iterate over the forecast data (3-hour intervals)
    for (let i = 0; i < forecastData.list.length; i++) {
      const item = forecastData.list[i];
      const date = new Date(item.dt * 1000);
      const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
      const temp = Math.round(item.main.temp);
      const description = item.weather[0].description;

      // Start a new day or update the existing day
      if (currentDay !== dayOfWeek) {
        if (currentDay) {
          forecast.push({ day: currentDay, minTemp: dayTemps.min, maxTemp: dayTemps.max, description: dayTemps.description });
        }
        currentDay = dayOfWeek;
        dayTemps = { min: temp, max: temp, description: description };
      } else {
        dayTemps.min = Math.min(dayTemps.min, temp);
        dayTemps.max = Math.max(dayTemps.max, temp);
      }
    }

    if (currentDay) {
      forecast.push({ day: currentDay, minTemp: dayTemps.min, maxTemp: dayTemps.max, description: dayTemps.description });
    }

    // Display the 5-day forecast
    document.getElementById('forecast').innerHTML = `
      <ul>
        ${forecast.map(item => `
          <li>
            <strong>${item.day}</strong>: ${item.minTemp}°C - ${item.maxTemp}°C, ${item.description}
          </li>
        `).join('')}
      </ul>
    `;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('current-weather').innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    document.getElementById('forecast').innerHTML = `<p>Error fetching forecast data.</p>`;
  }
}

// Fetch Spotlight Members (Gold/Silver)
async function fetchSpotlightMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to fetch data');

    const members = await response.json();
    displaySpotlights(members);
  } catch (error) {
    console.error('Error fetching spotlight members:', error);
  }
}

function displaySpotlights(members) {
  const spotlightContainer = document.querySelector('.spotlight-cards');
  spotlightContainer.innerHTML = ''; // Clear existing content

  // Filter Gold/Silver members
  const filteredMembers = members.filter(member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver');

  // Randomly pick 2-3 members
  const selectedMembers = [];
  while (selectedMembers.length < 4 && filteredMembers.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredMembers.length);
    selectedMembers.push(filteredMembers[randomIndex]);
    filteredMembers.splice(randomIndex, 1); // Remove selected member to avoid duplicates
  }

  // If no spotlight members are found, show a fallback message
  if (selectedMembers.length === 0) {
    spotlightContainer.innerHTML = "<p>No spotlight members available at this time.</p>";
    return;
  }

  // Generate spotlight member cards
  let spotlightCards = '';
  selectedMembers.forEach(member => {
    const imgSrc = member.image ? `images/${member.image}` : 'default.jpg'; // Default image fallback
    const cardHTML = `
      <div class="card">
        <img src="${imgSrc}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.membershipLevel} Member</p>
        <p><a href="tel:${member.phone || '#'}">${member.phone || 'N/A'}</a></p>
        <p><a href="https://${member.website || '#'}" target="_blank">${member.website || 'N/A'}</a></p>
        <p>${member.address || 'No address available'}</p>
      </div>
    `;
    spotlightCards += cardHTML;
  });

  spotlightContainer.innerHTML = spotlightCards;
}

// Timestamp, Modals and Animations
document.getElementById('timestamp').value = new Date().toISOString();

function showModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

window.onload = () => {
  document.getElementById('timestamp').value = new Date().toISOString();
  fetchWeather(); // Fetch the weather data
  fetchSpotlightMembers(); // Fetch the spotlight members
  fetchMembers(); // Also fetch the directory members

  // Animation for membership cards
  const cards = document.querySelectorAll('.membership-cards .card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
};

// Extract and display form data on thankyou.html
const params = new URLSearchParams(window.location.search);
  if (document.getElementById('firstName')) {
    document.getElementById('firstName').textContent = params.get('firstName');
  }
  if (document.getElementById('lastName')) {
    document.getElementById('lastName').textContent = params.get('lastName');
  }
  if (document.getElementById('email')) {
    document.getElementById('email').textContent = params.get('email');
  }
  if (document.getElementById('phone')) {
    document.getElementById('phone').textContent = params.get('phone');
  }
  if (document.getElementById('orgName')) {
    document.getElementById('orgName').textContent = params.get('orgName');
  }
  if (document.getElementById('timestamp')) {
    document.getElementById('timestamp').textContent = params.get('timestamp');
  };


  //discover page//
// Get the current date
const currentDate = new Date();
const currentTime = Date.now();

// Retrieve the last visit date from localStorage
let lastVisit = localStorage.getItem('lastVisit');
if (!lastVisit) {
  // If it's the first visit, show a welcome message
  document.getElementById('visitMessage').textContent = 'Welcome! Let us know if you have any questions.';
} else {
  // Calculate the time difference in days
  const timeDifference = Math.floor((currentTime - lastVisit) / (1000 * 3600 * 24));

  if (timeDifference < 1) {
    // If visited within a day
    document.getElementById('visitMessage').textContent = 'Back so soon! Awesome!';
  } else if (timeDifference === 1) {
    // If it was 1 day ago
    document.getElementById('visitMessage').textContent = 'You last visited 1 day ago.';
  } else {
    // If it was more than 1 day ago
    document.getElementById('visitMessage').textContent = `You last visited ${timeDifference} days ago.`;
  }
}

// Store the current visit date in localStorage
localStorage.setItem('lastVisit', currentTime);
