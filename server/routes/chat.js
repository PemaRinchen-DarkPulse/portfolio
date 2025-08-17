const express = require('express');
const router = express.Router();
const PortfolioContentService = require('../services/portfolioContentService');

/**
 * POST /api/chat
 * Send a message to the AI chatbot and get a response
 */
router.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a non-empty string'
      });
    }

    // Validate message length
    if (message.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long. Please keep it under 1000 characters.'
      });
    }

    // Validate history format
    if (!Array.isArray(history)) {
      return res.status(400).json({
        success: false,
        error: 'History must be an array'
      });
    }

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return res.status(500).json({
        success: false,
        error: 'AI service is not properly configured'
      });
    }

    // Generate dynamic system prompt with current portfolio content
    const systemPrompt = await PortfolioContentService.generateSystemPrompt();

    // Build messages array for OpenAI
    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];

    // Add conversation history (limit to last 10 exchanges to prevent token overflow)
    const recentHistory = history.slice(-10);
    if (Array.isArray(recentHistory) && recentHistory.length > 0) {
      recentHistory.forEach(item => {
        if (item.sender && item.message && typeof item.message === 'string') {
          messages.push({
            role: item.sender === 'You' ? 'user' : 'assistant',
            content: item.message.trim()
          });
        }
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: message.trim()
    });

    // Prepare API request
    const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

    const requestBody = {
      model: model,
      messages: messages,
      max_tokens: 800,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.1,
      presence_penalty: 0.1
    };

    console.log(`Making chat request to ${baseUrl}/chat/completions`);

    // Make request to OpenAI API
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });

      // Return user-friendly error based on status
      let errorMessage = "I'm having trouble processing your request right now.";
      
      if (response.status === 401) {
        errorMessage = "Authentication issue with AI service.";
      } else if (response.status === 429) {
        errorMessage = "AI service is currently busy. Please try again in a moment.";
      } else if (response.status >= 500) {
        errorMessage = "AI service is temporarily unavailable.";
      }

      return res.status(200).json({
        success: true,
        response: errorMessage + " Please try again later."
      });
    }

    const data = await response.json();

    // Validate response structure
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.error('Invalid OpenAI response structure:', data);
      return res.status(200).json({
        success: true,
        response: "I received an unexpected response. Please try asking your question again."
      });
    }

    const aiResponse = data.choices[0].message?.content?.trim();

    if (!aiResponse) {
      console.error('Empty response from OpenAI:', data);
      return res.status(200).json({
        success: true,
        response: "I couldn't generate a proper response. Please try rephrasing your question."
      });
    }

    // Log successful interaction for monitoring
    console.log(`Chat request successful. Input length: ${message.length}, Output length: ${aiResponse.length}`);

    // Return successful response
    res.json({
      success: true,
      response: aiResponse,
      usage: data.usage || null,
      model: model
    });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    
    // Return user-friendly error message
    res.status(200).json({
      success: true,
      response: "I'm experiencing some technical difficulties. Please try again in a moment."
    });
  }
});

/**
 * GET /api/chat/health
 * Health check endpoint for chat service
 */
router.get('/health', (req, res) => {
  const isConfigured = !!(process.env.OPENAI_API_KEY && process.env.OPENAI_BASE_URL);
  
  res.json({
    success: true,
    status: 'Chat service is running',
    configured: isConfigured,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
