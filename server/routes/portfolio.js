const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const upload = require('../utils/fileUpload');
const path = require('path');
const addImageBaseUrl = require('../utils/imageUrlHelper');
const { cacheMiddleware, invalidateCache } = require('../middleware/cache');

// Health check for portfolio route
router.get('/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected', 
      2: 'connecting',
      3: 'disconnecting'
    };
    
    // Test database connection with a simple query
    let testResult = null;
    if (dbState === 1) {
      try {
        testResult = await Portfolio.countDocuments({});
      } catch (testErr) {
        testResult = `Error: ${testErr.message}`;
      }
    }
    
    res.json({ 
      message: 'Portfolio routes are working', 
      timestamp: new Date().toISOString(),
      database: {
        state: dbState,
        status: states[dbState] || 'unknown',
        host: mongoose.connection.host || 'not connected',
        testQuery: testResult
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGO_URI,
        mongoUriPrefix: process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 20) + '...' : 'not set'
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// @route   GET /api/portfolios
// @desc    Get all portfolio items with pagination and optimization
// @access  Public
// Temporarily disable caching to test new content display
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch portfolio items...');
    
    // Temporarily disable cache headers for debugging
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    // Enhanced database connection check for serverless with better error handling
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, attempting to connect...');
      console.log('Current connection state:', mongoose.connection.readyState);
      console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
      
      try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
          throw new Error('MONGO_URI environment variable is not set');
        }
        
        await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 10000,
          socketTimeoutMS: 45000,
          connectTimeoutMS: 10000,
          maxPoolSize: 5,
          bufferCommands: false,
          retryWrites: true,
          family: 4,
        });
        console.log('MongoDB connected successfully');
      } catch (connectErr) {
        console.error('Failed to connect to MongoDB:', connectErr.message);
        console.error('MongoDB connection error details:', {
          name: connectErr.name,
          code: connectErr.code,
          message: connectErr.message
        });
        
        // Provide specific error messages based on error type
        if (connectErr.code === 'ESERVFAIL' || connectErr.code === 'ENOTFOUND') {
          return res.status(503).json({ 
            msg: 'Database service unavailable - DNS resolution failed',
            error: 'Unable to reach the database server. Please check your network connection.',
            suggestion: 'This might be a temporary network issue. Please try again in a few moments.'
          });
        } else if (connectErr.name === 'MongoServerSelectionError') {
          return res.status(503).json({ 
            msg: 'Database connection timeout',
            error: 'Could not connect to database within the timeout period.',
            suggestion: 'The database server might be temporarily unavailable. Please try again later.'
          });
        } else {
          return res.status(500).json({ 
            msg: 'Database connection error',
            error: 'Unable to connect to the database',
            suggestion: 'Please try again later or contact support if the issue persists.'
          });
        }
      }
    }

    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query for filtering
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Check if client wants preview mode (without large images)
    const preview = req.query.preview === 'true';
    
    if (preview) {
      // For preview mode: get limited data but include content preview
      const portfolios = await Portfolio.find(query)
        .select('-image -gallery -comments') // Exclude heavy fields but keep content for preview
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(); // Use lean() for better performance

      // Create content previews on server side for better performance
      const portfoliosWithPreviews = portfolios.map(portfolio => ({
        ...portfolio,
        content: portfolio.content ? portfolio.content.substring(0, 200) + '...' : '',
        isPreview: true
      }));

      const total = await Portfolio.countDocuments(query);
      
      res.json({
        portfolios: portfoliosWithPreviews,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      });
    } else {
      // Full mode: include all data but with optimization
      const portfolios = await Portfolio.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(); // Use lean() for better performance

      const total = await Portfolio.countDocuments(query);
      
      console.log(`Found ${portfolios.length} portfolio items`);
      
      // Convert Base64 images to data URLs for frontend consumption
      const portfoliosWithDataUrls = portfolios.map(portfolio => {
        // If image is stored as Base64, convert to data URL
        if (portfolio.image && !portfolio.image.startsWith('data:') && !portfolio.image.startsWith('http')) {
          portfolio.image = `data:${portfolio.imageType || 'image/jpeg'};base64,${portfolio.image}`;
        }
        
        return portfolio;
      });
      
      res.json({
        portfolios: portfoliosWithDataUrls,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      });
    }
  } catch (err) {
    console.error('Get portfolios error:', err);
    console.error('Error stack:', err.stack);
    console.error('Error name:', err.name);
    console.error('Error code:', err.code);
    
    // Send a more detailed error response for debugging
    res.status(500).json({ 
      message: 'Server error while fetching portfolio items',
      error: err.message || 'Unknown error occurred',
      errorName: err.name,
      errorCode: err.code,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// @route   GET /api/portfolios/:id
// @desc    Get portfolio by ID with optimization
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Use lean() for better performance and select only needed fields initially
    const portfolio = await Portfolio.findById(req.params.id).lean();
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    
    // Convert Base64 image to data URL for frontend consumption
    if (portfolio.image && !portfolio.image.startsWith('data:') && !portfolio.image.startsWith('http')) {
      portfolio.image = `data:${portfolio.imageType || 'image/jpeg'};base64,${portfolio.image}`;
    }
    
    res.json(portfolio);
  } catch (err) {
    console.error('Get portfolio error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST /api/portfolios
// @desc    Create a portfolio with Base64 image storage
// @access  Private (auth required)
router.post('/', auth, async (req, res) => {
  try {
    // Get form data from request body
    const { title, category, content, gallery, image, imageType } = req.body;
    
    // Validate required fields
    if (!title || !category || !content) {
      return res.status(400).json({ msg: 'Title, category, and content are required' });
    }
    
    // Validate image data
    if (!image) {
      return res.status(400).json({ msg: 'Image is required' });
    }
    
    // Check if image is Base64 format
    let imageData = image;
    let mimeType = imageType || 'image/jpeg';
    let imageSize = 0;
    
    // If image is already a data URL, extract the Base64 part
    if (image.startsWith('data:')) {
      const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        imageData = matches[2];
        imageSize = Math.round((imageData.length * 3) / 4); // Approximate size in bytes
      } else {
        return res.status(400).json({ msg: 'Invalid image format' });
      }
    } else {
      // Assume it's pure Base64 data
      imageSize = Math.round((image.length * 3) / 4);
    }
    
    // Check image size (limit to 5MB when encoded)
    if (imageSize > 5 * 1024 * 1024) {
      return res.status(400).json({ msg: 'Image size too large. Maximum 5MB allowed.' });
    }
    
    // Calculate read time based on content length (1 minute per 1000 characters)
    const readTime = `${Math.max(1, Math.ceil(content.length / 1000))} min read`;
    
    // Create new portfolio item
    const newPortfolio = new Portfolio({
      title,
      category,
      content,
      image: imageData, // Store Base64 string
      imageType: mimeType,
      imageSize: imageSize,
      author: req.user.email, // Use authenticated user's email
      readTime,
      gallery: gallery || [],
    });

    // Save portfolio to database
    const portfolio = await newPortfolio.save();
    
    console.log(`Portfolio created with ID: ${portfolio._id}, image size: ${imageSize} bytes`);
    
    res.json({
      ...portfolio.toObject(),
      // Return the image as data URL for frontend consumption
      image: `data:${portfolio.imageType};base64,${portfolio.image}`
    });

    // Invalidate cache after creating new portfolio
    invalidateCache(/^portfolios-/);
  } catch (err) {
    console.error('Create portfolio error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   PUT /api/portfolios/:id
// @desc    Update portfolio with Base64 image support
// @access  Private (auth required)
router.put('/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }

    // Update fields
    const { title, category, content, image, imageType, gallery } = req.body;
    if (title) portfolio.title = title;
    if (category) portfolio.category = category;
    if (content) {
      portfolio.content = content;
      // Auto-calculate read time when content is updated
      portfolio.readTime = `${Math.max(1, Math.ceil(content.length / 1000))} min read`;
    }
    if (gallery) portfolio.gallery = gallery;
    
    // Handle image update
    if (image) {
      let imageData = image;
      let mimeType = imageType || portfolio.imageType || 'image/jpeg';
      let imageSize = 0;
      
      // If image is a data URL, extract the Base64 part
      if (image.startsWith('data:')) {
        const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          imageData = matches[2];
          imageSize = Math.round((imageData.length * 3) / 4);
        } else {
          return res.status(400).json({ msg: 'Invalid image format' });
        }
      } else {
        // Assume it's pure Base64 data
        imageSize = Math.round((image.length * 3) / 4);
      }
      
      // Check image size (limit to 5MB when encoded)
      if (imageSize > 5 * 1024 * 1024) {
        return res.status(400).json({ msg: 'Image size too large. Maximum 5MB allowed.' });
      }
      
      portfolio.image = imageData;
      portfolio.imageType = mimeType;
      portfolio.imageSize = imageSize;
    }

    // Save updated portfolio
    await portfolio.save();
    
    // Return with data URL format
    const portfolioObj = portfolio.toObject();
    if (portfolioObj.image && !portfolioObj.image.startsWith('data:')) {
      portfolioObj.image = `data:${portfolioObj.imageType};base64,${portfolioObj.image}`;
    }
    
    res.json(portfolioObj);

    // Invalidate cache after updating portfolio
    invalidateCache(/^portfolios-/);
  } catch (err) {
    console.error('Update portfolio error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/portfolios/:id
// @desc    Delete portfolio
// @access  Private (auth required)
router.delete('/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }

    // Delete portfolio
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Portfolio removed' });

    // Invalidate cache after deleting portfolio
    invalidateCache(/^portfolios-/);
  } catch (err) {
    console.error('Delete portfolio error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST /api/portfolios/:id/comments
// @desc    Add a comment to a portfolio item
// @access  Public
router.post('/:id/comments', async (req, res) => {
  try {
    const { name, comment } = req.body;
    
    // Validate required fields
    if (!name || !comment) {
      return res.status(400).json({ msg: 'Name and comment are required' });
    }
    
    // Validate input lengths
    if (name.trim().length < 2) {
      return res.status(400).json({ msg: 'Name must be at least 2 characters long' });
    }
    
    if (comment.trim().length < 5) {
      return res.status(400).json({ msg: 'Comment must be at least 5 characters long' });
    }
    
    // Find the portfolio item
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    
    // Create new comment object
    const newComment = {
      name: name.trim(),
      comment: comment.trim(),
      date: new Date() // Use Date object as expected by schema
    };
    
    // Add comment to the portfolio
    portfolio.comments = portfolio.comments || [];
    portfolio.comments.unshift(newComment); // Add to beginning for newest first
    
    // Save the portfolio
    await portfolio.save();
    
    console.log(`Comment added to portfolio ${req.params.id} by ${name}`);
    
    // Return the updated portfolio with the new comment
    res.json({
      success: true,
      message: 'Comment added successfully',
      comment: newComment,
      totalComments: portfolio.comments.length
    });
    
  } catch (err) {
    console.error('Add comment error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).json({ msg: 'Server error while adding comment' });
  }
});

module.exports = router;