// Static project data (from Supabase backup, 11 August 2026)
const projects = [
  { project: 'Holograph Technologies', sorting_number: 1, project_link: 'https://www.holographtechnologies.com/' },
  { project: 'Sparkr', sorting_number: 2, project_link: 'https://sparkr-staging.webflow.io/' },
  { project: 'Genius BSI', sorting_number: 3, project_link: 'https://www.geniusbsi.com/' },
  { project: 'Pintarro', sorting_number: 4, project_link: 'https://www.pintarro.com/' },
  { project: 'IND Robo Tech', sorting_number: 5, project_link: 'https://www.indrobotech.com/' },
  { project: 'Desire Migration', sorting_number: 6, project_link: 'https://www.desiremigration.com.au/' },
  { project: 'Fair Chance Foundation', sorting_number: 7, project_link: 'https://fairfoundation.webflow.io/' },
  { project: 'Join Brightlife', sorting_number: 8, project_link: 'https://www.joinbrightlife.com/' },
  { project: 'The Full Circle', sorting_number: 9, project_link: 'https://www.thefullcircle.in/' },
  { project: '1Channel', sorting_number: 10, project_link: 'https://www.1channel.co/' },
  { project: 'Maisum', sorting_number: 11, project_link: 'https://maisum.webflow.io/' },
  { project: 'Channel Play', sorting_number: 12, project_link: 'https://www.channelplay.in/' },
  { project: 'Hexxy', sorting_number: 13, project_link: 'https://hexxy.webflow.io/' },
  { project: 'Hues HQ', sorting_number: 14, project_link: 'https://hues-hq.webflow.io/' },
  { project: 'Rampp AI', sorting_number: 15, project_link: 'https://rampp.webflow.io/' },
  { project: 'Imperial Construction Services', sorting_number: 16, project_link: 'https://ics-staging.webflow.io/' },
  { project: 'Primasoy', sorting_number: 17, project_link: 'https://primasoy-staging.webflow.io/' },
  { project: 'Sterling Interiors', sorting_number: 18, project_link: 'https://www.sterlinginteriors.co.uk/' },
  { project: 'Holograph Pressworks', sorting_number: 19, project_link: 'https://holograph-press-works.webflow.io/' },
  { project: 'Hugin', sorting_number: 20, project_link: 'https://hugin.webflow.io/' },
  { project: 'Eazy Build', sorting_number: 21, project_link: 'https://eazybuild.webflow.io/' },
  { project: 'Get Vidya', sorting_number: 22, project_link: 'https://get-vidya.webflow.io/' },
  { project: 'Costroom', sorting_number: 23, project_link: 'https://costroom.webflow.io/' }
]

const projectsSection = document.getElementById('project-grid')

// Function to render projects in HTML
function renderProjects(projects) {
  projectsSection.innerHTML = projects.map(project => `

<div class="comic-panel project-card">
                        <div class="project-img">
                        <div class="halftone"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="activity" aria-hidden="true" class="lucide lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg>
                        </div>
                        <div class="project-content">
                            <h3 class="comic-font project-title">${project.project}</h3>
                            ${project.project_link ? `<a href="${project.project_link}" target="_blank" class="project-link">View Project</a>` : ''}
                        </div>
                    </div>

  `).join('')
}

renderProjects([...projects].sort((a, b) => a.sorting_number - b.sorting_number))
