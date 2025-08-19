const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { cacheMiddleware, invalidateCache } = require('../middleware/cache');

// @route   GET /api/projects
// @desc    Get all projects with pagination and optimization
// @access  Public
// Temporarily disable caching to test new content display
router.get('/', async (req, res) => {
  try {
    // Temporarily disable cache headers for debugging
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
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
      // For preview mode: get limited data but include description preview
      const projects = await Project.find(query)
        .select('-image') // Exclude heavy image field
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(); // Use lean() for better performance

      // Create description previews on server side for better performance
      const projectsWithPreviews = projects.map(project => ({
        ...project,
        description: project.description ? project.description.substring(0, 150) + '...' : '',
        isPreview: true
      }));

      const total = await Project.countDocuments(query);
      
      res.json({
        projects: projectsWithPreviews,
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
      const projects = await Project.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(); // Use lean() for better performance

      const total = await Project.countDocuments(query);
      
      // Convert Base64 images to data URLs for frontend consumption
      const projectsWithDataUrls = projects.map(project => {
        // If image is stored as Base64, convert to data URL
        if (project.image && !project.image.startsWith('data:') && !project.image.startsWith('http')) {
          project.image = `data:${project.imageType || 'image/jpeg'};base64,${project.image}`;
        }
        
        return project;
      });
      
      res.json({
        projects: projectsWithDataUrls,
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
    console.error('Get projects error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID with optimization
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Use lean() for better performance
    const project = await Project.findById(req.params.id).lean();
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    // Convert Base64 image to data URL for frontend consumption
    if (project.image && !project.image.startsWith('data:') && !project.image.startsWith('http')) {
      project.image = `data:${project.imageType || 'image/jpeg'};base64,${project.image}`;
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

    // Invalidate cache after creating new project
    invalidateCache(/^projects-/);
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

    // Invalidate cache after updating project
    invalidateCache(/^projects-/);
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

    // Invalidate cache after deleting project
    invalidateCache(/^projects-/);
  } catch (err) {
    console.error('Delete project error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;