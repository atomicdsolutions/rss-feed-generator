const express = require('express');
const { upload, uploadMedia } = require('../../controllers/media.controller');

const router = express.Router();

router.post('/upload', upload.single('media'), uploadMedia);

module.exports = router;
