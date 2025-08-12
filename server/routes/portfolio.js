const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

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
      
      // Return mock data for development/testing
      const mockPortfolios = [
        {
          _id: "mock1",
          title: "Sample Portfolio Item",
          category: "Web Development",
          content: "This is a sample portfolio item for testing purposes when database is not available.",
          image: "/api/placeholder/400/300",
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          author: "System",
          readTime: "2 min read",
          likes: 0,
          comments: [],
          gallery: [],
          createdAt: new Date()
        }
      ];
      
      console.log('Returning mock portfolio data');
      return res.json(mockPortfolios);
    }
    
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    console.log(`Found ${portfolios.length} portfolio items`);
    res.json(portfolios);
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
// @desc    Create a portfolio
// @access  Private (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { title, category, content, image, readTime, gallery } = req.body;

    // Create new portfolio item
    const newPortfolio = new Portfolio({
      title,
      category,
      content,
      image,
      readTime,
      gallery: gallery || [],
    });

    // Save portfolio to database
    const portfolio = await newPortfolio.save();
    res.json(portfolio);
  } catch (err) {
    console.error('Create portfolio error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/portfolios/:id
// @desc    Update portfolio
// @access  Private (auth required)
router.put('/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }

    // Update fields
    const { title, category, content, image, readTime, gallery } = req.body;
    if (title) portfolio.title = title;
    if (category) portfolio.category = category;
    if (content) portfolio.content = content;
    if (image) portfolio.image = image;
    if (readTime) portfolio.readTime = readTime;
    if (gallery) portfolio.gallery = gallery;

    // Save updated portfolio
    await portfolio.save();
    res.json(portfolio);
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