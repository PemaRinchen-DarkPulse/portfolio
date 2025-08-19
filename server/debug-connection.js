const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('Environment variables check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('MONGO_URI length:', process.env.MONGO_URI ? process.env.MONGO_URI.length : 0);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

const testConnection = async () => {
  try {
    console.log('\n=== Testing MongoDB Connection ===');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string prefix:', process.env.MONGO_URI.substring(0, 30) + '...');

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 5,
      bufferCommands: false,
      retryWrites: true,
      family: 4,
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    console.log('Connection state:', conn.connection.readyState);

    // Test a simple query
    console.log('\n=== Testing Database Query ===');
    const Portfolio = require('./models/Portfolio');
    const count = await Portfolio.countDocuments({});
    console.log('✅ Portfolio collection count:', count);

    console.log('\n=== Connection Test Complete ===');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error name:', error.name);
    console.error('Error code:', error.code);
    
    if (error.code === 'ESERVFAIL' || error.code === 'ENOTFOUND') {
      console.error('🔍 This appears to be a DNS resolution issue');
      console.error('Possible causes:');
      console.error('- Network connectivity problems');
      console.error('- Firewall blocking MongoDB Atlas');
      console.error('- Incorrect MongoDB Atlas connection string');
      console.error('- MongoDB Atlas cluster might be paused or deleted');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('🔍 Server selection timeout');
      console.error('Possible causes:');
      console.error('- MongoDB Atlas cluster is not accessible');
      console.error('- Network firewall blocking connection');
      console.error('- Incorrect IP whitelist in MongoDB Atlas');
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('Connection closed');
    }
    process.exit(0);
  }
};

testConnection();
