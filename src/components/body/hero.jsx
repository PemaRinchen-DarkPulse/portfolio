import React from 'react';
import HeroImage from '../../assets/images/hero.jpg';

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="hero section dark-background" 
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center', // Adjust this to focus on the face
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div className="overlay"></div>
      <div 
        className="container popping-effect" 
        data-aos="fade-up" 
        data-aos-delay="100"
      >
        <h2>Pema Rinchen</h2>
        <p>
          I'm 
          <span className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer">
            FullStack Web Developer
          </span>
          <span className="typed-cursor typed-cursor--blink" aria-hidden="true"></span>
        </p>
      </div>
    </section>
  );
}

export default Hero;
