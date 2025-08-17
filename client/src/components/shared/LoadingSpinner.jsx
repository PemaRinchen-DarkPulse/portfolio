import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  fullScreen = false,
  variant = 'default' 
}) => {
  const sizeClasses = {
    small: 'loading-spinner-small',
    medium: 'loading-spinner-medium',
    large: 'loading-spinner-large'
  };

  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-content">
          <div className={`modern-spinner ${sizeClasses[size]}`}>
            <div className="spinner-circle"></div>
          </div>
          {message && (
            <p className="loading-message">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className={`modern-spinner ${sizeClasses[size]}`}>
        <div className="spinner-circle"></div>
      </div>
      {message && (
        <p className="loading-message">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
