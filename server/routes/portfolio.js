const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const upload = require('../utils/fileUpload');
const path = require('path');
const addImageBaseUrl = require('../utils/imageUrlHelper');

// Health check for portfolio route
router.get('/health', (req, res) => {
  res.json({ 
    message: 'Portfolio routes are working', 
    timestamp: new Date().toISOString(),
    mongooseState: mongoose.connection.readyState // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  });
});

// @route   GET /api/portfolios
// @desc    Get all portfolio items
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch portfolio items...');
    
    // Check if mongoose is connected
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected, readyState:', mongoose.connection.readyState);
      return res.status(500).json({ 
        msg: 'Database connection error',
        error: 'Unable to connect to the database'
      });
    }
    
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
  } catch (err) {
    console.error('Get portfolios error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      message: 'Server error while fetching portfolio items',
      error: err.message 
    });
  }
});

// @route   GET /api/portfolios/:id
// @desc    Get portfolio by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    
    // Convert Base64 image to data URL for frontend consumption
    const portfolioObj = portfolio.toObject();
    if (portfolioObj.image && !portfolioObj.image.startsWith('data:') && !portfolioObj.image.startsWith('http')) {
      portfolioObj.image = `data:${portfolioObj.imageType || 'image/jpeg'};base64,${portfolioObj.image}`;
    }
    
    res.json(portfolioObj);
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
    const { title, category, content, readTime, gallery, image, imageType } = req.body;
    
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
    
    // Create new portfolio item
    const newPortfolio = new Portfolio({
      title,
      category,
      content,
      image: imageData, // Store Base64 string
      imageType: mimeType,
      imageSize: imageSize,
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
    const { title, category, content, image, imageType, readTime, gallery } = req.body;
    if (title) portfolio.title = title;
    if (category) portfolio.category = category;
    if (content) portfolio.content = content;
    if (readTime) portfolio.readTime = readTime;
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
  } catch (err) {
    console.error('Delete portfolio error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;