import express from 'express';
import repoController from '../controllers/repoController.js';
import docsController from '../controllers/docsController.js';
import promptContextController from '../controllers/promptContextController.js';

const router = express.Router();

router.post('/repos/fetch', repoController.fetchRepo);
router.post('/docs/generate', docsController.generateDocs);
router.post('/prompt/generate', promptContextController.generateContext);

export default router;
