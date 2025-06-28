const { StatusCodes } = require('http-status-codes');
const OllamaService = require('../services/ollama.service');
const { ApiError } = require('../middleware/error');
const logger = require('../utils/logger');

const ollamaService = new OllamaService();

const generateCaption = async (req, res, next) => {
    try {
        const { mediaId, prompt, model } = req.body;

        if (!mediaId || !prompt) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'MediaId and prompt are required');
        }

        // Here you would typically get the media details from your database
        // and include them in the prompt to the AI model
        const enhancedPrompt = `Generate a caption for media ID ${mediaId}. Context: ${prompt}`;

        const result = await ollamaService.generateCaption(enhancedPrompt, model);

        res.status(StatusCodes.OK).json({
            success: true,
            data: {
                mediaId,
                caption: result.caption
            }
        });
    } catch (error) {
        next(error);
    }
};

const getModels = async (req, res, next) => {
    try {
        const models = await ollamaService.listModels();
        res.status(StatusCodes.OK).json({
            success: true,
            data: models
        });
    } catch (error) {
        next(error);
    }
};

const checkHealth = async (req, res, next) => {
    try {
        const isHealthy = await ollamaService.checkHealth();
        if (!isHealthy) {
            throw new ApiError(StatusCodes.SERVICE_UNAVAILABLE, 'Ollama service is not available');
        }
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Ollama service is healthy'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    generateCaption,
    getModels,
    checkHealth
};