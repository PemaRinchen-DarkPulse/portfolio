import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PortfolioUploadForm from './PortfolioUploadForm';
import { AuthContext } from '../../auth/AuthContext';
import SharedHero from '../../shared/SharedHero';

// Import full portfolio data with content
import { samplePortfolioItems, addPortfolioItem } from './Details';

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
  const [portfolioItems, setPortfolioItems] = useState([]);  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  
  // Process portfolio items to include content previews
  useEffect(() => {
    const items = samplePortfolioItems.map(item => ({
      ...item,
      contentPreview: getContentPreview(item.content)
    }));
    setPortfolioItems(items);
  }, []);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
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
  const handleAddPortfolioItem = (newItem) => {
    // Add contentPreview to the new item
    const itemWithPreview = {
      ...newItem,
      contentPreview: getContentPreview(newItem.content)
    };
    
    // Update the global samplePortfolioItems array
    const updatedItems = addPortfolioItem(itemWithPreview);
    
    // Update local state with the new items
    setPortfolioItems([...updatedItems]);
  };

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
          <p>No items found in this category. Try selecting a different category.</p>
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