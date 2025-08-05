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
