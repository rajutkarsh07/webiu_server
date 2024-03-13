const express = require('express');
const projectController = require('./../controllers/projectController');

const router = express.Router();

router.get('/projects', projectController.allProject);
router.get('/allContributor', projectController.allContributor);
router.get('/:name', projectController.repositoryContributors);
router.get('/:name', projectController.getRepositoryData);

module.exports = router;
