const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new user (admin only route in production)
// @access  Public (can be restricted later)
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      email,
      password,
      name: name || 'Admin',
    });

    // Save user to database
    await user.save();

    // Create JWT payload
    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token with optimization
// @access  Public
router.post('/login', async (req, res) => {
  console.log('Login attempt for:', req.body.email);
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  try {
    // Check if user exists using lean() for better performance
    const user = await User.findOne({ email }).lean();
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    console.log('User found, comparing password');
    
    try {
      // Check password using bcrypt directly (since we used lean())
      const bcrypt = require('bcryptjs');
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Password mismatch for:', email);
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      
      console.log('Password match, creating token');
      
      // Create JWT payload
      const payload = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      // Verify JWT_SECRET exists
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is missing in environment variables');
        return res.status(500).json({ msg: 'Server configuration error' });
      }

      // Sign token with shorter expiry for better security
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
        (err, token) => {
          if (err) {
            console.error('JWT Sign error:', err);
            return res.status(500).json({ msg: 'Authentication error' });
          }
          console.log('Login successful for:', email);
          res.json({ token });
        }
      );
    } catch (passwordErr) {
      console.error('Password comparison error:', passwordErr);
      return res.status(500).json({ msg: 'Authentication error', error: passwordErr.message });
    }
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // Return user without password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Get user error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;