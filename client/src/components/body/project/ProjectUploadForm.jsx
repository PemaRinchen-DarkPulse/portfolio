import React, { useState } from 'react';
import { FaUpload, FaCode, FaTimes } from 'react-icons/fa';
import './Project.css';

const ProjectUploadForm = ({ onClose, onSubmit }) => {  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    imagePreview: null,
    imageName: '',
    date: '',
    demoLink: '',
    githubLink: '',
    category: '',
    tech: []
  });
  
  const [techInput, setTechInput] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  
  const categories = ["Web App", "Mobile App", "AI/ML", "Finance", "Game", "Other"];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
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
  
  const handleTechAdd = () => {
    if (techInput.trim() && !formData.tech.includes(techInput.trim())) {
      setFormData(prevData => ({
        ...prevData,
        tech: [...prevData.tech, techInput.trim()]
      }));
      setTechInput('');
    }
  };
    const handleTechRemove = (techToRemove) => {
    setFormData(prevData => ({
      ...prevData,
      tech: prevData.tech.filter(tech => tech !== techToRemove)
    }));
  };
  
  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      
      setFormData(prevData => ({
        ...prevData,
        image: file, // Store the actual file object
        imagePreview: imageUrl, // Store the preview URL
        imageName: file.name // Store the filename for display
      }));
    }
  };  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real-world scenario, you would upload the image to a server/storage service
    // and get back a URL. For this demo, we'll use the preview URL or a default image.
    const imageUrl = formData.imagePreview || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800";
    
    // Prepare the data
    const projectItem = {
      id: Date.now(), // Generate a unique ID
      title: formData.title,
      description: formData.description,
      image: imageUrl, // Use the preview URL for now
      date: formData.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      demoLink: formData.demoLink,
      githubLink: formData.githubLink,
      tech: formData.tech,
      category: formData.category
    };
    
    onSubmit(projectItem);
    onClose();
  };
  
  // Handle tech input with Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTechAdd();
    }
  };
  
  return (
    <div className="project-upload-overlay">
      <div className="project-upload-form">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Add New Project</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Project Title*</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title}
              onChange={handleChange} 
              placeholder="Enter project title"
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
              )}            </div>
          </div>
            <div className="form-group">
            <label htmlFor="image">Project Image</label>
            <div className="image-upload-container">
              <input 
                type="file" 
                id="imageUpload" 
                name="imageUpload"
                accept="image/*"
                onChange={handleImageUpload} 
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
                {formData.imagePreview && (
                  <span className="file-name">{formData.imageName}</span>
                )}
              </div>
              {formData.imagePreview && (
                <div className="image-preview">
                  <img src={formData.imagePreview} alt="Preview" />
                </div>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description}
              onChange={handleChange} 
              placeholder="Describe your project"
              rows="4"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input 
              type="text" 
              id="date" 
              name="date" 
              value={formData.date}
              onChange={handleChange} 
              placeholder="e.g. May 2025"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="githubLink">GitHub Link</label>
            <input 
              type="url" 
              id="githubLink" 
              name="githubLink" 
              value={formData.githubLink}
              onChange={handleChange} 
              placeholder="Enter GitHub repository URL"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="demoLink">Demo Link</label>
            <input 
              type="url" 
              id="demoLink" 
              name="demoLink" 
              value={formData.demoLink}
              onChange={handleChange} 
              placeholder="Enter live demo URL"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="techInput">Technologies Used</label>
            <div className="tech-input-container">
              <input 
                type="text" 
                id="techInput" 
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)} 
                onKeyDown={handleKeyDown}
                placeholder="Add a technology and press Enter"
              />
              <button 
                type="button" 
                className="add-tech-btn"
                onClick={handleTechAdd}
                disabled={!techInput.trim()}
              >
                Add
              </button>
            </div>
            
            <div className="tech-pills-container">
              {formData.tech.map((tech, index) => (
                <span key={index} className="tech-pill tech-pill-removable">
                  <FaCode style={{ fontSize: '0.7rem', marginRight: '5px' }} />
                  {tech}
                  <button 
                    type="button" 
                    className="remove-tech-btn" 
                    onClick={() => handleTechRemove(tech)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={!formData.title || !formData.category || !formData.description}
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectUploadForm;
