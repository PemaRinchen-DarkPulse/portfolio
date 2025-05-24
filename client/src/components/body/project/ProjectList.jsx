import React, { useState, useEffect, useContext } from 'react';
import { FaSearch, FaProjectDiagram, FaCode, FaPlus } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import ProjectUploadForm from './ProjectUploadForm';
import { AuthContext } from '../../auth/AuthContext';
import './Project.css';

// Sample projects data - this can be replaced with an API call in the future
const sampleProjects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "A full-featured online shopping platform with cart functionality, user authentication, and payment integration.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
    date: "April 2025",
    demoLink: "https://demo-ecommerce.example.com",
    githubLink: "https://github.com/username/ecommerce",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Web App"
  },
  {
    id: 2,
    title: "Weather Forecast App",
    description: "Real-time weather application providing current conditions and 5-day forecasts for any location worldwide.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=800",
    date: "March 2025",
    demoLink: "https://weather-app.example.com",
    githubLink: "https://github.com/username/weather-app",
    tech: ["JavaScript", "HTML/CSS", "OpenWeather API"],
    category: "Web App"
  },
  {
    id: 3,
    title: "Task Management System",
    description: "Productivity tool allowing users to create, organize, and track tasks with deadlines and priority levels.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800",
    date: "February 2025",
    demoLink: "https://tasks.example.com",
    githubLink: "https://github.com/username/task-manager",
    tech: ["Vue.js", "Firebase", "Tailwind CSS"],
    category: "Web App"
  },
  {
    id: 4,
    title: "Mobile Fitness Tracker",
    description: "Mobile application to track workouts, set fitness goals, and monitor progress with visual analytics.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800",
    date: "January 2025",
    demoLink: "https://apps.example.com/fitness",
    githubLink: "https://github.com/username/fitness-app",
    tech: ["React Native", "Redux", "HealthKit", "Google Fit"],
    category: "Mobile App"
  },
  {
    id: 5,
    title: "AI Image Generator",
    description: "Web application leveraging machine learning to generate unique images based on user descriptions.",
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=800",
    date: "December 2024",
    demoLink: "https://ai-images.example.com",
    githubLink: "https://github.com/username/ai-image-gen",
    tech: ["Python", "TensorFlow", "Flask", "React"],
    category: "AI/ML"
  },
  {
    id: 6,
    title: "Cryptocurrency Dashboard",
    description: "Real-time dashboard for tracking cryptocurrency prices, trends, and portfolio management.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800",
    date: "November 2024",
    demoLink: "https://crypto.example.com",
    githubLink: "https://github.com/username/crypto-dashboard",
    tech: ["React", "Chart.js", "CoinGecko API"],
    category: "Finance"
  }
];

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  // Simulate fetching data
  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setIsLoading(false);
      
      // Add a small delay for the animation to look smoother
      setTimeout(() => {
        setAnimateCards(true);
      }, 200);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter projects based on category and search term
  useEffect(() => {
    let result = projects;
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(project => project.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) ||
        (project.tech && project.tech.some(tech => tech.toLowerCase().includes(term)))
      );
    }
    
    setFilteredProjects(result);
  }, [selectedCategory, searchTerm, projects]);
  // Get unique categories from projects
  const categories = ["All", ...new Set(projects.map(project => project.category))];
  
  // Calculate projects count for each category
  const getCategoryCount = (category) => {
    if (category === "All") return projects.length;
    return projects.filter(project => project.category === category).length;
  };

  // Handle adding a new project
  const handleAddProject = (newProject) => {
    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
  };
  
  return (
    <div className="projects-container">      <div className="projects-header">
        <h1>
          <FaProjectDiagram style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          My Projects
        </h1>
        <p className="subtitle">A showcase of my technical projects and coding adventures</p>
          {/* Add Project Button - Only shown to authenticated users */}
        {isAuthenticated && (
          <button 
            className="add-project-btn-top" 
            onClick={() => setShowUploadForm(true)}
            aria-label="Add new project"
          >
            <FaPlus style={{ marginRight: '8px' }} /> Add New Project
          </button>
        )}
      </div>
      
      <div className="project-search">
        <FaSearch />
        <input 
          type="text" 
          placeholder="Search projects by name, description or technology..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
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
      </div>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading projects...</p>
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
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter criteria to find what you're looking for.</p>
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
  );
};

export default ProjectList;
