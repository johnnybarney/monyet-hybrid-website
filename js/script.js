// js/script.js - FINAL CORRECTED VERSION
gsap.registerPlugin(ScrollTrigger);

// 1. Hero Swiper
const heroSwiper = new Swiper(".hero-match-slider", {
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  navigation: {
    nextEl: ".hero-nav.swiper-button-next",
    prevEl: ".hero-nav.swiper-button-prev"
  },
  pagination: {
    el: ".hero-pagination",
    clickable: true
  },
  on: {
    slideChangeTransitionStart: (swiper) => {
      // Hide all content first to avoid stacking
      document.querySelectorAll('.hero-match-content').forEach(el => {
        gsap.set(el, { opacity: 0 });
      });

      const currentSlide = swiper.slides[swiper.activeIndex];
      const content = currentSlide.querySelector('.hero-match-content');
      if (content) {
        gsap.set(content, { opacity: 0, y: 50 });
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out"
        });
      }
    }
  }
});

// 2. Hero title & tagline (on load)
gsap.from(".hero-title", { y: 150, opacity: 0, duration: 1.5, ease: "power4.out" });
gsap.from(".hero-tagline", { y: 80, opacity: 0, duration: 1.2, delay: 0.8, ease: "power3.out" });

// 3. Countdown Timer (✅ Fixed to 19 Jan 2025)
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const target = new Date('2025-01-19T00:00:00').getTime(); // ✅ Correct year!
  const update = () => {
    const now = new Date().getTime();
    const diff = target - now;
    if (diff <= 0) {
      countdownEl.textContent = "MATCH DAY!";
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    countdownEl.textContent = `${d}d ${h}h ${m}m`;
  };
  setInterval(update, 60000);
  update(); // run immediately
}

// 4. Split Title Animation
gsap.utils.toArray(".split-title").forEach(title => {
  const text = title.textContent;
  const chars = text.split("").map(c => c === " " ? "<span>&nbsp;</span>" : `<span>${c}</span>`).join("");
  title.innerHTML = chars;
  gsap.from(title.querySelectorAll("span"), {
    y: 120,
    rotationX: -90,
    opacity: 0,
    stagger: 0.03,
    duration: 1.2,
    ease: "back.out(1.4)",
    scrollTrigger: {
      trigger: title,
      start: "top 85%",
      once: true
    }
  });
});

// 5. Player Animations
gsap.utils.toArray(".player").forEach((player, i) => {
  gsap.from(player, {
    y: 100,
    opacity: 0,
    scale: 0.9,
    duration: 1,
    delay: i * 0.2,
    scrollTrigger: {
      trigger: player,
      start: "top 85%",
      once: true
    }
  });
});

// 6. HORIZONTAL SCROLL – FIXED!
const horizontalSection = document.querySelector(".matches");
const container = document.querySelector(".match-cards-container");
if (container) {
  const cards = gsap.utils.toArray(".match-card");
  const width = cards.reduce((acc, card) => acc + parseFloat(getComputedStyle(card).width) + 40, 0) - 40;

  // Pin & scroll horizontally
  gsap.to(container, {
    x: () => `-${width - window.innerWidth + 100}`,
    ease: "none",
    scrollTrigger: {
      trigger: ".matches",
      start: "top top",
      end: () => `+=${width}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  });

  // Fade-in cards on enter
  gsap.from(cards, {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: ".matches",
      start: "top 80%",
      once: true
    }
  });
}