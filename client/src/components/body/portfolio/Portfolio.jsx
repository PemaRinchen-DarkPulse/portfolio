import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PortfolioUploadForm from './PortfolioUploadForm';
import { AuthContext } from '../../auth/AuthContext';
import SharedHero from '../../shared/SharedHero';
import { portfolioAPI } from '../../../services/api';

// Function to trim content to approximately three lines
const getContentPreview = (content, maxLength = 120) => {
  // Remove markdown headers
  let plainContent = content.replace(/#+\s+[^\n]+/g, '');
  
  // Handle different content types differently
  let lines = plainContent.split('\n').filter(line => line.trim() !== '');
  
  // Get first few lines depending on length
  let preview = '';
  let currentLength = 0;
  let lineCount = 0;
  
  for (let i = 0; i < lines.length && lineCount < 3; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#')) {
      preview += (preview ? ' ' : '') + line;
      currentLength += line.length;
      lineCount++;
      
      if (currentLength >= maxLength) {
        break;
      }
    }
  }
  
  // Trim and add ellipsis if needed
  return preview.length > maxLength 
    ? preview.substring(0, maxLength).trim() + '...' 
    : preview;
};

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useContext(AuthContext);
  
  // Fetch portfolio items from API
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await portfolioAPI.getAll();
        
        // Process portfolio items to include content previews
        const itemsWithPreviews = data.map(item => ({
          ...item,
          contentPreview: getContentPreview(item.content)
        }));
        
        setPortfolioItems(itemsWithPreviews);
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
        setError('Failed to load portfolio items. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);
  
  // Filter items when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, portfolioItems]);

  const categories = ["All", ...new Set(portfolioItems.map(item => item.category))];

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  
  // Handle adding a new portfolio item
  const handleAddPortfolioItem = async (newItem, imageFile) => {
    try {
      // Check if we have a valid token before making the API call
      if (!token) {
        console.error('No authentication token available');
        setError('You must be logged in to add portfolio items.');
        return;
      }
      
      console.log('Creating portfolio item with token:', token ? 'Token exists' : 'No token');
      console.log('Image file provided:', imageFile ? 'Yes' : 'No');
      
      // Pass the image file to the API method
      const createdItem = await portfolioAPI.create(newItem, token, imageFile);
      
      // Add contentPreview to the new item
      const itemWithPreview = {
        ...createdItem,
        contentPreview: getContentPreview(createdItem.content)
      };
      
      // Update local state with the new item
      setPortfolioItems(prevItems => [itemWithPreview, ...prevItems]);
      setShowUploadForm(false);
    } catch (error) {
      console.error('Error adding portfolio item:', error);
      setError('Failed to add portfolio item. Please try again.');
    }
  };

  if (error) {
    return (
      <>
        <SharedHero 
          title="My Creative <span class='highlight'>Portfolio</span>"
          subtitle="Showcasing my artistic expressions and creative works"
          description="Explore my diverse collection of writings, photography, and creative projects that reflect my passion for storytelling and visual arts."
        />
        <div className="portfolio-container">
          <div className="error-message">
            <h3>Error Loading Portfolio</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SharedHero 
        title="My Creative <span class='highlight'>Portfolio</span>"
        subtitle="Showcasing my artistic expressions and creative works"
        description="Explore my diverse collection of writings, photography, and creative projects that reflect my passion for storytelling and visual arts."
      />
      
      <div className="portfolio-container">
        <div className="portfolio-content">
        <div className="portfolio-categories">
          {categories.map((category, index) => (
            <button 
              key={index} 
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
          {/* Add Portfolio Button - Only shown to authenticated users */}
          {isAuthenticated && (
            <button 
              className="portfolio-upload-button-inline" 
              onClick={() => setShowUploadForm(true)}
              aria-label="Add new portfolio item"
            >
              + Add New Item
            </button>
          )}
        </div>      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing content...</p>
        </div>
      ) : (
        <div className="portfolio-grid">
          {filteredItems.map(item => (
            <div className="portfolio-item" key={item.id}>
              <div className="portfolio-item-inner">
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="category-tag">{item.category}</div>
                </div>
                <div className="portfolio-content">
                  <h3>{item.title}</h3>
                  <p className="portfolio-date">{item.date}</p>
                  <p className="portfolio-description">{item.contentPreview}</p>
                  <Link to={`/portfolio/${item.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {filteredItems.length === 0 && !isLoading && (
        <div className="no-items-message">
          <div className="empty-state-icon">📝</div>
          <h3>No Portfolio Items Yet</h3>
          <p>
            {selectedCategory === "All" 
              ? "It looks like there are no portfolio items to display. Check back soon for amazing content!"
              : `No items found in the "${selectedCategory}" category. Try exploring other categories or check back later for new content.`
            }
          </p>
          {selectedCategory !== "All" && (
            <button 
              className="back-to-all-btn"
              onClick={() => setSelectedCategory("All")}
            >
              View All Categories
            </button>
          )}
        </div>
      )}
      
      {/* Upload Form Popup */}
      {showUploadForm && (
        <PortfolioUploadForm 
          onClose={() => setShowUploadForm(false)}
          onSubmit={handleAddPortfolioItem}
        />
      )}
      </div>
    </div>
    </>
  );
};

export default Portfolio;