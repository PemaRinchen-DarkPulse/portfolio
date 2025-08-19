import React, { useState, useEffect, useContext } from 'react';
import { FaProjectDiagram, FaCode, FaPlus } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import ProjectUploadForm from './ProjectUploadForm';
import { AuthContext } from '../../auth/AuthContext';
import SharedHero from '../../shared/SharedHero';
import { projectAPI } from '../../../services/api';
import LoadingSpinner from '../../shared/LoadingSpinner';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const { isAuthenticated, token } = useContext(AuthContext);

  // Fetch projects from API with optimization
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // For now, fetch full data to ensure content displays properly
        const response = await projectAPI.getAll({ 
          page: currentPage, 
          limit: 12,
          category: selectedCategory === "All" ? undefined : selectedCategory
        });
        
        const data = response.projects || response;
        setPagination(response.pagination);
        
        setProjects(data);
        setFilteredProjects(data);
        
        // Add a small delay for the animation to look smoother
        setTimeout(() => {
          setAnimateCards(true);
        }, 200);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [currentPage, selectedCategory]);

  // Filter projects based on category
  useEffect(() => {
    // Filtering is now handled server-side via the API call
    setFilteredProjects(projects);
  }, [projects]);
  // Get unique categories from projects
  const categories = ["All", ...new Set(projects.map(project => project.category))];
  
  // Calculate projects count for each category
  const getCategoryCount = (category) => {
    if (category === "All") return projects.length;
    return projects.filter(project => project.category === category).length;
  };

  // Handle adding a new project
  const handleAddProject = async (newProject) => {
    try {
      const createdProject = await projectAPI.create(newProject, token);
      const updatedProjects = [createdProject, ...projects];
      setProjects(updatedProjects);
      setFilteredProjects(updatedProjects);
      setShowUploadForm(false);
    } catch (error) {
      console.error('Error adding project:', error);
      setError('Failed to add project. Please try again.');
    }
  };

  if (error) {
    return (
      <>
        <SharedHero 
          title="My Technical <span class='highlight'>Projects</span>"
          subtitle="Showcasing my development skills and coding expertise"
        />
        <div className="projects-container">
          <div className="error-message">
            <h3>Error Loading Projects</h3>
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
        title="My Technical <span class='highlight'>Projects</span>"
        subtitle="Showcasing my development skills and coding expertise"
      />
      
      <div className="projects-container">
        <div className="projects-content">
        <div className="projects-filter">
          {categories.map((category, index) => (
            <button 
              key={index} 
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({getCategoryCount(category)})
            </button>
          ))}
          {/* Add Project Button - Only shown to authenticated users */}
          {isAuthenticated && (
            <button 
              className="add-project-btn-inline" 
              onClick={() => setShowUploadForm(true)}
              aria-label="Add new project"
            >
              <FaPlus style={{ marginRight: '8px' }} /> Add Project
            </button>
          )}
        </div>
      
      {isLoading ? (
        <div className="projects-loading">
          <LoadingSpinner 
            size="large" 
            message="Loading projects..."
          />
        </div>
      ) : (
        <>
          {filteredProjects.length > 0 ? (
            <div className={`projects-grid ${animateCards ? 'fade-in' : ''}`}>
              {filteredProjects.map((project, index) => (
                <div key={project.id} style={{ 
                  opacity: animateCards ? 1 : 0,
                  transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${index * 0.1}s`
                }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-projects">
              <div className="empty-state-icon">🚀</div>
              <h3>No Projects Yet</h3>
              <p>
                {selectedCategory === "All" 
                  ? "It looks like there are no projects to showcase yet. Stay tuned for exciting developments and innovative solutions!"
                  : `No projects found in the "${selectedCategory}" category. Explore other categories or check back later for new projects.`
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
            </div>          )}
        </>
      )}
      
      {/* Project Upload Form Modal */}
      {showUploadForm && (
        <ProjectUploadForm 
          onClose={() => setShowUploadForm(false)} 
          onSubmit={handleAddProject} 
        />
      )}
      </div>
    </div>
    </>
  );
};

export default ProjectList;
