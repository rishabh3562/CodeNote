const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const fetchRepoStructure = async (owner, repo) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    return response.data.tree;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchRepoStructure,
};
