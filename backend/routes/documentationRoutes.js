import express from 'express';
const router = express.Router();
import documentationController from '../controllers/documentationController.js';

router.post('/fetch-repo', documentationController.fetchRepository);
router.post('/generate', documentationController.generateDocumentation);
router.post('/fetch-file', documentationController.fetchFileContent);

export default router;
