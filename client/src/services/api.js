import axiosInstance from '../config/axios.js';
import API_BASE_URL from '../config/api.js';

// Generic retry helper with exponential backoff
const retry = async (fn, {
  retries = 3,
  baseDelay = 500,
  factor = 2,
  shouldRetry = (err) => {
    const status = err?.response?.status;
    // Retry on network errors or 5xx/503 (cold start) or timeouts
    return (!status || status >= 500 || status === 429) || err.code === 'ECONNABORTED';
  }
} = {}) => {
  let attempt = 0;
  let lastErr;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === retries || !shouldRetry(err)) throw err;
      const delay = baseDelay * Math.pow(factor, attempt);
      await new Promise(r => setTimeout(r, delay));
      attempt++;
    }
  }
  throw lastErr;
};

// Lightweight warmup ping for backend cold starts
export const warmupBackend = async () => {
  try {
    // Fire-and-forget health checks to wake functions
    axiosInstance.get('/api');
    axiosInstance.get('/api/portfolios/health');
    axiosInstance.get('/api/messages/health');
  } catch (_) {
    // ignore
  }
};

// Contact API - using 'messages' endpoint to avoid ad blocker
export const sendContactMessage = async (contactData) => {
  try {
    const response = await retry(() => axiosInstance.post('/api/messages', contactData), {
      retries: 3,
      baseDelay: 700,
      factor: 1.8,
    });

    return response.data;
  } catch (error) {
    // Normalize error message from server if available
    if (error.response && error.response.data) {
      const serverMsg = error.response.data.message || error.response.data.error || 'Failed to send message.';
      throw new Error(serverMsg);
    }
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error('Failed to send message. Please try again.');
  }
};

// Portfolio API
export const portfolioAPI = {
  // Get all portfolio items with pagination and preview mode
  getAll: async (options = {}) => {
    try {
      console.log('Fetching portfolio items...');
      
      // Build query parameters
      const params = new URLSearchParams();
      if (options.page) params.append('page', options.page);
      if (options.limit) params.append('limit', options.limit);
      if (options.category) params.append('category', options.category);
      if (options.preview) params.append('preview', 'true');
      
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await retry(() => axiosInstance.get(`/api/portfolios${queryString}`), {
        retries: 3,
        baseDelay: 500,
        factor: 2,
      });
      
      console.log('Portfolio API response status:', response.status);
      
      // Handle both paginated and non-paginated responses
      if (response.data.portfolios) {
        console.log('Portfolio items fetched successfully:', response.data.portfolios.length, 'items');
        return response.data; // Return full response with pagination info
      } else {
        console.log('Portfolio items fetched successfully:', response.data.length, 'items');
        return { portfolios: response.data, pagination: null }; // Legacy format
      }
    } catch (error) {
      console.error('Get portfolio items error:', error);
      throw error;
    }
  },

  // Get portfolio items for preview (without images)
  getPreview: async (options = {}) => {
    return portfolioAPI.getAll({ ...options, preview: true });
  },

  // Get portfolio item by ID
  getById: async (id) => {
    try {
      const response = await retry(() => axiosInstance.get(`/api/portfolios/${id}`), {
        retries: 2,
        baseDelay: 500,
      });
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

  // Add comment to portfolio item
  addComment: async (portfolioId, commentData) => {
    try {
      console.log('Adding comment to portfolio:', portfolioId, commentData);
      const response = await axiosInstance.post(`/api/portfolios/${portfolioId}/comments`, commentData);
      console.log('Comment added successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Add comment error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.msg || 'Failed to add comment');
      }
      throw error;
    }
  },
};

// Project API
export const projectAPI = {
  // Get all projects with pagination and preview mode
  getAll: async (options = {}) => {
    try {
      console.log('Fetching projects...');
      
      // Build query parameters
      const params = new URLSearchParams();
      if (options.page) params.append('page', options.page);
      if (options.limit) params.append('limit', options.limit);
      if (options.category) params.append('category', options.category);
      if (options.preview) params.append('preview', 'true');
      
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await axiosInstance.get(`/api/projects${queryString}`);
      
      console.log('Project API response status:', response.status);
      
      // Handle both paginated and non-paginated responses
      if (response.data.projects) {
        console.log('Projects fetched successfully:', response.data.projects.length, 'items');
        return response.data; // Return full response with pagination info
      } else {
        console.log('Projects fetched successfully:', response.data.length, 'items');
        return { projects: response.data, pagination: null }; // Legacy format
      }
    } catch (error) {
      console.error('Get projects error:', error);
      throw error;
    }
  },

  // Get projects for preview (without images)
  getPreview: async (options = {}) => {
    return projectAPI.getAll({ ...options, preview: true });
  },

  // Get project by ID
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/projects/${id}`);
      return response.data;
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
  deleteProject: async (id, token) => {
    try {
      const response = await axiosInstance.delete(`/api/projects/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Delete project error:', error);
      throw error;
    }
  },
};
