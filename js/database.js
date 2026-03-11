// Import Supabase client
// https://wusuxccycluxrnudgwzh.supabase.co
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1c3V4Y2N5Y2x1eHJudWRnd3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NDgzNTksImV4cCI6MjA4NTQyNDM1OX0.Eao59gp6TXpNIHjipBF8yCbhzB-OPuWwvog0NBjrZ8M
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase credentials
const supabaseUrl = 'https://wusuxccycluxrnudgwzh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1c3V4Y2N5Y2x1eHJudWRnd3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NDgzNTksImV4cCI6MjA4NTQyNDM1OX0.Eao59gp6TXpNIHjipBF8yCbhzB-OPuWwvog0NBjrZ8M'
const supabase = createClient(supabaseUrl, supabaseKey)

const projectsSection = document.getElementById('project-grid')

// Function to fetch projects
async function fetchProjects() {
  try {
    const { data, error } = await supabase
      .from('sameer-projects') // table name exactly as in Supabase
      .select('*')
      .order('sorting_number', { ascending: true }) // optional sorting

    if (error) {
      console.error('Error fetching projects:', error)
      projectsSection.innerHTML = '<p>Failed to load projects.</p>'
      return
    }

    if (!data || data.length === 0) {
      projectsSection.innerHTML = '<p>No projects found.</p>'
      return
    }

    renderProjects(data)
  } catch (err) {
    console.error('Unexpected error:', err)
    projectsSection.innerHTML = '<p>Something went wrong.</p>'
  }
}

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
                            <p class="project-desc">Custom mobile-first web app for tracking personalized workout plans.</p>
                            <p class="project-outcome">OUTCOME: 10,000+ active monthly users.</p>
                            ${project.project_link ? `<a href="${project.project_link}" target="_blank" class="project-link">View Project</a>` : ''}
                        </div>
                    </div>
    
  `).join('')
}

// Call the function to fetch projects
fetchProjects()






