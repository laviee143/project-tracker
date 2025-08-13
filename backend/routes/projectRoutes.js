// ROUTE DEFINITIONS: MAP URLS TO CONTROLLERS
const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectcontroller');

router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectById);
router.post('/', controller.createProject);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteProject);

module.exports = router;
// backend/routes/projectRoutes.js