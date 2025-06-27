const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { StatusCodes } = require('http-status-codes');

const config = require('./config/app.config');
const logger = require('./utils/logger');
const { errorHandler, notFound } = require('./middleware/error');
const v1Routes = require('./routes/v1');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors(config.cors));

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan(config.logging.format, {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Health check
app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/v1', v1Routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const port = config.port;
app.listen(port, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${port}`);
});