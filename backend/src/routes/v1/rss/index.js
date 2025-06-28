const express = require('express');
const { body } = require('express-validator');
const { addRssItem, getAllRssItems, generateRssFeed } = require('../../controllers/rss.controller');

const router = express.Router();

// API endpoint to add a new RSS feed item with validation
router.post(
  '/items',
  [
    body('media_id').isInt().withMessage('Media ID must be an integer.'),
    body('title').notEmpty().withMessage('Title is required.'),
    body('caption').optional().isString().withMessage('Caption must be a string.'),
  ],
  addRssItem
);

// API endpoint to retrieve all RSS feed items
router.get('/items', getAllRssItems);

// Endpoint to generate the RSS 2.0 feed
router.get('/feed.xml', generateRssFeed);

module.exports = router;