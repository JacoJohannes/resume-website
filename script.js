/*
 * Custom JavaScript for the resume site.
 * Handles dynamic behaviors like updating the current year,
 * smooth scrolling and responsive navigation toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update footer year automatically
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Close menu on small screens after clicking
      const nav = document.getElementById('navbar');
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  });

  // Toggle navigation on small screens
  const navbar = document.getElementById('navbar');
  const navToggle = navbar.querySelector('.nav-toggle');
  navToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
});