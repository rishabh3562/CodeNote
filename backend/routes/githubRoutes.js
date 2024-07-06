const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

router.get('/repo-structure', async (req, res) => {
  const { owner, repo } = req.query;
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    res.send(response.data.tree);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

module.exports = router;
