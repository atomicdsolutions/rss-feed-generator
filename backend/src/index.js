const express = require('express');
const multer = require('multer');
const path = require('path');
const { create } = require('xmlbuilder2');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);
const { body, validationResult } = require('express-validator'); // Import express-validator
const errorHandler = require('./middleware/errorHandler'); // Import error handler

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello World from Backend!');
});

// API endpoint for media upload
app.post('/api/v1/media/upload', upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const mediaUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({
    message: 'File uploaded successfully!',
    filename: req.file.filename,
    path: req.file.path,
    url: mediaUrl
  });
});

// API endpoint to add a new RSS feed item with validation
app.post(
  '/api/v1/rss/items',
  [
    body('title').notEmpty().withMessage('Title is required.'),
    body('media_url').notEmpty().withMessage('Media URL is required.').isURL().withMessage('Media URL must be a valid URL.'),
    body('media_type').notEmpty().withMessage('Media type is required.'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, media_url, media_type } = req.body;

    try {
      const [id] = await knex('rss_items').insert({
        title,
        description,
        media_url,
        media_type,
        pub_date: new Date()
      });
      res.status(201).json({ message: 'RSS item added successfully!', id });
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  }
);

// API endpoint to retrieve all RSS feed items
app.get('/api/v1/rss/items', async (req, res, next) => {
  try {
    const items = await knex('rss_items').select('*').orderBy('pub_date', 'desc');
    res.status(200).json(items);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
});

// Endpoint to generate the RSS 2.0 feed
app.get('/rss.xml', async (req, res, next) => {
  try {
    const items = await knex('rss_items').select('*').orderBy('pub_date', 'desc');

    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('rss', { version: '2.0' })
        .ele('channel')
          .ele('title').txt('My Awesome RSS Feed').up()
          .ele('link').txt('http://localhost/rss.xml').up()
          .ele('description').txt('A feed of videos and photos.').up();

    items.forEach(item => {
      const itemElement = root.ele('item')
        .ele('title').txt(item.title).up()
        .ele('link').txt(`http://localhost${item.media_url}`).up()
        .ele('description').txt(item.description || '').up()
        .ele('pubDate').txt(item.pub_date.toUTCString()).up();

      if (item.media_url && item.media_type) {
        itemElement.ele('enclosure', {
          url: `http://localhost${item.media_url}`,
          length: 0,
          type: item.media_type
        }).up();
      }
      itemElement.up();
    });

    const xml = root.end({ prettyPrint: true });

    res.set('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
