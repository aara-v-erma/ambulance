
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('#mobile-menu');

  hamburger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    menu.hidden = !open;
    hamburger.setAttribute('aria-expanded', open.toString());
  });

  const darkToggle = document.querySelector('.dark-toggle');
  darkToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.removeAttribute("aria-current");
          if (link.getAttribute("href").substring(1) === id) {
            link.setAttribute("aria-current", "page");
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
});

// Lightbox for gallery images
const galleryImages = document.querySelectorAll('.gallery-image');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox-overlay';
document.body.appendChild(lightbox);

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.innerHTML = '<img src="' + img.src + '" alt="' + img.alt + '"/>';
    lightbox.classList.add('visible');
  });
});
lightbox.addEventListener('click', () => lightbox.classList.remove('visible'));

// Autofill pickup location using Geolocation API
const pickupField = document.getElementById('pickup-location');
if (navigator.geolocation && pickupField) {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    pickupField.value = `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`;
  });
}

// Hide hamburger when menu is open
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('#mobile-menu');
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  hamburger.style.display = isOpen ? 'flex' : 'none';
});
mobileMenu.addEventListener('transitionend', () => {
  if (!mobileMenu.classList.contains('open')) hamburger.style.display = 'flex';
});
