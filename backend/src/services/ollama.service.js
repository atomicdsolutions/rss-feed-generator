const axios = require('axios');
const logger = require('../utils/logger');

class OllamaService {
    constructor() {
        this.baseURL = process.env.OLLAMA_URL || 'http://192.168.0.148:11434';
    }

    async generateCaption(prompt, model = 'llama2') {
        try {
            const response = await axios.post(`${this.baseURL}/api/generate`, {
                model,
                prompt,
                stream: false
            });

            return {
                success: true,
                caption: response.data.response
            };
        } catch (error) {
            logger.error('Error generating caption with Ollama:', error);
            throw new Error('Failed to generate caption');
        }
    }

    async listModels() {
        try {
            const response = await axios.get(`${this.baseURL}/api/tags`);
            return response.data;
        } catch (error) {
            logger.error('Error listing Ollama models:', error);
            throw new Error('Failed to list models');
        }
    }

    async checkHealth() {
        try {
            await axios.get(`${this.baseURL}/api/version`);
            return true;
        } catch (error) {
            logger.error('Error checking Ollama health:', error);
            return false;
        }
    }
}

module.exports = OllamaService;