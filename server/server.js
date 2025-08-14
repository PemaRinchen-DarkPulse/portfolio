const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Verify critical environment variables
console.log('Environment loaded, checking variables...');
if (!process.env.JWT_SECRET) {
  console.error('WARNING: JWT_SECRET is not set in environment');
}
if (!process.env.MONGO_URI) {
  console.error('WARNING: MONGO_URI is not set in environment');
}

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://portfoliofrontend-six.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Middleware
app.use(express.json({ extended: false })); // Parse JSON request body
app.use(cors(corsOptions)); // Enable CORS with configuration

// Serve static files from the uploads directory
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// Connect to MongoDB
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is missing in environment variables');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolios', require('./routes/portfolio'));
app.use('/api/projects', require('./routes/project'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/messages', require('./routes/contact')); // Add alias for contact to avoid ad blockers

// Health check route
app.get('/', (req, res) => {
  res.send('API Running');
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    msg: 'Server error',
    error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));