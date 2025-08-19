const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
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
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  demoLink: {
    type: String,
  },
  githubLink: {
    type: String,
  },
  tech: {
    type: Array,
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better query performance
ProjectSchema.index({ createdAt: -1 }); // For sorting by creation date
ProjectSchema.index({ category: 1 }); // For filtering by category
ProjectSchema.index({ title: 'text', description: 'text' }); // For text search

module.exports = mongoose.model('Project', ProjectSchema);