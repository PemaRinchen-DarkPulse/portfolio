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
  date: {
    type: String,
    default: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
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

module.exports = mongoose.model('Project', ProjectSchema);