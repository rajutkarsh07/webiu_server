const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Authentication Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// User Routes
router.get('/:name', userController.getUser);
router.get('/:name/issues', userController.userCreatedIssues);
router.get('/:name/pull-requests', userController.userCreatedPullRequests);
router.post('/not-verified', userController.allNotVerified);

module.exports = router;
