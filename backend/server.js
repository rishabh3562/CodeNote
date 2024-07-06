const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projectRoutes');
const noteRoutes = require('./routes/noteRoutes');
const githubRoutes = require('./routes/githubRoutes');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
app.use(express.json());

connectDB();

app.use('/api/projects', projectRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/github', githubRoutes);

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
//     origin: (origin, callback) => {
//         console.log("Request origin: ", origin);
//         if (allowedOrigins.indexOf(origin?.replace(/\/+$/, '')) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api', {
        target: 'http://localhost:5173',
        logLevel: 'debug',
        changeOrigin: true
    }))}

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});
