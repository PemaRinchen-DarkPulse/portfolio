import axiosInstance from '../config/axios.js';
import API_BASE_URL from '../config/api.js';

// Contact API - using 'messages' endpoint to avoid ad blocker
export const sendContactMessage = async (contactData) => {
  try {
    console.log('Sending contact message...');
    console.log('Contact data:', contactData);

    const response = await axiosInstance.post('/api/messages', contactData);

    console.log('Response status:', response.status);
    console.log('Response data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Contact API Error:', error);
    throw error;
  }
};

// Portfolio API
export const portfolioAPI = {
  // Get all portfolio items
  getAll: async () => {
    try {
      console.log('Fetching portfolio items...');
      const response = await axiosInstance.get('/api/portfolios');
      
      console.log('Portfolio API response status:', response.status);
      console.log('Portfolio items fetched successfully:', response.data.length, 'items');
      return response.data;
    } catch (error) {
      console.error('Get portfolio items error:', error);
      throw error;
    }
  },

  // Get portfolio item by ID
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/portfolios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get portfolio item error:', error);
      throw error;
    }
  },

  // Create new portfolio item with Base64 image
  create: async (portfolioData, token) => {
    try {
      console.log('Creating portfolio with token:', token ? 'Token exists' : 'No token');
      console.log('Portfolio data:', portfolioData);
      
      // Use our axios instance to send JSON data with Base64 image
      const response = await axiosInstance.post('/api/portfolios', portfolioData, {
        headers: {
          'x-auth-token': token,
        },
      });
      
      console.log('Portfolio created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Portfolio API Error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.msg || 'Failed to create portfolio item');
      }
      throw error;
    }
  },

  // Update portfolio item
  update: async (id, portfolioData, token) => {
    try {
      const response = await axiosInstance.put(`/api/portfolios/${id}`, portfolioData, {
        headers: {
          'x-auth-token': token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Update portfolio item error:', error);
      if (error.response) {
        throw new Error(error.response.data.msg || 'Failed to update portfolio item');
      }
      throw error;
    }
  },

  // Delete portfolio item
  delete: async (id, token) => {
    try {
      const response = await axiosInstance.delete(`/api/portfolios/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Delete portfolio item error:', error);
      throw error;
    }
  },
};

// Project API
export const projectAPI = {
  // Get all projects
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return await response.json();
    } catch (error) {
      console.error('Get projects error:', error);
      throw error;
    }
  },

  // Get project by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      return await response.json();
    } catch (error) {
      console.error('Get project error:', error);
      throw error;
    }
  },

  // Create new project
  create: async (projectData, token) => {
    try {
      console.log('Creating project with Base64 image');
      const response = await axiosInstance.post('/api/projects', projectData, {
        headers: {
          'x-auth-token': token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Create project error:', error);
      if (error.response) {
        throw new Error(error.response.data.msg || 'Failed to create project');
      }
      throw error;
    }
  },

  // Update project
  update: async (id, projectData, token) => {
    try {
      const response = await axiosInstance.put(`/api/projects/${id}`, projectData, {
        headers: {
          'x-auth-token': token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Update project error:', error);
      if (error.response) {
        throw new Error(error.response.data.msg || 'Failed to update project');
      }
      throw error;
    }
  },

  // Delete project
  delete: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token, // Changed from 'Authorization: Bearer ${token}' to match server expectation
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      return await response.json();
    } catch (error) {
      console.error('Delete project error:', error);
      throw error;
    }
  },
};
