// Lucide Icons 
        lucide.createIcons();

        // Project Reveal Logic
        const viewMoreBtn = document.getElementById('view-more-btn');
        const projectsPerLoad = 4;

        viewMoreBtn.addEventListener('click', () => {
            const hiddenProjects = Array.from(document.querySelectorAll('.project-card:not(.visible)'));
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

        // Menu Toggle Logic
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            const burger = document.getElementById('burger-btn');
            const notch = document.getElementById('notch');
            
            menu.classList.toggle('active');
            burger.classList.toggle('open');
            
            if(menu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                notch.style.background = '#fff';
                notch.style.color = '#000';
                document.querySelectorAll('.burger-line').forEach(l => l.style.background = '#000');
            } else {
                document.body.style.overflow = 'auto';
                notch.style.background = '#000';
                notch.style.color = '#fff';
                document.querySelectorAll('.burger-line').forEach(l => l.style.background = '#fff');
            }
        }

        // Live Clock logic
        function updateClock() {
            const clock = document.getElementById('live-clock');
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', minute: '2-digit', second: '2-digit', 
                hour12: true, timeZone: 'Asia/Kolkata'
            });
            clock.textContent = `${timeStr} IST`;
        }
        setInterval(updateClock, 1000);
        updateClock();
