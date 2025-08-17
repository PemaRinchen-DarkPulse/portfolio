const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables (for local development)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

// Initialize Express app
const app = express();

// Basic CORS configuration for Vercel
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://portfoliofrontend-six.vercel.app',
    'https://portfolio-frontend-six.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'x-auth-token', 
    'Origin', 
    'X-Requested-With', 
    'Accept'
  ],
  optionsSuccessStatus: 200
};

// Middleware - Increase payload limits for Base64 images
app.use(express.json({ 
  limit: '10mb', // Increase limit to 10MB for Base64 images
  extended: false 
}));
app.use(express.urlencoded({ 
  limit: '10mb', // Also increase URL-encoded limit
  extended: true 
}));

// Add middleware to log request sizes
app.use((req, res, next) => {
  if (req.headers['content-length']) {
    const sizeInMB = parseInt(req.headers['content-length']) / (1024 * 1024);
    if (sizeInMB > 1) {
      console.log(`Large request: ${req.method} ${req.url} - Size: ${sizeInMB.toFixed(2)}MB`);
    }
  }
  next();
});

app.use(cors(corsOptions));

// Serve static files from the uploads directory (create directory if it doesn't exist)
// In Vercel serverless environment, we can't create directories
if (process.env.NODE_ENV !== 'production') {
  // Only try to create uploads directory in development
  const uploadsPath = path.join(__dirname, 'uploads');
  try {
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath, { recursive: true });
    }
    app.use('/uploads', express.static(uploadsPath));
    console.log('Uploads directory configured for development');
  } catch (err) {
    console.warn('Could not create uploads directory:', err.message);
  }
} else {
  // In production (Vercel), skip local file operations
  console.log('Running in production - skipping local uploads directory setup');
}

// Environment variable validation
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
}

// Connect to MongoDB with better error handling
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is missing in environment variables');
  process.exit(1);
}

// Connect to MongoDB with better error handling for Vercel
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing in environment variables');
    }
    
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 5, // Limit connection pool size for serverless
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    if (process.env.NODE_ENV === 'production') {
      throw err; // Let Vercel handle the error
    } else {
      process.exit(1);
    }
  }
};

// Initialize database connection
connectDB();

// Health check route
app.get('/', (req, res) => {
  res.send('API Running');
});

// CORS test route
app.get('/api/test-cors', (req, res) => {
  res.json({ 
    message: 'CORS is working!', 
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Environment test route (remove in production)
app.get('/api/test-env', (req, res) => {
  res.json({ 
    message: 'Environment check',
    nodeEnv: process.env.NODE_ENV,
    hasMongoUri: !!process.env.MONGO_URI,
    hasJwtSecret: !!process.env.JWT_SECRET,
    mongoUriLength: process.env.MONGO_URI ? process.env.MONGO_URI.length : 0,
    timestamp: new Date().toISOString()
  });
});

// Define Routes with error handling
try {
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/portfolios', require('./routes/portfolio'));
  app.use('/api/projects', require('./routes/project'));
  app.use('/api/contact', require('./routes/contact'));
  app.use('/api/messages', require('./routes/contact')); // Add alias for contact to avoid ad blockers
} catch (err) {
  console.error('Error loading routes:', err.message);
}

// Define PORT
const PORT = process.env.PORT || 5000;

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  // Handle payload too large error
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ 
      msg: 'Payload too large. Image must be smaller than 10MB.',
      error: 'File size exceeds the maximum allowed limit'
    });
  }
  
  // Handle JSON parsing errors
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ 
      msg: 'Invalid JSON format',
      error: 'Request body contains invalid JSON'
    });
  }
  
  res.status(500).json({ 
    msg: 'Server error',
    error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// Start server (only in non-serverless environment)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the app for Vercel
module.exports = app;