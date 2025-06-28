const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

// Import routes
const aiRoutes = require('./ai');

// Mount routes
router.use('/ai', aiRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;