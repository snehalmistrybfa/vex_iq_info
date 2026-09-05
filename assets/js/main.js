// ============================================
// VEX IQ Build Guide - Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ---- Navbar toggle (mobile) ----
  const toggle = document.querySelector('.navbar-toggle');
  const links = document.querySelector('.navbar-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // ---- Tabs ----
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const group = this.closest('.tabs-container') || document;
      group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const target = this.getAttribute('data-tab');
      const content = group.querySelector(`#${target}`);
      if (content) content.classList.add('active');
    });
  });

  // ---- Smooth scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Video modal ----
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.getAttribute('data-video');
      if (url) window.open(url, '_blank');
    });
  });

  // ---- Active nav highlighting ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-links a');
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop - 80;
        if (window.scrollY >= top) current = section.getAttribute('id');
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
      });
    });
  }

  // ---- Parts search filter ----
  const searchBox = document.querySelector('#part-search');
  if (searchBox) {
    searchBox.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      document.querySelectorAll('.part-card').forEach(card => {
        const name = card.querySelector('h4')?.textContent.toLowerCase() || '';
        card.style.display = name.includes(query) ? '' : 'none';
      });
    });
  }

  // ---- Parts category filter ----
  document.querySelectorAll('.part-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const cat = this.getAttribute('data-category');
      document.querySelectorAll('.part-filter-btn').forEach(b => b.classList.remove('active-filter'));
      this.classList.add('active-filter');
      document.querySelectorAll('.part-card').forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

});