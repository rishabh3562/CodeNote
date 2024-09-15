const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const repoRoutes = require('./routes/repos');
const docsRoutes = require('./routes/docs');
const connectDB = require('./config/db');

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
