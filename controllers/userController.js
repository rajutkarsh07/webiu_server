const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');
const Repos = require('../models/reposModel');
const User = require('../models/userModel');

exports.allNotVerified = catchAsync(async (req, res, next) => {
  const repos = await Repos.find({ verified: true });
  res.status(201).json({ repos });
});

exports.getUser = catchAsync(async (req, res, next) => {
  // console.log(req);
  const user = await User.findOne({ name: req.params.name });
  res.status(201).json({ user });
});
