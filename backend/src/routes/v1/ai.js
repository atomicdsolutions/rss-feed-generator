const express = require('express');
const router = express.Router();
const aiController = require('../../controllers/ai.controller');

// Health check for AI service
router.get('/health', aiController.checkHealth);

// List available models
router.get('/models', aiController.getModels);

// Generate caption
router.post('/caption', aiController.generateCaption);

module.exports = router;