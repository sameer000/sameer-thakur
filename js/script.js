
/* ===============================
   DOM READY
================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Load components
  loadComponent('/components/menu.html', 'mobile-menu');
  loadComponent('/components/header.html', 'notch', initHeaderFeatures);
  loadComponent('/components/footer.html', 'footer');

  // Init projects
  initProjects();

  // Start clock
  startClock();
});

/* ===============================
   COMPONENT LOADER
================================ */
function loadComponent(path, targetId, callback) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error(`${path} not found`);
      return res.text();
    })
    .then(html => {
      const el = document.getElementById(targetId);
      if (el) el.innerHTML = html;

      // Re-init lucide icons after HTML injection
      if (window.lucide) lucide.createIcons();

      if (callback) callback();
    })
    .catch(err => console.error(err));
}

/* ===============================
   PROJECT VIEW MORE (FIXED)
================================ */
function initProjects() {
  const viewMoreBtn = document.getElementById('view-more-btn');
  const projectsPerLoad = 4;

  if (!viewMoreBtn) return;

  viewMoreBtn.addEventListener('click', () => {

    const hiddenProjects = Array.from(
      document.querySelectorAll('.project-card:not(.visible)')
    );

    const toReveal = hiddenProjects.slice(0, projectsPerLoad);

    toReveal.forEach((proj, index) => {
      setTimeout(() => {
        proj.classList.add('visible');

        // After last reveal, check remaining cards
        if (index === toReveal.length - 1) {
          setTimeout(() => {
            const remaining = document.querySelectorAll(
              '.project-card:not(.visible)'
            );

            if (remaining.length === 0) {
              viewMoreBtn.style.display = 'none';
            }
          }, 120); // animation buffer
        }

      }, index * 100);
    });

  });
}

/* ===============================
   MENU TOGGLE
================================ */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const burger = document.getElementById('burger-btn');
  const notch = document.getElementById('notch');

  if (!menu || !burger || !notch) return;

  menu.classList.toggle('active');
  burger.classList.toggle('open');

  if (menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
    notch.style.background = '#fff';
    notch.style.color = '#000';
    document
      .querySelectorAll('.burger-line')
      .forEach(l => (l.style.background = '#000'));
  } else {
    document.body.style.overflow = 'auto';
    notch.style.background = '#000';
    notch.style.color = '#fff';
    document
      .querySelectorAll('.burger-line')
      .forEach(l => (l.style.background = '#fff'));
  }
}

/* ===============================
   HEADER FEATURES
================================ */
function initHeaderFeatures() {
  updateClock();
  if (window.lucide) lucide.createIcons();
}

/* ===============================
   LIVE CLOCK
================================ */
function updateClock() {
  const clock = document.getElementById('live-clock');
  if (!clock) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });

  clock.textContent = `${timeStr} IST`;
}

function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}
