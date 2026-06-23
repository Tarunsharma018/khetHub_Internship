// ========== HEADER SCROLL ==========
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
});

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// ========== ACTIVE NAV ==========
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    const link = document.querySelector('.nav-link[href="#' + id + '"]');
    if (link) {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ========== SCROLL REVEAL ==========
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ========== COUNTER ANIMATION ==========
function animateCounter(el, target, duration) {
  duration = duration || 2000;
  const startTime = performance.now();
  const isLarge = target > 1000;
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = isLarge ? current.toLocaleString('en-IN') : current;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = isLarge ? target.toLocaleString('en-IN') : target;
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ========== CONTACT FORM ==========
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(function() {
      formSuccess.classList.add('show');
      form.reset();
      btn.textContent = 'Send Message \uD83C\uDF3E';
      btn.disabled = false;
      setTimeout(function() { formSuccess.classList.remove('show'); }, 5000);
    }, 1200);
  });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

// ========== RIPPLE ON SERVICE CARDS ==========
var rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes rippleEffect { to { transform: translate(-50%,-50%) scale(60); opacity: 0; } }';
document.head.appendChild(rippleStyle);

document.querySelectorAll('.service-card').forEach(function(card) {
  card.addEventListener('click', function(e) {
    var ripple = document.createElement('span');
    ripple.style.cssText = 'position:absolute;width:6px;height:6px;background:rgba(74,124,63,0.25);border-radius:50%;top:' + e.offsetY + 'px;left:' + e.offsetX + 'px;transform:translate(-50%,-50%) scale(0);animation:rippleEffect 0.5s ease-out forwards;pointer-events:none;';
    this.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 500);
  });
});

// ========== FEATURE ITEM SLIDE ==========
document.querySelectorAll('.feature-item').forEach(function(item) {
  item.addEventListener('mouseenter', function() { this.style.transition = 'all 0.3s ease'; this.style.paddingLeft = '24px'; });
  item.addEventListener('mouseleave', function() { this.style.paddingLeft = '0'; });
});