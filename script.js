
const sections = document.querySelectorAll('.fade-section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
});
sections.forEach(sec => observer.observe(sec));


const slides = document.querySelectorAll('.carrusel-3d .slide');
let current = 0;
function updateCarousel() {
  slides.forEach((slide, i) => {
    const offset = i - current;
    slide.style.transform = `translateX(${offset * 300}px) scale(${offset === 0 ? 1 : 0.8})`;
    slide.style.opacity = offset === 0 ? 1 : 0.5;
    slide.style.zIndex = slides.length - Math.abs(offset);
  });
}
setInterval(() => {
  current = (current + 1) % slides.length;
  updateCarousel();
}, 4000);
updateCarousel();
