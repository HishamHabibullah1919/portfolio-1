/* ==========================================================================
   PORTFOLIO SCRIPT
   Handles: live date/time display, navbar scroll state, active link
   highlighting, mobile menu auto-close, and footer year.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     1. LIVE DATE & TIME DISPLAY
     Updates every second inside the terminal status bar in the hero.
     --------------------------------------------------------------------- */
  const dateTimeEl = document.getElementById('liveDateTime');

  // Formatting options for a clean, readable timestamp
  const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString(undefined, dateOptions);
    const timeStr = now.toLocaleTimeString(undefined, timeOptions);
    if (dateTimeEl) {
      dateTimeEl.textContent = `${dateStr}  //  ${timeStr}`;
    }
  }

  updateDateTime();               // Set immediately on load
  setInterval(updateDateTime, 1000); // Then tick every second

  /* ---------------------------------------------------------------------
     2. NAVBAR SCROLL STATE
     Adds a "scrolled" class once the user scrolls past the hero,
     shrinking the navbar and increasing background opacity.
     --------------------------------------------------------------------- */
  const mainNav = document.getElementById('mainNav');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll(); // Run once in case the page loads mid-scroll

  /* ---------------------------------------------------------------------
     3. ACTIVE LINK HIGHLIGHTING
     Uses IntersectionObserver to mark the nav link of the section
     currently in view as "active".
     --------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

  const observerOptions = {
    root: null,
    rootMargin: '-45% 0px -50% 0px', // Trigger when section is near vertical center
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------------------------------------------------------------------
     4. AUTO-CLOSE MOBILE MENU ON LINK CLICK
     Improves UX on mobile: tapping a nav link collapses the open menu.
     --------------------------------------------------------------------- */
  const navMenu = document.getElementById('navMenu');
  const navMenuLinks = navMenu.querySelectorAll('.nav-link, .btn-outline-nav');

  navMenuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });

  /* ---------------------------------------------------------------------
     5. FOOTER — CURRENT YEAR
     Keeps the copyright year accurate without manual updates.
     --------------------------------------------------------------------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});