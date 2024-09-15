const express = require('express');
const router = express.Router();
const Doc = require('../models/Docs');

// Fetch all documentation for a repository
router.get('/:repoId', async (req, res) => {
  try {
    const docs = await Doc.find({ repoId: req.params.repoId });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch specific documentation file
router.get('/:repoId/:filePath', async (req, res) => {
  try {
    const doc = await Doc.findOne({ repoId: req.params.repoId, filePath: req.params.filePath });
    if (doc) {
      res.json(doc);
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;