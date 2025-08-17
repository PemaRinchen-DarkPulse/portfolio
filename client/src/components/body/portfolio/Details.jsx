import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioAPI } from '../../../services/api';
import LoadingSpinner from '../../shared/LoadingSpinner';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '', show: false });

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type, show: true });
    setTimeout(() => {
      setMessage({ text: '', type: '', show: false });
    }, 5000); // Hide after 5 seconds
  };

  // Fetch portfolio item from API
  useEffect(() => {
    const fetchPortfolioItem = async () => {
      if (!id) {
        setError('No portfolio ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching portfolio item with ID:', id);
        const data = await portfolioAPI.getById(id);
        setItem(data);
      } catch (error) {
        console.error('Error fetching portfolio item:', error);
        setError('Portfolio item not found or failed to load.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItem();
  }, [id]);

  const handleBack = () => {
    navigate('/portfolio');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim()) {
      showMessage('Please fill in both name and comment fields.', 'error');
      return;
    }

    if (name.trim().length < 2) {
      showMessage('Name must be at least 2 characters long.', 'error');
      return;
    }

    if (comment.trim().length < 5) {
      showMessage('Comment must be at least 5 characters long.', 'error');
      return;
    }

    try {
      setIsSubmittingComment(true);
      
      const commentData = {
        name: name.trim(),
        comment: comment.trim()
      };

      const response = await portfolioAPI.addComment(id, commentData);
      
      if (response.success) {
        // Update the local state with the new comment
        setItem(prev => ({
          ...prev,
          comments: [response.comment, ...(prev.comments || [])]
        }));
        
        // Clear the form
        setName('');
        setComment('');
        
        // Show success message
        showMessage('Comment added successfully! 🎉', 'success');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      showMessage(error.message || 'Failed to add comment. Please try again.', 'error');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const renderContent = (content) => {
    if (!content) return <p>No content available.</p>;
    
    if (item.category === "Poetry" || item.category === "Article" || item.category === "Blog") {
      // For poetry and articles, preserve line breaks and formatting
      return content.split('\n').map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index}>{line.substring(2)}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={index}>{line.substring(3)}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={index}>{line.substring(4)}</h3>;
        } else if (line.trim() === '') {
          return <br key={index} />;
        } else {
          return <p key={index}>{line}</p>;
        }
      });
    } else if (item.category === "Short Story") {
      // For short stories, render paragraphs
      return content.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ));
    } else {
      // Default rendering
      return <p>{content}</p>;
    }
  };

  if (isLoading) {
    return (
      <div className="details-loading">
        <LoadingSpinner 
          size="large" 
          message="Loading portfolio details..."
        />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="portfolio-detail">
        <div className="error-container">
          <h2>Portfolio Item Not Found</h2>
          <p>{error || 'The requested portfolio item could not be found.'}</p>
          <button 
            onClick={() => navigate('/portfolio')}
            className="back-to-portfolio-btn"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-content-wrapper">
        <button className="back-button" onClick={handleBack}>
          ← Back to Portfolio
        </button>
        
        <header className="details-header">
          <h1>{item.title}</h1>
          <div className="details-meta">
            <span className="details-category">📁 {item.category}</span>
            <span className="details-date">📅 {item.date}</span>
            <span className="details-author">👤 By {item.author || 'Pema Rinchen'}</span>
            {item.readTime && <span className="details-read-time">⏱️ {item.readTime}</span>}
          </div>
        </header>
        
        <div className="details-featured-image">
          <img src={item.image} alt={item.title} />
        </div>
        
        {item.category === "Photography" && item.gallery && item.gallery.length > 0 && (
          <div className="details-gallery">
            <h3 style={{ gridColumn: '1 / -1', textAlign: 'center', marginBottom: '1rem', color: '#2c3e50' }}>
              📸 Photo Gallery
            </h3>
            {item.gallery.map((image, index) => (
              <img key={index} src={image} alt={`${item.title} - Image ${index + 1}`} />
            ))}
          </div>
        )}
        
        <div className="details-content">
          {renderContent(item.content)}
        </div>
        
        <div className="details-comments">
          <h3>💬 Comments ({item.comments ? item.comments.length : 0})</h3>
          
          {/* Message Display */}
          {message.show && (
            <div className={`message-toast message-${message.type}`}>
              <span className="message-text">{message.text}</span>
              <button 
                className="message-close" 
                onClick={() => setMessage({ text: '', type: '', show: false })}
              >
                ×
              </button>
            </div>
          )}
          
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <label htmlFor="name">👤 Your Name</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="comment">💭 Your Comment</label>
              <textarea 
                id="comment" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this portfolio item..."
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="submit-comment"
              disabled={isSubmittingComment}
            >
              {isSubmittingComment ? '⏳ Adding...' : '🚀 Post Comment'}
            </button>
          </form>
          
          <div className="comments-list">
            {item.comments && item.comments.length > 0 ? (
              item.comments.map(comment => (
                <div key={comment._id || comment.id || Math.random()} className="comment">
                  <div className="comment-header">
                    <strong>👤 {comment.name}</strong>
                    <span className="comment-date">📅 {
                      comment.date 
                        ? new Date(comment.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Unknown date'
                    }</span>
                  </div>
                  <p className="comment-text">{comment.comment}</p>
                </div>
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: '#7f8c8d',
                background: '#f8f9fa',
                borderRadius: '10px',
                border: '2px dashed #dee2e6'
              }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>💬 No comments yet</p>
                <p>Be the first to share your thoughts about this portfolio item!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
