// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// Projects Carousel
const carousel = document.getElementById('project-carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('carousel-dots');

let currentSlide = 0;
let autoScrollInterval;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-scroll every 3 seconds
function startAutoScroll() {
    autoScrollInterval = setInterval(nextSlide, 3000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Pause on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopAutoScroll);
carouselContainer.addEventListener('mouseleave', startAutoScroll);

// Initialize
updateCarousel();
startAutoScroll();

// Contact Form (basic validation and alert for demo)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent. (Demo: This would submit to a backend.)`);
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});
