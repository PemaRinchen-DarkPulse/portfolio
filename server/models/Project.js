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