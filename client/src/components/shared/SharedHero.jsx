import React from 'react';

const SharedHero = ({ 
  title, 
  subtitle, 
  description, 
  backgroundImage = null, 
  gradientOverlay = true,
  className = ""
}) => {
  const heroStyle = backgroundImage 
    ? {
        background: gradientOverlay 
          ? `linear-gradient(135deg, rgba(4, 11, 20, 0.95), rgba(20, 157, 221, 0.8)), url("${backgroundImage}") center/cover no-repeat`
          : `url("${backgroundImage}") center/cover no-repeat`
      }
    : {};

  return (
    <div className={`about-hero ${className}`} style={{...heroStyle, overflow: 'hidden'}}>
      <div className="hero-content">
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {subtitle && <div className="hero-subtitle">{subtitle}</div>}
        <div className="hero-line"></div>
      </div>
    </div>
  );
};

export default SharedHero;
