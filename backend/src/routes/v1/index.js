const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

// Import routes
const aiRoutes = require('./ai');
const mediaRoutes = require('./media'); // New: Import media routes
const rssRoutes = require('./rss');     // New: Import rss routes

// Mount routes
router.use('/ai', aiRoutes);
router.use('/media', mediaRoutes); // New: Mount media routes
router.use('/rss', rssRoutes);     // New: Mount rss routes

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
