const express = require('express');
const multer = require('multer');
const path = require('path');
const { create } = require('xmlbuilder2'); // Import xmlbuilder2
const knexConfig = require('../knexfile'); // Import Knex configuration
const knex = require('knex')(knexConfig.development); // Initialize Knex with development config

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); // Store files in backend/uploads
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
  // Construct the accessible URL for the uploaded file
  const mediaUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({
    message: 'File uploaded successfully!',
    filename: req.file.filename,
    path: req.file.path,
    url: mediaUrl
  });
});

// API endpoint to add a new RSS feed item
app.post('/api/v1/rss/items', async (req, res) => {
  const { title, description, media_url, media_type } = req.body;

  if (!title || !media_url) {
    return res.status(400).json({ error: 'Title and media_url are required.' });
  }

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
    console.error('Error adding RSS item:', error);
    res.status(500).json({ error: 'Failed to add RSS item.' });
  }
});

// API endpoint to retrieve all RSS feed items
app.get('/api/v1/rss/items', async (req, res) => {
  try {
    const items = await knex('rss_items').select('*').orderBy('pub_date', 'desc');
    res.status(200).json(items);
  } catch (error) {
    console.error('Error retrieving RSS items:', error);
    res.status(500).json({ error: 'Failed to retrieve RSS items.' });
  }
});

// Endpoint to generate the RSS 2.0 feed
app.get('/rss.xml', async (req, res) => {
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
        .ele('link').txt(`http://localhost${item.media_url}`).up() // Assuming media_url is relative
        .ele('description').txt(item.description || '').up()
        .ele('pubDate').txt(item.pub_date.toUTCString()).up();

      if (item.media_url && item.media_type) {
        itemElement.ele('enclosure', {
          url: `http://localhost${item.media_url}`, // Full URL for enclosure
          length: 0, // Placeholder, ideally should be actual file size
          type: item.media_type
        }).up();
      }
      itemElement.up();
    });

    const xml = root.end({ prettyPrint: true });

    res.set('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).send('<error>Failed to generate RSS feed.</error>');
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
