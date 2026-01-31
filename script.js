// Import Supabase client
// https://wusuxccycluxrnudgwzh.supabase.co
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1c3V4Y2N5Y2x1eHJudWRnd3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NDgzNTksImV4cCI6MjA4NTQyNDM1OX0.Eao59gp6TXpNIHjipBF8yCbhzB-OPuWwvog0NBjrZ8M
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase credentials
const supabaseUrl = 'https://wusuxccycluxrnudgwzh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1c3V4Y2N5Y2x1eHJudWRnd3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NDgzNTksImV4cCI6MjA4NTQyNDM1OX0.Eao59gp6TXpNIHjipBF8yCbhzB-OPuWwvog0NBjrZ8M'
const supabase = createClient(supabaseUrl, supabaseKey)

const projectsSection = document.getElementById('projects-section')

// Function to fetch projects
async function fetchProjects() {
  try {
    const { data, error } = await supabase
      .from('sameer - projects') // table name exactly as in Supabase
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
    <div class="project-card">
      ${project.cover_image ? `<img src="${project.cover_image}" alt="${project.project}" class="project-cover">` : ''}
      <h2 class="project-title">${project.project}</h2>
      ${project.project_link ? `<a href="${project.project_link}" target="_blank" class="project-link">View Project</a>` : ''}
    </div>
  `).join('')
}

// Call the function to fetch projects
fetchProjects()


