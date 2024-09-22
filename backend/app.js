import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import repoRoutes from './routes/repos.js';
import docsRoutes from './routes/docs.js';
import connectDB from './config/db.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/repos', repoRoutes);
app.use('/api/docs', docsRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
