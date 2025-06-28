const path = require('path');
const multer = require('multer');
const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig.development);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads')); // Store files in backend/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const uploadMedia = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const mediaUrl = `/uploads/${req.file.filename}`;
  const mediaType = req.file.mimetype;

  try {
    const [media_id] = await knex('rss_items').insert({
      media_url: mediaUrl,
      media_type: mediaType,
      title: null,
      description: null,
      pub_date: new Date()
    });
    res.status(200).json({
      message: 'File uploaded successfully!',
      filename: req.file.filename,
      path: req.file.path,
      url: mediaUrl,
      media_id: media_id
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload, // Export multer instance for use in routes
  uploadMedia
};
