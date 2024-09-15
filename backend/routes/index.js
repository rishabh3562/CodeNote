const express = require('express');
const router = express.Router();
const repoController = require('../controllers/repoController');
const docsController = require('../controllers/docsController');
const promptContextController = require('../controllers/promptContextController');

router.post('/repos/fetch', repoController.fetchRepo);
router.post('/docs/generate', docsController.generateDocs);
router.post('/prompt/generate', promptContextController.generateContext);

module.exports = router;
