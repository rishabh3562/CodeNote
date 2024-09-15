const express = require('express');
const router = express.Router();
const { fetchRepo, updateCommitHashes } = require('../services/repoFetch');

// Fetch repository and track changes
router.post('/fetch', async (req, res) => {
  const { repoUrl } = req.body;
  try {
    const result = await fetchRepo(repoUrl);
    await updateCommitHashes(result.repoId, result.commitHashes);
    res.json({ message: 'Repository fetched successfully', data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
