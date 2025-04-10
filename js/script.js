const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
  });
}

let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
let slideInterval;

function showSlides() {
  slides.forEach(slide => slide.classList.remove('active'));
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  if (slideIndex < 1) { slideIndex = slides.length; }
  slides[slideIndex - 1].classList.add('active');
}

function nextSlide() {
  clearInterval(slideInterval);
  slideIndex++;
  showSlides();
  startSlideshow();
}

function prevSlide() {
  clearInterval(slideInterval);
  slideIndex--;
  showSlides();
  startSlideshow();
}

function startSlideshow() {
  slideInterval = setInterval(() => {
    slideIndex++;
    showSlides();
  }, 5000);
}

if (slides.length > 0) {
  showSlides();
  startSlideshow();
}
