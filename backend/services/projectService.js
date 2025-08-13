// SERVICE LAYER: DATA LOGIC (CRUD) OPERATING ON THE IN-MEMORY ARRAY
const projects = require('../data/projects');

function getAll() {
  return projects;
}

function getById(id) {
  return projects.find(p => p.id === id);
}

function create({ name, description, status }) {
  const newId = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
  const newProject = { id: newId, name, description, status };
  projects.push(newProject);
  return newProject;
}

function update(id, { name, description, status }) {
  const project = getById(id);
  if (!project) return null;
  if (name !== undefined) project.name = name;
  if (description !== undefined) project.description = description;
  if (status !== undefined) project.status = status;
  return project;
}

function deleteProject(id) {
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return false;
  projects.splice(idx, 1);
  return true;
}

module.exports = { getAll, getById, create, update, deleteProject };
