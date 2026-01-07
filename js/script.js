// =============================
// INIT AOS
// =============================
AOS.init({
  duration: 1000,
  once: true
});

// =============================
// HERO ANIMATION
// =============================
gsap.from(".hero-title", {
  y: 120,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out"
});

gsap.from(".hero-tagline", {
  y: 60,
  opacity: 0,
  duration: 1,
  delay: 0.5,
  ease: "power3.out"
});

// =============================
// MATCH CARDS ANIMATION
// =============================
gsap.registerPlugin(ScrollTrigger);

gsap.from(".swiper-slide", {
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".matches",
    start: "top 80%"
  }
});

// =============================
// SWIPER SLIDER INIT
// =============================
const swiper = new Swiper(".swiper", {
  slidesPerView: 1.2,
  spaceBetween: 30,
  loop: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2.2 },
    1024: { slidesPerView: 3.2 },
  },
});
