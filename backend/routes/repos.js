import express from 'express';
import { fetchRepo, updateCommitHashes } from '../services/repoFetch.js';

const router = express.Router();

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

export default router;
