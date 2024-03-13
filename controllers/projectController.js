const axios = require("axios");
const catchAsync = require('../utils/catchAsync');

const accessToken = process.env.GITHUB_ACCESS_TOKEN;

exports.allProject = catchAsync(async (req, res, next) => {
  try {
    const reposResponse = await axios.get(
      `https://api.github.com/orgs/c2siorg/repos`,
      {
        headers: {
          Authorization: `token ${accessToken}`
        }
      }
    );
    const repositories = reposResponse.data;

    res.status(200).json({ repositories });
  } catch (err) {
    console.err(
      "Repositories not found",
      err.response ? err.response.data : err.message
    );
    res.status(500).json({ err: "Internal server err" });
  }
});
  
exports.allContributor = catchAsync(async (req, res, next) => {
  try {
    const reposResponse = await axios.get(
      `https://api.github.com/orgs/c2siorg/repos`,
      {
        headers: {
          Authorization: `token ${accessToken}`
        }
      }
    );
    const repositories = reposResponse.data;
    let allContributors = [];

    for (const repo of repositories) {
      const contributorsResponse = await axios.get(
        `https://api.github.com/repos/c2siorg/${repo.name}/contributors`,
        {
          headers: {
            Authorization: `token ${accessToken}`
          }
        }
      );
      const contributors = contributorsResponse.data;
      allContributors = allContributors.concat(contributors);
    }

    res.status(200).json({ contributors: allContributors });
  } catch (err) {
    console.err(
      "Err fetching contributors:",
      err.response ? err.response.data : err.message
    );
    res.status(500).json({ err: "Internal server err" });
  }
});

exports.repositoryContributors = catchAsync(async (req, res, next) => {
  try {
    const { repositoryName } = req.params;

    const contributorsResponse = await axios.get(
      `https://api.github.com/repos/c2siorg/${repositoryName}/contributors`,
      {
        headers: {
          Authorization: `token ${accessToken}`
        }
      }
    );
    const contributors = contributorsResponse.data;

    res.status(200).json({ contributors });
  } catch (err) {
    console.err(
      "Error fetching contributors:",
      err.response ? err.response.data : err.message
    );
    res.status(500).json({ err: "Internal server error" });
  }
});

exports.userCreatedIssues = catchAsync(async (req, res, next) => {
    try {
      const { username } = req.params;
  
      const issuesResponse = await axios.get(
        `https://api.github.com/search/issues?q=author:${username}+org:c2si+type:issue`,
        {
          headers: {
            Authorization: `token ${accessToken}`
          }
        }
      );
      const issues = issuesResponse.data.items;
  
      res.status(200).json({ issues });
    } catch (error) {
      console.error(
        "Error fetching user created issues:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  exports.userCreatedPullRequests = catchAsync(async (req, res, next) => {
    try {
      const { username } = req.params;
  
      const pullRequestsResponse = await axios.get(
        `https://api.github.com/search/issues?q=author:${username}+org:c2si+type:pr`,
        {
          headers: {
            Authorization: `token ${accessToken}`
          }
        }
      );
      const pullRequests = pullRequestsResponse.data.items;
  
      res.status(200).json({ pullRequests });
    } catch (error) {
      console.error(
        "Error fetching user created pull requests:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({ error: "Internal server error" });
    }
  });
  