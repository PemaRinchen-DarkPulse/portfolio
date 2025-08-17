const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Portfolio = require('../models/Portfolio');

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://pemarinchen.vercel.app',
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

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

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

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing in environment variables');
    }
    
    if (mongoose.connection.readyState === 1) {
      return; // Already connected
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 5,
    });
    
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

// Get all portfolio items
app.get('/', async (req, res) => {
  try {
    await connectDB();
    
    console.log('Fetching portfolio items...');
    
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    console.log(`Found ${portfolios.length} portfolio items`);
    
    // Convert Base64 images to data URLs for frontend consumption
    const portfoliosWithDataUrls = portfolios.map(portfolio => {
      const portfolioObj = portfolio.toObject();
      
      // If image is stored as Base64, convert to data URL
      if (portfolioObj.image && !portfolioObj.image.startsWith('data:') && !portfolioObj.image.startsWith('http')) {
        portfolioObj.image = `data:${portfolioObj.imageType || 'image/jpeg'};base64,${portfolioObj.image}`;
      }
      
      return portfolioObj;
    });
    
    res.json(portfoliosWithDataUrls);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    res.status(500).json({ 
      msg: 'Server error',
      error: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    message: 'Portfolio API is working', 
    timestamp: new Date().toISOString(),
    mongooseState: mongoose.connection.readyState
  });
});

// Export the app for Vercel
module.exports = app;
