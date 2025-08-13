// LOAD ENVIRONMENT VARIABLES AND START SERVER
require('dotenv').config(); // LOADS .env
const express = require('express');
const cors = require('cors');

const projectRoutes = require('./routes/projectRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const APP_NAME = process.env.APP_NAME || 'Bootcamp Project Tracker API';

// MIDDLEWARE
app.use(cors()); // ENABLE CORS FOR FRONTEND
app.use(express.json()); // PARSE JSON BODIES

// HEALTH CHECK
app.get('/', (req, res) => {
  res.send(`${APP_NAME} is running`);
});

// ROUTES (MVC: ROUTES -> CONTROLLERS -> SERVICES -> DATA)
app.use('/api/projects', projectRoutes);

// BASIC ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`${APP_NAME} listening on port ${PORT}`);
});
