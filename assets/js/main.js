// Initialize AOS (scroll animations)
AOS.init({ duration: 800, once: true });

// Mobile menu toggle
const toggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
if (toggle && navLinks) {
  toggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
  });
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('open');
  });
});

// Active nav highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  let current = '';
  sections.forEach(function(section) {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Add shadow to navbar on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Contact form submission (demo)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message, Amar will get back to you soon!');
    this.reset();
  });
  // Animate skill progress bars on scroll
const skillBars = document.querySelectorAll('.progress-fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.style.width; // store the target width
      bar.style.width = '0'; // reset to 0
      setTimeout(() => {
        bar.style.width = targetWidth; // animate to target
      }, 100);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => observer.observe(bar));
}// ---------- SUBTLE MOUSE PARALLAX (hero only) ----------
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const accent = document.querySelector('.code-accent');
  const wrappers = document.querySelectorAll('.float-wrapper');

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = (x - centerX) / centerX;  // -1..1
    const moveY = (y - centerY) / centerY;
    const maxOffset = 5; // max 5px movement

    // Accent
    if (accent) {
      const dx = moveX * maxOffset;
      const dy = moveY * maxOffset;
      accent.style.setProperty('--parallax-x', dx + 'px');
      accent.style.setProperty('--parallax-y', dy + 'px');
      accent.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    }

    // Floating wrappers
    wrappers.forEach((wrapper, index) => {
      const factor = 1 + index * 0.2; // each moves slightly differently
      const dx = moveX * (maxOffset * factor);
      const dy = moveY * (maxOffset * factor);
      wrapper.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  });

  // Reset on mouse leave (optional – returns to original position)
  hero.addEventListener('mouseleave', () => {
    if (accent) {
      accent.style.transform = 'translate(-50%, -50%)';
    }
    wrappers.forEach(wrapper => {
      wrapper.style.transform = 'translate(0, 0)';
    });
  });
})();