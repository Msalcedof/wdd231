// Footer Information
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Fetch Members JSON Data
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to fetch data');
    
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displayMembers(members) {
  const directory = document.querySelector('.directory');
  directory.innerHTML = ''; // Clear existing content

  members.forEach(member => {
    const memberCard = `
      <div class="card ${member.membershipLevel.toLowerCase()}">
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership Level: ${member.membershipLevel}</p>
      </div>
    `;
    directory.innerHTML += memberCard;
  });
}

// Toggle View
document.getElementById('toggleView').addEventListener('click', () => {
  document.querySelector('.directory').classList.toggle('grid-view');
});

// Initialize Members
fetchMembers();
