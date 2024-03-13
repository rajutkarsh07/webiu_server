const catchAsync = require('../utils/catchAsync');
const Repos = require('../models/reposModel');
const User = require('../models/userModel');

exports.allNotVerified = catchAsync(async (req, res, next) => {
  const repos = await Repos.find({ verified: true });
  res.status(201).json({ repos });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ name: req.params.name });
  res.status(201).json({ user });
});

exports.userCreatedIssues = catchAsync(async (req, res, next) => {
  try {
    const { username } = req.params;

    const issuesResponse = await axios.get(
      `https://api.github.com/search/issues?q=author:${username}+org:c2si+type:issue`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );
    const issues = issuesResponse.data.items;

    res.status(200).json({ issues });
  } catch (error) {
    console.error(
      'Error fetching user created issues:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.userCreatedPullRequests = catchAsync(async (req, res, next) => {
  try {
    const { username } = req.params;

    const pullRequestsResponse = await axios.get(
      `https://api.github.com/search/issues?q=author:${username}+org:c2si+type:pr`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );
    const pullRequests = pullRequestsResponse.data.items;

    res.status(200).json({ pullRequests });
  } catch (error) {
    console.error(
      'Error fetching user created pull requests:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Internal server error' });
  }
});
