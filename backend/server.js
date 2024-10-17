import express from 'express'; // Changed to import syntax
import mongoose from 'mongoose';
import projectRoutes from './routes/projectRoutes.js'; // Added .js extension
import noteRoutes from './routes/noteRoutes.js'; // Added .js extension
import githubRoutes from './routes/githubRoutes.js'; // Added .js extension
import llmRoutes from './routes/llmRoutes.js'; // Added .js extension
import connectDB from './config/db.js'; // Added .js extension
import cors from 'cors'; // Importing CORS
import {GoogleGenerativeAI} from "@google/generative-ai"
import dotenv from 'dotenv';
dotenv.config();
// import proxy from 'http-proxy-middleware';
const app = express();
app.use(express.json());
app.options('*', cors());
connectDB();

app.use('/api/projects', projectRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/code', llmRoutes);
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const origin1 = process.env.ORIGIN1?.replace(/\/+$/, ''); // Remove trailing slash
const origin2 = process.env.ORIGIN2?.replace(/\/+$/, '');
const origin3 = process.env.ORIGIN3?.replace(/\/+$/, '');

const allowedOrigins = [origin1, origin2, origin3].filter(Boolean); // Filter out any undefined values
console.log("Allowed origins: ", allowedOrigins);

// CORS configuration
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));
app.use(cors());
app.get("/test", (req, res) => {
    res.json("Hello World!");
})



// module.exports = function (app) {
//     app.use(proxy('/api', {
//         target: 'http://localhost:5173',
//         logLevel: 'debug',
//         changeOrigin: true
//     }))
// }

app.post("/getResponse",async (req, res) => {
  console.log(req.body);
  const prompt= req.body.prompt;
  const getAI= new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model= getAI.getGenerativeModel({model: 'gemini-1.5-flash'});
  const Changedprompt = `
    Given the following React component code, generate a README with the following sections:
    - States
    - Functions (function overview, arguments)
    - State changes
    - Component overview

    React component code:
    ${req.body.prompt}
    `;
 try {
    const response= await model.generateContent(Changedprompt);
    console.log(response.response.text());
    res.json({"msg":"success","data":response.response.text()});
 } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
 }
  
})
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}/`);
});
