const express = require('express');
const projectController = require('./../controllers/projectController');

const router = express.Router();

router.get('/projects', projectController.getAllProjects);
router.get('/projects/:name', projectController.getRepositoryData);
router.get('/contributors', projectController.getAllContributors);
router.get('/contributors/:name', projectController.getRepositoryContributors);

module.exports = router;
