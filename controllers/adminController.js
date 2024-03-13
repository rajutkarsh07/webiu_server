const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');
const Repos = require('./../models/reposModel');

exports.allRepo = catchAsync(async (req, res, next) => {
  const repos = await Repos.find();
  res.status(201).json({
    status: 'success',
    repos,
  });
});

exports.verify = catchAsync(async (req, res, next) => {
  const repoName = req.body.repoName;
  console.log(repoName);

  const isPresentPrev = await Repos.findOne({ repoName: repoName });
  
  if (!isPresentPrev) {
    const addData = await Repos.create({
      repoName: repoName,
      verified: 'false',
    });
    if (addData) {
      return res.status(201).json({
        status: 'success',
      });
    }
    return res.status(401).json({
      status: 'fail',
    });
  }

  const isPresent = await Repos.findOne({ repoName: repoName, verified: true });
  console.log(isPresent);

  if (isPresent) {
    const updateData = await Repos.findOneAndUpdate(
      { repoName: repoName },
      { $set: { verified: false } },
      { new: true }
    );
    if (updateData) {
      return res.status(201).json({
        status: 'success',
      });
    }
    return res.status(401).json({
      status: 'fail',
    });
  }
  const updateData = await Repos.findOneAndUpdate(
    { repoName: repoName },
    { $set: { verified: true } },
    { new: true }
  );
  if (updateData) {
    return res.status(201).json({
      status: 'success',
    });
  }
  return res.status(401).json({
    status: 'fail',
  });
});
