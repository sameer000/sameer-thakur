
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

// FAQ Accordion Logic
        document.querySelectorAll('.faq-question').forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                item.classList.toggle('active');
                // Close others if needed
                document.querySelectorAll('.faq-item').forEach(other => {
                    if (other !== item) other.classList.remove('active');
                });
            });
        });

/* ===============================
   PROJECT VIEW MORE (FIXED)
================================ */
function initProjects() {
  const viewMoreBtn = document.getElementById('view-more-btn');
  const initialShow = 6;
  const projectsPerLoad = 4;

  if (!viewMoreBtn) return;

  function setupInitialCards() {
    const allProjects = Array.from(document.querySelectorAll('.project-card'));

    if (allProjects.length === 0) return;

    allProjects.slice(0, initialShow).forEach((proj) => {
      proj.classList.add('visible');
    });

    if (allProjects.length <= initialShow) {
      viewMoreBtn.style.display = 'none';
    }
  }

  const observer = new MutationObserver(() => {
    const projects = document.querySelectorAll('.project-card');

    if (projects.length > 0) {
      setupInitialCards();
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  viewMoreBtn.addEventListener('click', () => {
    const hiddenProjects = Array.from(
      document.querySelectorAll('.project-card:not(.visible)')
    );

    const toReveal = hiddenProjects.slice(0, projectsPerLoad);

    toReveal.forEach((proj, index) => {
      setTimeout(() => {
        proj.classList.add('visible');

        if (index === toReveal.length - 1) {
          setTimeout(() => {
            const remaining = document.querySelectorAll(
              '.project-card:not(.visible)'
            );

            if (remaining.length === 0) {
              viewMoreBtn.style.display = 'none';
            }
          }, 150);
        }
      }, index * 100);
    });
  });
}

document.addEventListener("DOMContentLoaded", initProjects);


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


/* ===============================
   Phone Country Code
================================ */

 $(document).ready(function() {
    var input = $("#phone");

    input.intlTelInput({
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.0.6/js/utils.js"
    });

    // Function to update the value of id="cCode" based on the title attribute
    function updateCCodeValue() {
      var selectedFlagTitle = $('.selected-flag').attr('title');
      $('#cCode').val(selectedFlagTitle);
    }

    // Trigger the update function initially
    updateCCodeValue();

    // Use MutationObserver to detect changes to the title attribute
    var observer = new MutationObserver(function(mutationsList) {
      for (var mutation of mutationsList) {
        if (mutation.attributeName === 'title') {
          // When the title attribute changes, update the value of id="cCode"
          updateCCodeValue();
        }
      }
    });

    // Observe changes to attributes of the element with class="selected-flag"
    observer.observe($('.selected-flag')[0], { attributes: true });

    // Detect user's IP and set the country
    $.get("https://ipinfo.io", function(response) {
      var countryCode = response.country;
      input.intlTelInput("setCountry", countryCode.toLowerCase());
    }, "jsonp");
  });
