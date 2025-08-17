// Service for handling chat API requests via backend
import API_BASE_URL from '../../../config/api';

/**
 * Send a message to the AI chatbot via backend and get a response
 * @param {string} message - The user's message
 * @param {array} history - Previous conversation history
 * @returns {Promise<string>} - The AI's response
 */
export const sendMessage = async (message, history = []) => {
  // Validate input
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw new Error('Message cannot be empty');
  }

  if (message.trim().length > 1000) {
    throw new Error('Message is too long. Please keep it under 1000 characters.');
  }

  try {
    console.log('Sending message to chat API...');
    
    // Make API request to backend
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message.trim(),
        history: Array.isArray(history) ? history : []
      })
    });

    // Check if response is ok
    if (!response.ok) {
      console.error('Backend API Error:', response.status, response.statusText);
      
      if (response.status === 404) {
        throw new Error('Chat service not found. Please contact support.');
      } else if (response.status === 500) {
        throw new Error('Server error occurred. Please try again later.');
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    }

    const data = await response.json();
    
    // Check if backend returned success
    if (!data.success) {
      console.error('Backend returned error:', data.error);
      throw new Error(data.error || 'Unknown backend error');
    }

    // Validate the response
    if (!data.response || typeof data.response !== 'string') {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from server');
    }

    console.log('Chat API response received successfully');
    
    // Return the AI's response
    return data.response;
    
  } catch (error) {
    console.error('Error in sendMessage:', error);
    
    // Return user-friendly error messages based on error type
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      return "I'm having trouble connecting to the server. Please check your internet connection and try again.";
    } else if (error.message.includes('Chat service not found')) {
      return "The chat service is temporarily unavailable. Please try again later.";
    } else if (error.message.includes('Server error')) {
      return "There's a server issue right now. Please try again in a few moments.";
    } else if (error.message.includes('Too many requests')) {
      return "You're sending messages too quickly. Please wait a moment and try again.";
    } else if (error.message.includes('too long')) {
      return "Your message is too long. Please shorten it and try again.";
    } else if (error.message.includes('empty')) {
      return "Please type a message before sending.";
    } else {
      return "I'm sorry, I couldn't process your request. Please try again later.";
    }
  }
};