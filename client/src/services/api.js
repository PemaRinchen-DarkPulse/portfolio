import axiosInstance from '../config/axios.js';

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
      console.log('Fetching portfolio items from:', `${API_BASE_URL}/api/portfolios`);
      const response = await fetch(`${API_BASE_URL}/api/portfolios`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Portfolio API response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Portfolio API error response:', errorData);
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch portfolio items`);
      }
      
      const data = await response.json();
      console.log('Portfolio items fetched successfully:', data.length, 'items');
      return data;
    } catch (error) {
      console.error('Get portfolio items error:', error);
      throw error;
    }
  },

  // Get portfolio item by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolios/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio item');
      }
      return await response.json();
    } catch (error) {
      console.error('Get portfolio item error:', error);
      throw error;
    }
  },

  // Create new portfolio item
  create: async (portfolioData, token, imageFile = null) => {
    try {
      console.log('Creating portfolio with token:', token ? 'Token exists' : 'No token');
      
      // Use FormData if there's an image file to upload
      if (imageFile) {
        const formData = new FormData();
        
        // Add the image file
        formData.append('image', imageFile);
        
        // Add all other portfolio data as separate fields
        Object.keys(portfolioData).forEach(key => {
          if (key !== 'image') { // Skip the image URL since we're uploading the actual file
            // Convert arrays or objects to JSON strings
            if (typeof portfolioData[key] === 'object') {
              formData.append(key, JSON.stringify(portfolioData[key]));
            } else {
              formData.append(key, portfolioData[key]);
            }
          }
        });
        
        // Send the request with FormData (multipart/form-data)
        const response = await fetch(`${API_BASE_URL}/api/portfolios`, {
          method: 'POST',
          headers: {
            // Don't set Content-Type header, it will be set automatically with the boundary
            'x-auth-token': token,
          },
          body: formData,
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to create portfolio item. Status:', response.status, 'Response:', errorText);
          throw new Error('Failed to create portfolio item');
        }
        
        return await response.json();
      } else {
        // If no file to upload, use JSON as before
        const response = await fetch(`${API_BASE_URL}/api/portfolios`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify(portfolioData),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to create portfolio item. Status:', response.status, 'Response:', errorText);
          throw new Error('Failed to create portfolio item');
        }
        
        return await response.json();
      }
    } catch (error) {
      console.error('Create portfolio item error:', error);
      throw error;
    }
  },

  // Update portfolio item
  update: async (id, portfolioData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Changed from 'Authorization: Bearer ${token}' to match server expectation
        },
        body: JSON.stringify(portfolioData),
      });
      if (!response.ok) {
        throw new Error('Failed to update portfolio item');
      }
      return await response.json();
    } catch (error) {
      console.error('Update portfolio item error:', error);
      throw error;
    }
  },

  // Delete portfolio item
  delete: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolios/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token, // Changed from 'Authorization: Bearer ${token}' to match server expectation
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete portfolio item');
      }
      return await response.json();
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
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Changed from 'Authorization: Bearer ${token}' to match server expectation
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      return await response.json();
    } catch (error) {
      console.error('Create project error:', error);
      throw error;
    }
  },

  // Update project
  update: async (id, projectData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Changed from 'Authorization: Bearer ${token}' to match server expectation
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
      return await response.json();
    } catch (error) {
      console.error('Update project error:', error);
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
