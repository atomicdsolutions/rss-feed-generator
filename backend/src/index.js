const express = require('express');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const v1Routes = require('./routes/v1');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello World from Backend!');
});

// Mount API routes
app.use('/api/v1', v1Routes);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});