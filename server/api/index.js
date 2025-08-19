const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables (for local development)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

// Initialize Express app
const app = express();

// Basic CORS configuration for Vercel
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://pemarinchen.vercel.app', // Add your deployed frontend URL
    'https://portfoliofrontend-six.vercel.app',
    'https://portfolio-frontend-six.vercel.app',
    'https://portfolio-pemarinchentrend.vercel.app',
    'https://portfolio-git-main-pemarinchen-darkpulse.vercel.app',
    'https://portfolio-pemarinchen-darkpulses-projects.vercel.app'
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

// Additional CORS headers as fallback
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://pemarinchen.vercel.app',
    'https://portfoliofrontend-six.vercel.app',
    'https://portfolio-frontend-six.vercel.app',
    'https://portfolio-pemarinchentrend.vercel.app',
    'https://portfolio-git-main-pemarinchen-darkpulse.vercel.app',
    'https://portfolio-pemarinchen-darkpulses-projects.vercel.app'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token, Origin, X-Requested-With, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Environment variable validation
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  console.error('Available env vars:', Object.keys(process.env).filter(key => 
    key.includes('MONGO') || key.includes('JWT') || key.includes('NODE')
  ));
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
  }
}

// Connect to MongoDB with better error handling for Vercel
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing in environment variables');
    }
    
    console.log('Connecting to MongoDB...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('MONGO_URI length:', process.env.MONGO_URI.length);
    
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
      return;
    }
    
    // Close any existing connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout for DNS resolution issues
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 5,
      bufferCommands: false,
      retryWrites: true,
      family: 4, // Use IPv4 to avoid potential IPv6 DNS issues
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Set up connection event handlers
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    return conn.connection;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Error details:', {
      name: err.name,
      code: err.code,
      stack: err.stack
    });
    
    // Provide specific error messages based on error type
    if (err.code === 'ESERVFAIL' || err.code === 'ENOTFOUND') {
      console.error('DNS Resolution Error - Network connectivity issues');
    } else if (err.name === 'MongoServerSelectionError') {
      console.error('Database connection timeout - Server unavailable');
    }
    
    throw err;
  }
};

// Initialize database connection with retry logic
const initializeDB = async () => {
  let retries = 3;
  
  while (retries > 0) {
    try {
      if (mongoose.connection.readyState === 0) {
        await connectDB();
        console.log('Database initialization successful');
        return;
      } else {
        console.log('Database already initialized');
        return;
      }
    } catch (err) {
      retries--;
      console.error(`Database connection failed. Retries left: ${retries}`, err.message);
      
      if (retries === 0) {
        console.error('All database connection attempts failed');
        // Don't throw error to prevent serverless function from crashing
        // but log it for debugging
      } else {
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
};

// Initialize database connection
initializeDB();

// Health check route
app.get('/', (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected', 
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({ 
      message: 'API Running',
      timestamp: new Date().toISOString(),
      database: {
        state: dbState,
        status: states[dbState] || 'unknown',
        host: mongoose.connection.host || 'not connected'
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGO_URI,
        mongoUriLength: process.env.MONGO_URI ? process.env.MONGO_URI.length : 0
      },
      routes: ['/api/portfolios', '/api/projects', '/api/contact', '/api/auth']
    });
  } catch (error) {
    res.status(500).json({
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// API health check
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API endpoints are available',
    timestamp: new Date().toISOString(),
    availableRoutes: [
      'GET /api/portfolios',
      'GET /api/projects', 
      'POST /api/contact',
      'POST /api/auth/login'
    ]
  });
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
    mongooseState: mongoose.connection.readyState,
    timestamp: new Date().toISOString()
  });
});

// Debug route for portfolio connection
app.get('/api/debug-portfolios', async (req, res) => {
  try {
    const Portfolio = require('../models/Portfolio');
    
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database not connected',
        connectionState: mongoose.connection.readyState,
        hasMongoUri: !!process.env.MONGO_URI
      });
    }
    
    // Test portfolio query
    const count = await Portfolio.countDocuments({});
    
    res.json({
      message: 'Portfolio debug successful',
      portfolioCount: count,
      connectionState: mongoose.connection.readyState,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      message: 'Portfolio debug failed',
      error: error.message,
      errorName: error.name,
      connectionState: mongoose.connection.readyState,
      timestamp: new Date().toISOString()
    });
  }
});

// Define Routes with error handling
try {
  const authRoutes = require('../routes/auth');
  const portfolioRoutes = require('../routes/portfolio');
  const projectRoutes = require('../routes/project');
  const contactRoutes = require('../routes/contact');
  const chatRoutes = require('../routes/chat');
  
  // Add database connection middleware for critical routes
  app.use('/api/portfolios', async (req, res, next) => {
    try {
      // Ensure database connection before proceeding
      if (mongoose.connection.readyState !== 1) {
        console.log('Database not connected, attempting to reconnect...');
        await connectDB();
      }
      next();
    } catch (err) {
      console.error('Database connection failed in middleware:', err.message);
      res.status(503).json({
        message: 'Database service unavailable',
        error: 'Unable to connect to the database. Please try again later.',
        suggestion: 'This might be a temporary network issue.'
      });
    }
  });
  
  // Add logging middleware for API routes
  app.use('/api', (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
    next();
  });
  
  app.use('/api/auth', authRoutes);
  app.use('/api/portfolios', portfolioRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/messages', contactRoutes); // Add alias for contact to avoid ad blockers
  app.use('/api/chat', chatRoutes);
  
  console.log('All routes loaded successfully');
} catch (err) {
  console.error('Error loading routes:', err.message);
  console.error('Stack trace:', err.stack);
}

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

// Export the app for Vercel
module.exports = app;
