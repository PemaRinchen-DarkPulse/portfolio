import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioAPI } from '../../../services/api';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  // Fetch portfolio item from API
  useEffect(() => {
    const fetchPortfolioItem = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await portfolioAPI.getById(id);
        setItem(data);
      } catch (error) {
        console.error('Error fetching portfolio item:', error);
        setError('Portfolio item not found or failed to load.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPortfolioItem();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/portfolio');
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setItem(prev => ({ ...prev, likes: prev.likes + 1 }));
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      const newComment = {
        id: Date.now(),
        name: name.trim(),
        comment: comment.trim(),
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };
      
      setItem(prev => ({
        ...prev,
        comments: [newComment, ...(prev.comments || [])]
      }));
      
      setName('');
      setComment('');
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
      <div className="portfolio-detail">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading portfolio item...</p>
        </div>
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
      <button className="back-button" onClick={handleBack}>
        ← Back to Portfolio
      </button>
      
      <header className="details-header">
        <h1>{item.title}</h1>
        <div className="details-meta">
          <span className="details-category">{item.category}</span>
          <span className="details-date">{item.date}</span>
          <span className="details-author">By {item.author}</span>
          {item.readTime && <span className="details-read-time">{item.readTime}</span>}
        </div>
      </header>
      
      <div className="details-featured-image">
        <img src={item.image} alt={item.title} />
      </div>
      
      {item.category === "Photography" && item.gallery && item.gallery.length > 0 && (
        <div className="details-gallery">
          {item.gallery.map((image, index) => (
            <img key={index} src={image} alt={`${item.title} - Image ${index + 1}`} />
          ))}
        </div>
      )}
      
      <div className="details-content">
        {renderContent(item.content)}
      </div>
      
      <div className="details-actions">
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
          {liked ? '❤️' : '🤍'} {item.likes || 0} {(item.likes || 0) === 1 ? 'Like' : 'Likes'}
        </button>
        <button className="share-button">
          📤 Share
        </button>
      </div>
      
      <div className="details-comments">
        <h3>Comments ({item.comments ? item.comments.length : 0})</h3>
        
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea 
              id="comment" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-comment">Post Comment</button>
        </form>
        
        <div className="comments-list">
          {item.comments && item.comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <strong>{comment.name}</strong>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p className="comment-text">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
