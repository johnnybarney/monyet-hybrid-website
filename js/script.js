// js/script.js - Advanced GSAP + Swiper

gsap.registerPlugin(ScrollTrigger);

// Hero Slider
const heroSwiper = new Swiper(".hero-match-slider", {
  loop: true,
  autoplay: { delay: 6000, disableOnInteraction: false },
  effect: "fade",
  navigation: { nextEl: ".hero-nav.swiper-button-next", prevEl: ".hero-nav.swiper-button-prev" },
  pagination: { el: ".hero-pagination", clickable: true },
  on: {
    slideChangeTransitionStart: () => {
      gsap.fromTo(".hero-match-content > *", { y: 100, opacity: 0, rotationY: 20 },
        { y: 0, opacity: 1, rotationY: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" });
    }
  }
});

// Initial hero content animation
gsap.fromTo(".hero-match-content > *", { y: 100, opacity: 0 },
  { y: 0, opacity: 1, duration: 1.4, stagger: 0.2, delay: 0.5, ease: "power4.out" });

// Hero title & tagline
gsap.from(".hero-title", { y: 150, opacity: 0, duration: 1.5, ease: "power4.out" });
gsap.from(".hero-tagline", { y: 80, opacity: 0, duration: 1.2, delay: 0.8, ease: "power3.out" });

// Countdown for Next Match (19 Jan 2025 - adjust if needed)
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const target = new Date('2025-01-19T00:00:00').getTime(); // Change year if match is 2026
  const update = () => {
    const now = new Date().getTime();
    const diff = target - now;
    if (diff <= 0) { countdownEl.innerHTML = "MATCH DAY!"; return; }
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const m = Math.floor((diff % (1000*60*60)) / (1000*60));
    countdownEl.innerHTML = `${d} Days ${h} Hours ${m} Mins`;
  };
  setInterval(update, 60000);
  update();
}

// Text Split Animation for Titles
gsap.utils.toArray(".split-title").forEach(title => {
  const chars = title.textContent.split("").map(c => c === " " ? "<span>&nbsp;</span>" : `<span>${c}</span>`).join("");
  title.innerHTML = chars;
  gsap.from(title.querySelectorAll("span"), {
    y: 120, rotationX: -90, opacity: 0, stagger: 0.05, duration: 1.5, ease: "back.out(1.7)",
    scrollTrigger: { trigger: title, start: "top 80%" }
  });
});

// Player Cards Advanced Reveal + Hover
gsap.utils.toArray(".player").forEach((player, i) => {
  gsap.from(player, {
    y: 200, opacity: 0, rotation: -10, scale: 0.8, duration: 1.5, ease: "elastic.out(1,0.4)",
    scrollTrigger: { trigger: player, start: "top 85%", toggleActions: "play none none reverse" },
    delay: i * 0.2
  });

  player.addEventListener("mouseenter", () => gsap.to(player, { scale: 1.15, rotation: 8, boxShadow: "0 0 80px rgba(245,183,0,0.8)", duration: 0.6 }));
  player.addEventListener("mouseleave", () => gsap.to(player, { scale: 1, rotation: 0, boxShadow: "none", duration: 0.6 }));
});

// Horizontal Scroll for Match Cards
const matchCards = gsap.utils.toArray(".match-card");
gsap.to(matchCards, {
  xPercent: -100 * (matchCards.length - 3), // Adjust based on visible cards
  ease: "none",
  scrollTrigger: {
    trigger: ".matches",
    pin: true,
    scrub: 1,
    start: "top top",
    end: "+=200%",
    invalidateOnRefresh: true
  }
});

// Initial stagger for match cards
gsap.from(matchCards, { y: 150, opacity: 0, stagger: 0.3, duration: 1.2,
  scrollTrigger: { trigger: ".matches", start: "top 80%" }
});
