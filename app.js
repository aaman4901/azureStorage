// Loading environment variables from .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Setting database connection
const getSqlConnection = require('./services/sequelize.js');
global.DATABASE = getSqlConnection();

// Running task
const task = require('./services/task.js');
task.uploadImages();
