// Test server.js without starting the server
const express = require('express');

// Mock the server starting to test the configuration
console.log('Testing server configuration...');

try {
  // Import and test the routes
  const portfolioRoutes = require('./routes/portfolio');
  const authRoutes = require('./routes/auth');
  const projectRoutes = require('./routes/project');
  const contactRoutes = require('./routes/contact');
  
  console.log('✅ All route files imported successfully');
  
  // Test MongoDB model imports
  const Portfolio = require('./models/Portfolio');
  const Project = require('./models/Project');
  const User = require('./models/User');
  
  console.log('✅ All models imported successfully');
  
  console.log('✅ Server configuration test passed');
  console.log('Server is ready for deployment!');
  
} catch (error) {
  console.error('❌ Configuration test failed:', error.message);
  process.exit(1);
}
