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
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'https://portfoliofrontend-six.vercel.app',
      'http://localhost:3000',
      'https://portfolio-frontend-six.vercel.app' // Alternative URL format
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Origin', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200,
  preflightContinue: false
};

// Middleware
app.use(express.json({ extended: false })); // Parse JSON request body

// Enable CORS with preflight handling
app.use(cors(corsOptions));

// Additional CORS headers for preflight requests
app.options('*', cors(corsOptions)); // Enable preflight for all routes

// Manual CORS middleware as backup
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173',
    'https://portfoliofrontend-six.vercel.app',
    'http://localhost:3000',
    'https://portfolio-frontend-six.vercel.app'
  ];
  
  // Log all requests for debugging
  console.log(`Request from origin: ${origin}, Method: ${req.method}, URL: ${req.url}`);
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    console.log(`CORS: Allowed origin ${origin}`);
  } else {
    console.log(`CORS: Origin ${origin} not in allowed list`);
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token, Origin, X-Requested-With, Accept');
  
  if (req.method === 'OPTIONS') {
    console.log('Handling preflight OPTIONS request');
    res.sendStatus(200);
  } else {
    next();
  }
});

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

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolios', require('./routes/portfolio'));
app.use('/api/projects', require('./routes/project'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/messages', require('./routes/contact')); // Add alias for contact to avoid ad blockers

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