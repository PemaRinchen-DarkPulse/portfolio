import React, { useState } from 'react';
import { FaUpload, FaParagraph, FaTimes } from 'react-icons/fa';
import './Portfolio.css';

const PortfolioUploadForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: '',
    author: '',
    readTime: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  
  const categories = ["Poetry", "Blog", "Short Story", "Photography", "Article", "Other"];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Store the file name in the form data for display purposes
      setFormData(prevData => ({
        ...prevData,
        image: file.name
      }));
    }
  };
  
  const handleCategorySelect = (category) => {
    setFormData(prevData => ({
      ...prevData,
      category: category
    }));
  };
  
  const handleSaveNewCategory = () => {
    if (newCategory.trim()) {
      setFormData(prevData => ({
        ...prevData,
        category: newCategory.trim()
      }));
      setShowNewCategory(false);
    }
  };
    const handleSubmit = (e) => {
    e.preventDefault();
    
    // Use the preview URL or a default image
    const imageUrl = imagePreview || "https://images.unsplash.com/photo-1518346431802-22ecff0abff1?q=80&w=800";
    
    // Prepare the data
    const portfolioItem = {
      id: Date.now(), // Generate a unique ID
      title: formData.title,
      category: formData.category,
      content: formData.content,
      image: imageUrl, // Use the preview URL for now
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: formData.author || "Anonymous",
      readTime: formData.readTime || `${Math.max(1, Math.ceil(formData.content.length / 1000))} min read`,
      likes: 0,
      comments: []
    };
    
    // If it's a photography item, add gallery
    if (formData.category === "Photography") {
      portfolioItem.gallery = [imageUrl];
    }
    
    onSubmit(portfolioItem);
    onClose();
  };
  
  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  
  return (
    <div className="portfolio-upload-overlay">
      <div className="portfolio-upload-form">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Add New Portfolio Item</h2>
        
        <form onSubmit={handleSubmit}>          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title}
              onChange={handleChange} 
              placeholder="Enter portfolio title"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category*</label>
            <div className="category-selection-container">
              {!showNewCategory ? (
                <>
                  <div className="category-options">
                    {categories.map((category, index) => (
                      <button 
                        key={index} 
                        type="button"
                        className={`category-option-btn ${formData.category === category ? 'selected' : ''}`}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </button>
                    ))}
                    <button 
                      type="button" 
                      className="new-category-btn"
                      onClick={() => setShowNewCategory(true)}
                    >
                      <span>+</span> New Category
                    </button>
                  </div>
                  <input 
                    type="hidden" 
                    name="category" 
                    value={formData.category} 
                    required 
                  />
                  {!formData.category && (
                    <small style={{ color: '#e53e3e', marginTop: '5px', display: 'block' }}>
                      Please select a category
                    </small>
                  )}
                </>
              ) : (
                <div className="new-category-input">
                  <input
                    type="text"
                    placeholder="Enter new category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    autoFocus
                  />
                  <div className="new-category-actions">
                    <button 
                      type="button" 
                      className="btn-save-category"
                      onClick={handleSaveNewCategory}
                      disabled={!newCategory.trim()}
                    >
                      Save
                    </button>
                    <button 
                      type="button" 
                      className="btn-cancel-category"
                      onClick={() => {
                        setShowNewCategory(false);
                        setNewCategory('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>          <div className="form-group">
            <label htmlFor="image">Image Upload</label>
            <div className="image-upload-container">
              <input 
                type="file" 
                id="imageUpload" 
                name="imageUpload"
                accept="image/*"
                onChange={handleImageChange} 
                className="image-upload-input"
              />
              <div className="image-upload-button-wrapper">
                <button 
                  type="button" 
                  className="image-upload-button"
                  onClick={() => document.getElementById('imageUpload').click()}
                >
                  <FaUpload style={{ marginRight: '8px' }} /> Choose Image
                </button>
                {imageFile && (
                  <span className="file-name">{imageFile.name}</span>
                )}
              </div>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
              {!imagePreview && (
                <p className="image-info">No image selected (a default image will be used)</p>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input 
              type="text" 
              id="author" 
              name="author" 
              value={formData.author}
              onChange={handleChange} 
              placeholder="Enter author name (optional)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="readTime">Read Time</label>
            <input 
              type="text" 
              id="readTime" 
              name="readTime" 
              value={formData.readTime}
              onChange={handleChange} 
              placeholder="e.g. '5 min read' (optional, will be auto-calculated)"
            />
          </div>
            <div className="form-group">
            <label htmlFor="content">Content*</label>
            <div className="content-input-wrapper">
              <FaParagraph className="content-icon" />
              <textarea 
                id="content" 
                name="content" 
                value={formData.content}
                onChange={handleChange} 
                placeholder="Enter your content here. For poetry, each line will be preserved. For articles, you can use # for headings and ## for subheadings."
                rows="10"
                required
              ></textarea>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={!formData.title || !formData.category || !formData.content}
            >
              Add Portfolio Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioUploadForm;
