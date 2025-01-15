// JavaScript to implement dynamic functionality

// Responsive Navigation Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Footer: Dynamic Copyright Year and Last Modified Date
const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;

document.querySelector('footer p:first-of-type').innerHTML = `&copy; ${currentYear} | Marco Salcedo | Honduras`;
document.querySelector('#lastModified').textContent = `Last Modified: ${lastModified}`;

// Course List Array
const courses = [
    { code: 'CSE 110', title: 'Introduction to Programming', credits: 2, completed: true },
    { code: 'WDD 130', title: 'Web Fundamentals', credits: 2, completed: true },
    { code: 'CSE 111', title: 'Programming With Functions', credits: 2, completed: true },
    { code: 'CSE210', title: 'Programming With Classes', credits: 2, completed: true },
    { code: 'WDD131', title: 'Dinamic Web Fundamentals', credits: 2, completed: true },
    { code: 'WDD231', title: 'Web Frontend Development I', credits: 2, completed: false }
];

// Render Courses
const coursesContainer = document.querySelector('.courses-container');
const totalCreditsElement = document.createElement('p');

totalCreditsElement.style.fontWeight = 'bold';
totalCreditsElement.style.textAlign = 'center';

function renderCourses(filter = 'all') {
    coursesContainer.innerHTML = '';
    
    let filteredCourses = courses;
    if (filter === 'WDD') {
        filteredCourses = courses.filter(course => course.code.startsWith('WDD'));
    } else if (filter === 'CSE') {
        filteredCourses = courses.filter(course => course.code.startsWith('CSE'));
    }


    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseCard.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
        `;

        coursesContainer.appendChild(courseCard);
    });

    totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
    coursesContainer.appendChild(totalCreditsElement);
}

// Filter Buttons
const filterButtons = document.querySelectorAll('.filter-buttons button');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        renderCourses(filter);
    });
});

// Initial Render
renderCourses();

