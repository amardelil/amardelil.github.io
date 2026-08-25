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
// ---------- CONTACT FORM (EmailJS) ----------
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Replace these with your actual EmailJS keys
const SERVICE_ID = 'YOUR_SERVICE_ID';      // e.g., 'service_abc123'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // e.g., 'template_xyz789'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // e.g., 'user_abc123'

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Show loading status
    formStatus.style.display = 'block';
    formStatus.style.color = 'var(--text-secondary)';
    formStatus.textContent = 'Sending message...';

    // Send email via EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      subject: subject || 'New message from portfolio',
      message: message,
      to_name: 'Amar Delil'
    })
    .then(function(response) {
      formStatus.style.color = '#22c55e';
      formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
      contactForm.reset();
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    })
    .catch(function(error) {
      formStatus.style.color = '#ef4444';
      formStatus.textContent = '❌ Failed to send message. Please try again later.';
      console.error('EmailJS Error:', error);
    });
  });
}
// ---------- THEME TOGGLE ----------
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    root.removeAttribute('data-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

// Load saved preference (defaults to dark, matching your current site)
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', function () {
  const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', current);
  applyTheme(current);
});