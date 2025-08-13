// CONTROLLER LAYER: HANDLE REQUEST / RESPONSE, VALIDATE INPUT, CALL SERVICE
const service = require('../services/projectService');

exports.getAllProjects = (req, res) => {
  const projects = service.getAll();
  res.json(projects);
};

exports.getProjectById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const project = service.getById(id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

exports.createProject = (req, res) => {
  const { name, description, status } = req.body;
  if (!name || !description) return res.status(400).json({ message: 'Name and description are required' });
  if (status && !['ongoing', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Status must be "ongoing" or "completed"' });
  }
  const newProject = service.create({ name, description, status: status ?? 'ongoing' });
  res.status(201).json(newProject);
};

exports.updateProject = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description, status } = req.body;
  if (status && !['ongoing', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const updated = service.update(id, { name, description, status });
  if (!updated) return res.status(404).json({ message: 'Project not found' });
  res.json(updated);
};

exports.deleteProject = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = service.deleteProject(id);
  if (!deleted) return res.status(404).json({ message: 'Project not found' });
  res.status(204).end();
};
