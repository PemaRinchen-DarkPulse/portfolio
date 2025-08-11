import API_BASE_URL from '../config/api.js';

// Contact API - using 'messages' endpoint to avoid ad blocker
export const sendContactMessage = async (contactData) => {
  try {
    console.log('Sending contact message to:', `${API_BASE_URL}/api/messages`);
    console.log('Contact data:', contactData);

    const response = await fetch(`${API_BASE_URL}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send message');
    }

    return data;
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
      const response = await fetch(`${API_BASE_URL}/api/portfolios`);
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio items');
      }
      return await response.json();
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
  create: async (portfolioData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(portfolioData),
      });
      if (!response.ok) {
        throw new Error('Failed to create portfolio item');
      }
      return await response.json();
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
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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
