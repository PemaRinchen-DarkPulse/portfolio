import React from 'react';
import { FaCalendarAlt, FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const { title, description, image, date, demoLink, githubLink, tech, category } = project;

  return (
    <div className="project-card">
      <div className="project-image">
        <img src={image} alt={title} loading="lazy" />
        {category && <div className="project-tech-tag">{category}</div>}
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <div className="project-date">
          <FaCalendarAlt /> <span>{date}</span>
        </div>
        <p className="project-description">{description}</p>
        
        <div className="project-tech-stack">
          {tech && tech.map((item, index) => (
            <span key={index} className="tech-pill">
              <FaCode style={{ fontSize: '0.7rem', marginRight: '5px' }} />
              {item}
            </span>
          ))}
        </div>
        
        <div className="project-footer">
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaGithub style={{ marginRight: '5px' }} /> Code
            </a>
          )}
          {demoLink && (
            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaExternalLinkAlt style={{ marginRight: '5px' }} /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;