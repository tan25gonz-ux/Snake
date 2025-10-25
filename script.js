// === FADE-IN AL HACER SCROLL ===
const sections = document.querySelectorAll(".fade-section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
});
sections.forEach((sec) => observer.observe(sec));

// === CARRUSEL 3D ===
const slides = document.querySelectorAll(".carrusel-3d .slide");
let current = 0;
function updateCarousel() {
  slides.forEach((slide, i) => {
    const offset = i - current;
    slide.style.transform = `translateX(${offset * 300}px) scale(${
      offset === 0 ? 1 : 0.8
    })`;
    slide.style.opacity = offset === 0 ? 1 : 0.5;
    slide.style.zIndex = slides.length - Math.abs(offset);
  });
}
setInterval(() => {
  current = (current + 1) % slides.length;
  updateCarousel();
}, 4000);
updateCarousel();

// === ANIMACIÓN LOGO CON NIEBLA ===
window.addEventListener("load", () => {
  const intro = document.getElementById("intro-logo");
  const canvas = document.getElementById("fogCanvas");
  const ctx = canvas.getContext("2d");
  const sound = document.getElementById("snakeSound");

  // sonido al cargar
  setTimeout(() => {
    sound.volume = 0.3;
    sound.play().catch(() => {}); // evita error si el navegador bloquea sonido
  }, 500);

  // ajustar tamaño canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // partículas tipo niebla
  const particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 80 + 40,
      opacity: Math.random() * 0.3 + 0.1,
      dx: Math.random() * 0.6 - 0.3,
      dy: Math.random() * 0.4 - 0.2,
    });
  }

  function drawFog() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.radius
      );
      gradient.addColorStop(0, `rgba(76,175,80,${p.opacity})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < -100) p.x = canvas.width + 100;
      if (p.y < -100) p.y = canvas.height + 100;
      if (p.x > canvas.width + 100) p.x = -100;
      if (p.y > canvas.height + 100) p.y = -100;
    });
    requestAnimationFrame(drawFog);
  }
  drawFog();

  // desvanecer intro
  setTimeout(() => {
    intro.classList.add("fade-out");
  }, 4500);
});
