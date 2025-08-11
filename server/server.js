const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the correct path
dotenv.config({ path: path.join(__dirname, '.env') });

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://portfoliofrontend-six.vercel.app',
    'https://portfoliofrontend-i08e3zbqg-pema-rinchens-projects-fb20da05.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Middleware
app.use(express.json({ extended: false })); // Parse JSON request body
app.use(cors(corsOptions)); // Enable CORS with configuration

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGO_URI ? 'URI found' : 'URI not found');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error:', error);
    
    // For DNS issues, provide helpful suggestions
    if (error.message.includes('ESERVFAIL') || error.message.includes('ENOTFOUND')) {
      console.log('\n🔧 DNS Resolution Issue Detected:');
      console.log('1. Check your internet connection');
      console.log('2. Try using Google DNS (8.8.8.8, 8.8.4.4)');
      console.log('3. Temporarily disable VPN if using one');
      console.log('4. Check if your network blocks MongoDB Atlas connections');
    }
    
    process.exit(1);
  }
};

// Call the connection function
connectDB();

// Define Routes
console.log('Loading routes...');
try {
  // Load contact routes FIRST
  console.log('Loading contact routes...');
  const contactRoutes = require('./routes/contact');
  app.use('/api/messages', contactRoutes);
  console.log('Contact routes loaded at /api/messages');

  app.use('/api/auth', require('./routes/auth'));
  console.log('Auth routes loaded');
  app.use('/api/portfolios', require('./routes/portfolio'));
  console.log('Portfolio routes loaded');
  app.use('/api/projects', require('./routes/project'));
  console.log('Project routes loaded');
} catch (error) {
  console.error('Error loading routes:', error);
}
console.log('All routes loaded successfully');

// Health check route
app.get('/', (req, res) => {
  res.send('API Running');
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));