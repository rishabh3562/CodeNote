import axios from 'axios';
const repositoryController = {
  getRepositoryStats: async (req, res) => {
    const { owner, repo } = req.params;

    try {
      const repoData = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`
      );
      const commits = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`
      );
      const issues = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues`
      );

      const repoStats = {
        stars: repoData.data.stargazers_count,
        forks: repoData.data.forks_count,
        openIssues: issues.data.length,
        commitCount: commits.data.length,
      };
      console.log('repoStats', repoStats);
      res.json(repoStats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
export default repositoryController;

// module.exports = { getRepositoryStats };
