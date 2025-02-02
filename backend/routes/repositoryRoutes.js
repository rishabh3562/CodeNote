import express from 'express';
const router = express.Router();
import repositoryController from '../controllers/repositoryController.js';
// router.route('/fetch-repo').post(documentationController.fetchRepository);
// router.route('/generate').post(documentationController.generateDocumentation);
// router.route('/fetch-repo').post(documentationController.fetchFileContent);

// router.route('/fetch-repo').post(documentationController.fetchRepository);
// router.route('/generate').post(documentationController.generateDocumentation);
router.route('/:owner/:repo').post(repositoryController.getRepositoryStats);

export default router;

// router.get('/repositories/:owner/:repo', getRepositoryStats);

// module.exports = router;
