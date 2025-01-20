import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { generateReadme, generateReadme2, gemini } from '../controllers/llmController.js';

// Load environment variables
dotenv.config();

// Initialize Express app and Router
const app = express();
const router = express.Router();

// Middleware
app.use(express.json());
app.use(cors());  // Apply CORS globally

// Define routes using router
router.post('/gemini', gemini);
router.post('/generate-readme', generateReadme);
router.post('/generate-readme2', generateReadme2);

// Use the router
app.use('/api', router);

export default app;
