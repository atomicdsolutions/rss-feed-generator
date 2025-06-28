const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
