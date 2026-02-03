
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

      // Re-init Lucide icons after component load
      if (window.lucide) lucide.createIcons();

      if (callback) callback();
    })
    .catch(err => console.error(err));
}

/* ===============================
   INIT AFTER DOM READY
================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Load Components
  loadComponent('components/menu.html', 'mobile-menu');
  loadComponent('components/header.html', 'notch', initHeaderFeatures);
  loadComponent('components/footer.html', 'footer');

  // View More Projects
  initProjects();

  // Live Clock
  startClock();
});

/* ===============================
   PROJECT REVEAL LOGIC
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
      }, index * 100);
    });

    if (hiddenProjects.length <= projectsPerLoad) {
      viewMoreBtn.style.display = 'none';
    }
  });
}

/* ===============================
   MENU TOGGLE (GLOBAL)
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
   HEADER-SPECIFIC FEATURES
================================ */
function initHeaderFeatures() {
  // Run after header loads

  // Clock init again (header contains clock)
  updateClock();

  // Icons
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



document.addEventListener('DOMContentLoaded', () => {

  fetch('/components/menu.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('mobile-menu').innerHTML = data;
    });

  fetch('/components/header.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('notch').innerHTML = data;
    });

  fetch('/components/footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });

});
