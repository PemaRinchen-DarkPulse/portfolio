import React, { useState } from 'react';
import { FaUpload, FaParagraph, FaTimes } from 'react-icons/fa';

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
  // Image compression function
  const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, file.type, quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (10MB limit before compression)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size must be less than 10MB');
        return;
      }
      
      try {
        // Compress the image
        const compressedFile = await compressImage(file);
        
        setImageFile(compressedFile);
        
        // Create a preview URL for the image
        const previewUrl = URL.createObjectURL(compressedFile);
        setImagePreview(previewUrl);
        
        // Convert compressed image to Base64
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target.result;
          const sizeInMB = (base64String.length * 0.75) / (1024 * 1024); // Estimate Base64 size
          
          if (sizeInMB > 8) {
            alert('Compressed image is still too large. Please try a smaller image.');
            return;
          }
          
          console.log(`Image compressed to ${sizeInMB.toFixed(2)}MB`);
          setFormData(prevData => ({
            ...prevData,
            image: base64String,
            imageType: compressedFile.type
          }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error processing image. Please try again.');
      }
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
    
    // Validate required fields
    if (!formData.title || !formData.category || !formData.content || !formData.image) {
      alert('Please fill in all required fields and select an image');
      return;
    }
    
    // Prepare the data for API with Base64 image
    const portfolioItem = {
      title: formData.title,
      category: formData.category,
      content: formData.content,
      image: formData.image, // This is now Base64 data URL
      imageType: formData.imageType,
      author: formData.author || "Anonymous",
      readTime: formData.readTime || `${Math.max(1, Math.ceil(formData.content.length / 1000))} min read`,
      gallery: formData.category === "Photography" ? [] : []
    };
    
    // Send the data with Base64 image (no separate file needed)
    onSubmit(portfolioItem);
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
                  <p className="image-info">This image will be saved to the server</p>
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
