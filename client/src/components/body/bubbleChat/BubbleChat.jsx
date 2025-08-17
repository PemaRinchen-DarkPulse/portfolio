import React, { useState, useEffect, useRef } from 'react';
import { FaRegCommentDots, FaPaperPlane, FaRobot } from 'react-icons/fa';
import { sendMessage } from './chatService';
import './BubbleChat.css';

function BubbleChat() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat window
  const [userMessage, setUserMessage] = useState(''); // User's input
  const [chatHistory, setChatHistory] = useState([]); // Store chat messages
  const [greetingSent, setGreetingSent] = useState(false); // Track if greeting is sent
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const chatEndRef = useRef(null); // Reference to scroll to the end of the chat

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]); // Trigger when chat history changes

  // Toggle chat window
  const toggleChat = () => {
    if (!isOpen && !greetingSent) {
      // Add default greeting message when opening the chat for the first time
      setChatHistory((prev) => [
        ...prev,
        { 
          sender: 'AI', 
          message: 'Hi! 👋 I\'m Virtual Pema, your personal assistant. I can help you learn about Pema Rinchen\'s skills, projects, and experience. What would you like to know?' 
        },
      ]);
      setGreetingSent(true); // Mark greeting as sent
    }
    setIsOpen(!isOpen);
  };

  // Handle message submission
  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      // Add user's message to chat history
      const updatedHistory = [
        ...chatHistory,
        { sender: 'You', message: userMessage }
      ];
      
      setChatHistory(updatedHistory);
      setUserMessage(''); // Clear input
      setIsLoading(true); // Start loading state
      
      try {
        // Get AI response from our chat service
        const aiResponse = await sendMessage(userMessage, chatHistory);
        
        // Add AI response to chat history
        setChatHistory(prev => [...prev, { sender: 'AI', message: aiResponse }]);
      } catch (error) {
        console.error('Error getting response:', error);
        // Add error message to chat history
        setChatHistory(prev => [...prev, { 
          sender: 'AI', 
          message: "I'm having trouble connecting right now. Please try again later." 
        }]);
      } finally {
        setIsLoading(false); // End loading state
      }
    }
  };

  // Function to safely render HTML content with links
  const renderMessageWithLinks = (message) => {
    // Only render HTML for AI messages, user messages should be plain text
    return { __html: message };
  };

  // Handle Enter key press and Shift+Enter for new line
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default new line
      handleSendMessage(); // Send message on Enter
    }
  };

  return (
    <div>
      {/* Chat bubble */}
      <div className="chat-bubble" onClick={toggleChat}>
        <FaRegCommentDots className="chat-icon" />
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            💬 Ask Me Anything!
          </div>
          <div className="chat-body">
            {chatHistory.map((chat, index) => (
              <div key={index} className="chat-message">
                {chat.sender === 'You' ? (
                  <div className="user-message">
                    <div className="user-message-content">
                      {chat.message}
                    </div>
                  </div>
                ) : (
                  <div className="ai-message">
                    <div className="ai-avatar">
                      <FaRobot />
                    </div>
                    <div 
                      className="ai-message-content"
                      dangerouslySetInnerHTML={renderMessageWithLinks(chat.message)}
                    />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message">
                <div className="ai-message">
                  <div className="ai-avatar">
                    <FaRobot />
                  </div>
                  <div className="ai-message-content loading">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Scroll target */}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button onClick={handleSendMessage} disabled={isLoading || !userMessage.trim()}>
              {isLoading ? '...' : <FaPaperPlane />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BubbleChat;
