const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

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
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/persons', personsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
