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
    
    // Convert Base64 images to data URLs for frontend consumption
    const projectsWithDataUrls = projects.map(project => {
      const projectObj = project.toObject();
      
      // If image is stored as Base64, convert to data URL
      if (projectObj.image && !projectObj.image.startsWith('data:') && !projectObj.image.startsWith('http')) {
        projectObj.image = `data:${projectObj.imageType || 'image/jpeg'};base64,${projectObj.image}`;
      }
      
      return projectObj;
    });
    
    res.json(projectsWithDataUrls);
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
    
    // Convert Base64 image to data URL for frontend consumption
    const projectObj = project.toObject();
    if (projectObj.image && !projectObj.image.startsWith('data:') && !projectObj.image.startsWith('http')) {
      projectObj.image = `data:${projectObj.imageType || 'image/jpeg'};base64,${projectObj.image}`;
    }
    
    res.json(projectObj);
  } catch (err) {
    console.error('Get project error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST /api/projects
// @desc    Create a project with Base64 image storage
// @access  Private (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, image, imageType, demoLink, githubLink, tech, category } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ msg: 'Title and description are required' });
    }
    
    // Handle image processing
    let imageData = '';
    let mimeType = imageType || 'image/jpeg';
    let imageSize = 0;
    
    if (image) {
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
        imageData = image;
        imageSize = Math.round((image.length * 3) / 4);
      }
      
      // Check image size (limit to 5MB when encoded)
      if (imageSize > 5 * 1024 * 1024) {
        return res.status(400).json({ msg: 'Image size too large. Maximum 5MB allowed.' });
      }
    }

    // Create new project
    const newProject = new Project({
      title,
      description,
      image: imageData,
      imageType: mimeType,
      imageSize: imageSize,
      demoLink,
      githubLink,
      tech: tech || [],
      category,
    });

    // Save project to database
    const project = await newProject.save();
    
    // Return with data URL format
    const projectObj = project.toObject();
    if (projectObj.image && !projectObj.image.startsWith('data:')) {
      projectObj.image = `data:${projectObj.imageType};base64,${projectObj.image}`;
    }
    
    res.json(projectObj);
  } catch (err) {
    console.error('Create project error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project with Base64 image support
// @access  Private (auth required)
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Update fields
    const { title, description, image, imageType, demoLink, githubLink, tech, category } = req.body;
    if (title) project.title = title;
    if (description) project.description = description;
    if (demoLink) project.demoLink = demoLink;
    if (githubLink) project.githubLink = githubLink;
    if (tech) project.tech = tech;
    if (category) project.category = category;
    
    // Handle image update
    if (image) {
      let imageData = image;
      let mimeType = imageType || project.imageType || 'image/jpeg';
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
      
      project.image = imageData;
      project.imageType = mimeType;
      project.imageSize = imageSize;
    }

    // Save updated project
    await project.save();
    
    // Return with data URL format
    const projectObj = project.toObject();
    if (projectObj.image && !projectObj.image.startsWith('data:')) {
      projectObj.image = `data:${projectObj.imageType};base64,${projectObj.image}`;
    }
    
    res.json(projectObj);
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