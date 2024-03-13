const axios = require('axios');
const catchAsync = require('../utils/catchAsync');

const accessToken = process.env.GITHUB_ACCESS_TOKEN;

exports.getAllProjects = catchAsync(async (req, res, next) => {
  try {
    const repositoriesResponse = await axios.get(
      `https://api.github.com/orgs/c2siorg/repos`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );
    const repositories = repositoriesResponse.data;

    res.status(200).json({ repositories });
  } catch (error) {
    console.error(
      'Error fetching repositories:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.getAllContributors = catchAsync(async (req, res, next) => {
  try {
    const repositoriesResponse = await axios.get(
      `https://api.github.com/orgs/c2siorg/repos`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );
    const repositories = repositoriesResponse.data;
    let allContributors = [];

    for (const repository of repositories) {
      const contributorsResponse = await axios.get(
        `https://api.github.com/repos/c2siorg/${repository.name}/contributors`,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );
      const contributors = contributorsResponse.data;
      allContributors = allContributors.concat(contributors);
    }

    res.status(200).json({ contributors: allContributors });
  } catch (error) {
    console.error(
      'Error fetching contributors:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.getRepositoryData = catchAsync(async (req, res, next) => {
  try {
    const repositoryName = req.params.name;

    // Fetch repository data
    const repositoryResponse = await axios.get(
      `https://api.github.com/repos/c2siorg/${repositoryName}`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );
    const repository = repositoryResponse.data;

    // Fetch README content
    const readmeResponse = await axios.get(
      `https://api.github.com/repos/c2siorg/${repositoryName}/readme`,
      {
        headers: {
          Accept: 'application/vnd.github.v3.raw',
          Authorization: `token ${accessToken}`,
        },
      }
    );
    const readmeContent = readmeResponse.data;

    // Combine repository data and README content
    const repositoryWithReadme = {
      ...repository,
      readme: readmeContent,
    };

    res.status(200).json({ repository: repositoryWithReadme });
  } catch (error) {
    console.error(
      'Error fetching repository data:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.getRepositoryContributors = catchAsync(async (req, res, next) => {
  try {
    const { repositoryName } = req.params;

    const contributorsResponse = await axios.get(
      `https://api.github.com/repos/c2siorg/${repositoryName}/contributors`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );
    const contributors = contributorsResponse.data;

    res.status(200).json({ contributors });
  } catch (error) {
    console.error(
      'Error fetching contributors:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Internal server error' });
  }
});
