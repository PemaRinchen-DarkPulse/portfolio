const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 500
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageType: {
    type: String, // Store MIME type (e.g., 'image/jpeg', 'image/png')
    default: 'image/jpeg',
  },
  imageSize: {
    type: Number, // Store file size in bytes for reference
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  },
  author: {
    type: String,
    default: "Anonymous",
  },
  readTime: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [CommentSchema],
    default: [],
  },
  gallery: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better query performance
PortfolioSchema.index({ createdAt: -1 }); // For sorting by creation date
PortfolioSchema.index({ category: 1 }); // For filtering by category
PortfolioSchema.index({ title: 'text', content: 'text' }); // For text search

module.exports = mongoose.model('Portfolio', PortfolioSchema);