// js/script.js - FINAL PRODUCTION VERSION (MOBILE-SAFE)
gsap.registerPlugin(ScrollTrigger);

// Debounce helper for resize events
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Helper: Get player image by name
function getPlayerImage(name) {
  const nameMap = {
    "Naem": "images/naem2.jpg",
    "Apis": "images/apis.jpg",
    "Niezam": "images/nizam3.jpg", // Ensure filename matches actual file!
    "Nizam": "images/nizam3.jpg"   // Alias in case of typo variation
  };
  return nameMap[name] || "images/default.jpg";
}

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

// 2. Countdown Timer (Next match: 9 Jan 2026)
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const target = new Date('2026-01-09T00:00:00').getTime();
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

// 5. Animated Stats Counters (Trophies + Team Stats)
gsap.utils.toArray('.stat-number, .stat-value[data-target]').forEach(stat => {
  const target = parseFloat(stat.getAttribute('data-target'));
  if (isNaN(target)) return;
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

// === PLAYER STATS DATA ===
const players = [
  { name: "Niezam", pos: "Midfielder", goals: 0, assists: 0, yel: 0, red: 0, motm: 0 },
  { name: "Naem", pos: "Midfielder", goals: 1, assists: 0, yel: 0, red: 0, motm: 0 },
  { name: "Apis", pos: "Midfielder", goals: 0, assists: 1, yel: 0, red: 0, motm: 0 }
];

// === CALCULATE TOTAL CONTRIBUTION (Goals + Assists) ===
players.forEach(player => {
  player.total = player.goals + player.assists;
});

// === UPDATE TOP PLAYER HIGHLIGHTS ===
function updateTopPlayers() {
  const topContributor = players.reduce((max, player) => player.total > max.total ? player : max, players[0]);
  const topScorer = players.reduce((max, player) => player.goals > max.goals ? player : max, players[0]);
  const topAssister = players.reduce((max, player) => player.assists > max.assists ? player : max, players[0]);

  document.getElementById('topContributor').textContent = `${topContributor.name} — ${topContributor.total} Total`;
  document.getElementById('topScorer').textContent = `${topScorer.name} — ${topScorer.goals} Goals`;
  document.getElementById('topAssister').textContent = `${topAssister.name} — ${topAssister.assists} Assists`;

  // Update photos dynamically
  document.querySelector('.highlight-card:first-child img').src = getPlayerImage(topContributor.name);
  document.querySelector('.highlight-card:nth-child(2) img').src = getPlayerImage(topScorer.name);
  document.querySelector('.highlight-card:nth-child(3) img').src = getPlayerImage(topAssister.name);
}

// === RENDER TABLE ===
function renderPlayerTable(sortBy = 'total') {
  const tbody = document.getElementById('playerStatsBody');
  if (!tbody) return;

  const sortedPlayers = [...players].sort((a, b) => b[sortBy] - a[sortBy]);

  tbody.innerHTML = sortedPlayers.map(player => `
    <tr>
      <td>${player.name}</td>
      <td>${player.pos}</td>
      <td>${player.goals}</td>
      <td>${player.assists}</td>
      <td>${player.yel}</td>
      <td>${player.red}</td>
      <td>${player.motm}</td>
    </tr>
  `).join('');

  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sort === sortBy);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateTopPlayers();
  renderPlayerTable('total');

  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      renderPlayerTable(btn.dataset.sort);
    });
  });
});

// ✅ SAFE RESIZE HANDLER (mobile rotation, etc.)
window.addEventListener(
  'resize',
  debounce(() => {
    if (typeof heroSwiper !== 'undefined' && heroSwiper?.update) {
      heroSwiper.update();
    }
    if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh) {
      ScrollTrigger.refresh();
    }
  }, 250)
);

// Refresh Swiper & ScrollTrigger on resize (mobile rotation etc.)
window.addEventListener('resize', () => {
  heroSwiper.update();
  ScrollTrigger.refresh();
});
