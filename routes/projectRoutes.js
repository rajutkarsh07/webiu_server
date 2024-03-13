const express = require('express');
const projectController = require('./../controllers/projectController');

const router = express.Router();

router.get('/projects', projectController.getAllProjects);
router.get('/:name', projectController.getRepositoryData);
router.get('/allContributor', projectController.getAllContributors);
router.get('/:name', projectController.getRepositoryContributors);

module.exports = router;
