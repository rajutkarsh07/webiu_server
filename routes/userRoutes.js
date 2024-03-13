const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/:name').get(userController.getUser);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post(
  '/notVerified',
  // authController.protect,
  userController.allNotVerified
);

module.exports = router;
