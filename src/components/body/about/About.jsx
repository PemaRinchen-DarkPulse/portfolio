import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaLaptopCode, FaServer, FaDatabase, FaMobile, FaArrowRight } from 'react-icons/fa';
import profileImage from '../../../assets/images/picture.png';
import './About.css';

const About = () => {
  // Skills data
  const skills = [
    { name: 'Frontend Development', icon: <FaLaptopCode />, description: 'Building responsive and intuitive user interfaces with React, HTML5, CSS3, and JavaScript.' },
    { name: 'Backend Development', icon: <FaServer />, description: 'Creating robust server-side applications using Node.js, Express, and RESTful APIs.' },
    { name: 'Database Management', icon: <FaDatabase />, description: 'Designing and optimizing databases with MongoDB, MySQL, and PostgreSQL.' },
    { name: 'Mobile Development', icon: <FaMobile />, description: 'Developing cross-platform mobile applications with React Native.' },
    { name: 'Full Stack Development', icon: <FaCode />, description: 'End-to-end application development from database to user interface.' },
  ];
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About <span className="highlight">Me</span></h1>
          <div className="hero-subtitle">Passionate Developer | Creative Thinker | Problem Solver</div>
          <div className="hero-line"></div>
        </div>
      </div>      <div className="about-content">
        <div className="about-image-container">
          <img src={profileImage} alt="Profile" className="about-image" />
        </div>

        <div className="about-text">
          <div className="section-title-container">
            <div className="section-line"></div>
            <h2 className="section-title">Who am I?</h2>
          </div>
          <p>
            I'm a <span className="highlight">passionate Full Stack Developer</span> with a strong foundation in both frontend and backend technologies. 
            With several years of experience in the tech industry, I've had the opportunity to work on diverse projects 
            that have honed my skills and expanded my knowledge.
          </p>
          <p>
            My journey in software development began when I discovered my passion for creating solutions that make a 
            difference. Since then, I've been committed to crafting clean, efficient, and user-friendly applications.
          </p>          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
            or sharing my knowledge through writing and mentoring.
          </p>
          <Link to="/resume" className="cta-button">
            View Resume <FaArrowRight className="cta-icon" />
          </Link>
        </div>
      </div>

      <div className="about-skills m-1">
        <div className="section-title-container center">
          <div className="section-line"></div>
          <h2 className="section-title">My Skills & Expertise</h2>
        </div>
        <div className="skills-grid">{skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>      </div>
    </div>
  );
};

export default About;