import express from 'express';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();
import { generateReadme, generateReadme2, gemini } from '../controllers/llmController.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.post('/gemini', cors(), gemini);
app.post('/generate-readme', generateReadme);
app.post('/generate-readme2', generateReadme2);


export default app;


