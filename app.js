const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const jobsRouter = require('./controllers/jobs');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

logger.info('connecting to ', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/jobs', jobsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

setInterval(() => {
  fetch('https://au-js-jobs.herokuapp.com/jobs');
}, 1000 * 60 * 27);

module.exports = app;
