const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Get projects error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error('Get project error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST /api/projects
// @desc    Create a project
// @access  Private (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, image, demoLink, githubLink, tech, category } = req.body;

    // Create new project
    const newProject = new Project({
      title,
      description,
      image,
      demoLink,
      githubLink,
      tech: tech || [],
      category,
    });

    // Save project to database
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error('Create project error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (auth required)
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Update fields
    const { title, description, image, demoLink, githubLink, tech, category } = req.body;
    if (title) project.title = title;
    if (description) project.description = description;
    if (image) project.image = image;
    if (demoLink) project.demoLink = demoLink;
    if (githubLink) project.githubLink = githubLink;
    if (tech) project.tech = tech;
    if (category) project.category = category;

    // Save updated project
    await project.save();
    res.json(project);
  } catch (err) {
    console.error('Update project error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (auth required)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Delete project
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error('Delete project error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;