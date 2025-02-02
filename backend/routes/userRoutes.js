import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/:username/activity', userController.getUserActivity);

export default router;
