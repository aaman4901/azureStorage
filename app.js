// Loading environment variables from .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Setting database connection
const getSqlConnection = require('./services/sequelize.js');
global.DATABASE = getSqlConnection();

const config = require('./config/config.js');
const express = require('express');
const app = express();
const cors = require('cors');

// Allowing cross origin access
app.use(cors());

app.use(express.json());

app.listen(config.SERVER_PORT, () => {
  console.log(`Server is listening at ${config.SERVER_PORT}`);
});

// Running task
const task = require('./services/task.js');
task.uploadImages();
