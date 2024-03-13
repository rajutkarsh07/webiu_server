const express = require('express');
const authController = require('./../controllers/authController');
const adminController = require('./../controllers/adminController');

const router = express.Router();

router
  .route('/all-repos')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.allRepo
  );

router
  .route('/verify')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.verify
  );

module.exports = router;
