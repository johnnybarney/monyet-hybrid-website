// js/script.js - FINAL PRODUCTION VERSION
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
      // Prevent content stacking
      document.querySelectorAll('.hero-match-content').forEach(el => {
        gsap.set(el, { opacity: 0, y: 50 });
      });

      const currentSlide = swiper.slides[swiper.activeIndex];
      const content = currentSlide.querySelector('.hero-match-content');
      if (content) {
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

// 3. Countdown Timer → FIXED TO 19 JAN 2025
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const target = new Date('2025-01-19T00:00:00').getTime();
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
  update();
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

// 6. Horizontal Scroll for Matches
const container = document.querySelector(".match-cards-container");
if (container) {
  const cards = gsap.utils.toArray(".match-card");
  const totalWidth = cards.reduce((acc, card) => {
    return acc + card.offsetWidth + 40; // 40 = gap
  }, 0) - 40;

  gsap.to(container, {
    x: () => `-${totalWidth - window.innerWidth + 100}`,
    ease: "none",
    scrollTrigger: {
      trigger: ".matches",
      start: "top top",
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  });

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

// ✅ 7. Navbar Fade on Hero Section
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  onToggle: self => {
    document.querySelector('.navbar').classList.toggle('faded', self.isActive);
  }
});