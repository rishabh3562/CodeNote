import express from 'express'; // Changed to import syntax
// import projectRoutes from './routes/projectRoutes.js'; // Added .js extension
// import noteRoutes from './routes/noteRoutes.js'; // Added .js extension
// import githubRoutes from './routes/githubRoutes.js'; // Added .js extension
import llmRoutes from './routes/llmRoutes.js'; // Added .js extension
import connectDB from './config/db.js'; // Added .js extension
import cors from 'cors'; // Importing CORS
import dotenv from 'dotenv';
import documentationRoutes from './routes/documentationRoutes.js'; // Added .js extension
import repositoryRoutes from './routes/repositoryRoutes.js'; // Added .js extension
import userRoutes from './routes/userRoutes.js'; // Added .js extension
dotenv.config();

const app = express();
app.use(express.json());
app.options('*', cors());
connectDB();

const port = process.env.PORT || 3000;

const origin1 = process.env.ORIGIN1?.replace(/\/+$/, ''); // Remove trailing slash
const origin2 = process.env.ORIGIN2?.replace(/\/+$/, '');
const origin3 = process.env.ORIGIN3?.replace(/\/+$/, '');

const allowedOrigins = [origin1, origin2, origin3].filter(Boolean); // Filter out any undefined values

//routes
app.use(cors());
app.get('/', (req, res) => {
  res.json('Hello World!');
});
app.get('/test', (req, res) => {
  res.json('Hello World!');
});

app.use('/api/documentation', documentationRoutes);
app.use('/api/repositories', repositoryRoutes);
app.use('/api/code', llmRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});
