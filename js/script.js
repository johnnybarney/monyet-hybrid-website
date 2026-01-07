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

// 2. Countdown Timer
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

// 3. Split Title Animation
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

// 4. Player Animations
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

// 5. Animated Stats Counters
gsap.utils.toArray('.stat-number').forEach(stat => {
  const target = parseFloat(stat.getAttribute('data-target'));
  ScrollTrigger.create({
    trigger: stat,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.fromTo(stat, 
        { innerText: 0 },
        {
          innerText: target,
          duration: 2.5,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function() {
            stat.textContent = Math.floor(this.targets()[0].innerText);
          }
        }
      );
    }
  });
});

// 6. Match Cards Animation
gsap.utils.toArray('.match-card').forEach(card => {
  gsap.from(card, {
    y: 80,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 90%',
      once: true
    }
  });
});

// 7. Navbar Fade on Hero
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  onToggle: self => {
    document.querySelector('.navbar').classList.toggle('faded', self.isActive);
  }
});