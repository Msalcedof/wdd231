// JavaScript code to dynamically add footer content
window.onload = function() {
    const footer = document.getElementById('dynamic-footer');
    const currentYear = new Date().getFullYear();  // Get the current year
    const lastModifiedDate = document.lastModified;  // Get the last modified date of the page

    const footerContent = `
        <p>&copy; ${currentYear} - Marco Salcedo - Honduras</p>
        <p>Last modified: ${lastModifiedDate}</p>
    `;

    footer.innerHTML = footerContent; // Insert the content into the footer
}

// Dynamic Service Content
const servicesContainer = document.getElementById('services-container');

// Fetch and display services from JSON file
fetch('data/site-plan-project.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(service => {
            const serviceDiv = document.createElement('div');
            serviceDiv.classList.add('service-item');
            serviceDiv.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <ul>
                    <li>Duration: ${service.duration}</li>
                    <li>Cost: $${service.cost}</li>
                    <li>Location: ${service.location}</li>
                </ul>
                <div class="service-images">
                    ${service.images.map(image => `<img src="${image}" alt="${service.name} image" class="service-image">`).join('')}
                </div>
            `;
            servicesContainer.appendChild(serviceDiv);
        });
    })
    .catch(error => console.error('Error loading services:', error));

// Dynamic Ceiling Products Section
const ceilingProductsContainer = document.getElementById('ceiling-products-container');

// Fetch and display ceiling products from JSON file (in case you want to load this section dynamically too)
fetch('data/site-plan-project.json')
    .then(response => response.json())
    .then(data => {
        const ceilingProducts = data.filter(service => service.name === 'Ceiling Products');
        ceilingProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('ceiling-product-item');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <ul>
                    <li>Duration: ${product.duration}</li>
                    <li>Cost: $${product.cost}</li>
                    <li>Location: ${product.location}</li>
                </ul>
                <div class="product-images">
                    ${product.images.map(image => `<img src="${image}" alt="${product.name} image" class="product-image">`).join('')}
                </div>
            `;
            ceilingProductsContainer.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error loading ceiling products:', error));

// Contact Form Handling with Local Storage
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const formObj = {};
    formData.forEach((value, key) => {
        formObj[key] = value;
    });
    localStorage.setItem('contactForm', JSON.stringify(formObj));  // Store data
    alert('Form submitted successfully!');
});

// Modal Example
function openModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `<p>This is a modal message!</p><button onclick="closeModal()">Close</button>`;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Example of template literals
const message = `Welcome to Innovative Construction! Our services include remodeling, welding, and more.`;
console.log(message);
