// FRONTEND APP.JS - HANDLES UI, FETCHING FROM BACKEND, SUBMITTING FORM
const API_URL = 'http://localhost:3000/api/projects'; // CHANGE IF BACKEND PORT DIFFERS

document.addEventListener('DOMContentLoaded', () => {
  fetchProjects();
  document.getElementById('project-form').addEventListener('submit', handleSubmit);
});

// FETCH PROJECTS FROM BACKEND AND RENDER THEM
async function fetchProjects() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const projects = await res.json();
    renderProjects(projects);
  } catch (err) {
    console.error(err);
    alert('Could not load projects. Is the backend running?');
  }
}

// RENDER PROJECT CARDS WITH EDIT + DELETE BUTTONS
function renderProjects(projects) {
  const list = document.getElementById('project-list');
  list.innerHTML = '';
  if (!projects.length) {
    list.innerHTML = '<p>No projects yet.</p>';
    return;
  }

  projects.forEach(p => {
    const div = document.createElement('div');
    div.className = 'project-card';
    div.innerHTML = `
      <h3>${escapeHtml(p.name)}</h3>
      <p>${escapeHtml(p.description)}</p>
      <p class="status">Status: <strong>${p.status}</strong></p>
      <div class="actions">
        <button data-id="${p.id}" class="edit-btn">Edit</button>
        <button data-id="${p.id}" class="delete-btn">Delete</button>
      </div>
    `;
    list.appendChild(div);
  });

  // DELETE HANDLERS
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      if (!confirm('Delete this project?')) return;
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.status === 204) {
          fetchProjects();
        } else {
          const body = await res.json();
          alert(body.message || 'Delete failed');
        }
      } catch (err) {
        console.error(err);
        alert('Delete failed');
      }
    });
  });

  // EDIT HANDLERS
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      startEditProject(id);
    });
  });
}

// LOAD PROJECT DATA INTO FORM FOR EDITING
async function startEditProject(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch project');
    const project = await res.json();

    // PREFILL FORM
    document.getElementById('name').value = project.name;
    document.getElementById('description').value = project.description;
    document.getElementById('status').value = project.status;

    // STORE EDIT ID
    document.getElementById('project-form').dataset.editingId = id;

    // CHANGE BUTTON TEXT
    document.querySelector('#project-form button[type="submit"]').textContent = 'Update Project';
  } catch (err) {
    console.error(err);
    alert('Could not load project for editing');
  }
}

// HANDLE FORM SUBMIT (CREATE OR UPDATE)
async function handleSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const status = document.getElementById('status').value;
  const form = document.getElementById('project-form');
  const editingId = form.dataset.editingId;

  if (!name || !description) {
    alert('Please provide name and description');
    return;
  }

  try {
    let res;
    if (editingId) {
      // UPDATE PROJECT
      res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, status })
      });
    } else {
      // CREATE PROJECT
      res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, status })
      });
    }

    if (res.ok) {
      // RESET FORM
      form.reset();
      form.removeAttribute('data-editing-id');
      document.querySelector('#project-form button[type="submit"]').textContent = 'Add Project';
      fetchProjects();
    } else {
      const body = await res.json();
      alert(body.message || 'Failed to save project');
    }
  } catch (err) {
    console.error(err);
    alert('Failed to save project');
  }
}

// ESCAPE HTML FOR SAFETY
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}
