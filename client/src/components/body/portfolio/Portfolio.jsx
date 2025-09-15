import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PortfolioUploadForm from './PortfolioUploadForm';
import { AuthContext } from '../../auth/AuthContext';
import SharedHero from '../../shared/SharedHero';
import { portfolioAPI, warmupBackend } from '../../../services/api';
import LoadingSpinner from '../../shared/LoadingSpinner';
import SEOHelmet from '../../shared/SEOHelmet';

// Function to trim content to approximately three lines
const getContentPreview = (content, maxLength = 120) => {
  // Handle undefined or null content
  if (!content || typeof content !== 'string') {
    return 'No preview available...';
  }
  
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loadingFullImages, setLoadingFullImages] = useState(false);
  const { isAuthenticated, token } = useContext(AuthContext);
  
  // Fetch portfolio items from API with optimization
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // For now, fetch full data to ensure content displays properly
        // We can re-enable preview mode once content display is working
        const response = await portfolioAPI.getAll({ 
          page: currentPage, 
          limit: 10,
          category: selectedCategory === "All" ? undefined : selectedCategory
        });
        
        let data = response.portfolios || response;
        setPagination(response.pagination);
        
        // Process portfolio items to include content previews
        const itemsWithPreviews = data.map(item => ({
          ...item,
          // Always ensure we have content preview, fallback to empty string if content is missing
          contentPreview: item.content 
            ? getContentPreview(item.content)
            : 'No content available',
          isPreview: false
        }));
        
        console.log('Portfolio items with IDs:', itemsWithPreviews.map(item => ({ 
          title: item.title, 
          _id: item._id, 
          id: item.id 
        })));
        
        setPortfolioItems(itemsWithPreviews);
        
        // Optionally load full images in background if user is likely to need them
        // This is commented out to prioritize speed - images load when needed
        // setTimeout(async () => {
        //   if (!loadingFullImages) {
        //     setLoadingFullImages(true);
        //     try {
        //       const fullResponse = await portfolioAPI.getAll({ 
        //         page: currentPage, 
        //         limit: 10,
        //         category: selectedCategory === "All" ? undefined : selectedCategory
        //       });
        //       const fullData = fullResponse.portfolios || fullResponse;
        //       setPortfolioItems(fullData.map(item => ({
        //         ...item,
        //         contentPreview: getContentPreview(item.content),
        //         isPreview: false
        //       })));
        //     } catch (err) {
        //       console.warn('Failed to load full images in background:', err);
        //     }
        //     setLoadingFullImages(false);
        //   }
        // }, 2000);
        
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
        // If backend is cold (503), attempt a soft warmup and show gentle message
        if (error?.response?.status === 503) {
          warmupBackend();
          setError('Service is waking up. Please retry in a few seconds.');
        } else {
          setError('Failed to load portfolio items. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, [currentPage, selectedCategory]);
  
  // Filter items when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === selectedCategory));
    }
  }, [portfolioItems]); // Removed selectedCategory dependency as it's handled in main fetch

  const categories = ["All", ...new Set(portfolioItems.map(item => item.category))];

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  // Handle adding a new portfolio item with Base64 image
  const handleAddPortfolioItem = async (newItem) => {
    try {
      // Check if we have a valid token before making the API call
      if (!token) {
        console.error('No authentication token available');
        setError('You must be logged in to add portfolio items.');
        return;
      }
      
      console.log('Creating portfolio item with token:', token ? 'Token exists' : 'No token');
      console.log('Image data provided:', newItem.image ? 'Yes' : 'No');
      
      // Call the API with the Base64 image data included in newItem
      const createdItem = await portfolioAPI.create(newItem, token);
      
      // Add contentPreview to the new item
      const itemWithPreview = {
        ...createdItem,
        contentPreview: getContentPreview(createdItem.content)
      };
      
      // Update local state with the new item
      setPortfolioItems(prevItems => [itemWithPreview, ...prevItems]);
      setShowUploadForm(false);
    } catch (error) {
      setError('Failed to add portfolio item. Please try again.');
    }
  };

  if (error) {
    return (
      <>
        <SharedHero 
          title="My Creative <span class='highlight'>Portfolio</span>"
          subtitle="Showcasing my artistic expressions and creative works"
        />
        <div className="portfolio-container">
          <div className="error-message">
            <h3>Error Loading Portfolio</h3>
            <p>{error}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => { setError(null); warmupBackend(); setTimeout(() => window.location.reload(), 800); }}>
                Retry in 1s
              </button>
              <button onClick={() => window.location.reload()}>
                Reload Now
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHelmet 
        title="Portfolio - Pema Rinchen's Creative Works & Web Development Projects"
        description="Explore Pema Rinchen's portfolio showcasing creative works, web development projects, and artistic expressions. View detailed case studies and project implementations."
        keywords="Pema Rinchen portfolio, web development projects, creative works, project showcase, development case studies"
        url="https://www.pemarinchen.dev/portfolio"
      />
      <SharedHero 
        title="My Creative <span class='highlight'>Portfolio</span>"
        subtitle="Showcasing my artistic expressions and creative works"
      />
      
      <div className="portfolio-container">
        <div className="portfolio-content">
        <div className="portfolio-categories">
          {categories.map((category) => (
            <button 
              key={category} 
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
        </div>      
        {isLoading ? (
          <div className="portfolio-loading">
            <LoadingSpinner 
              size="large" 
              message="Loading portfolio content..."
            />
          </div>
        ) : (
        <div className="portfolio-grid">
          {filteredItems.map(item => (
            <div className="portfolio-item" key={item._id || item.id}>
              <div className="portfolio-item-inner">
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="category-tag">{item.category}</div>
                </div>
                <div className="portfolio-content">
                  <h3>{item.title}</h3>
                  <p className="portfolio-date">{item.date}</p>
                  <p className="portfolio-description">{item.contentPreview}</p>
                  <Link to={`/portfolio/${item._id || item.id}`} className="view-details-btn">
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