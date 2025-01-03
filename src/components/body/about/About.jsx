import React from 'react';
import { FaMusic, FaFilm, FaFutbol } from 'react-icons/fa';

const About = () => {
  return (
    <div className="container mt-4">
      <h1 className="ms-2" style={{ color: '#343a40', fontWeight: 'bold' }}>About Me</h1>
      <div className="mx-2">
        <p style={{ fontSize: '18px', color: '#6c757d' }}>
          I am a passionate Full Stack Web Developer with a strong foundation in both frontend and backend technologies. 
          I enjoy creating responsive, user-friendly, and dynamic web applications that solve real-world problems and enhance user experiences. 
        </p>
        <div className="row align-items-center">
          <div
            className="col-4 d-flex justify-content-center align-items-center bg-primary text-white rounded"
            style={{
              height: '250px',
              fontSize: '18px',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #007bff, #0056b3)',
            }}
          >
            Profile Image Comming Soon
          </div>
          {/* Content Section */}
          <div className="col mx-3">
            <h3 style={{ color: '#007bff', fontWeight: 'bold' }}>Full Stack Web Developer</h3>
            <p style={{ fontSize: '16px', color: '#495057' }}>
              With expertise in modern frameworks and tools, I specialize in building scalable web applications. 
              I have experience with technologies such as React, Node.js, Express, and MongoDB, 
              and I continuously strive to learn new skills to stay at the forefront of the industry.
            </p>
            <div style={{ fontSize: '16px', color: '#495057' }}>
              <p><strong>Birthday:</strong> December 31, 2002</p>
              <p><strong>City:</strong> Thimphu, Bhutan</p>
              <p><strong>Degree:</strong> B.Tech Computer Science</p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '20px', fontSize: '18px', color: '#6c757d' }}>
          <p>
            My journey in web development has been fueled by curiosity and a love for technology. 
            I take pride in writing clean, maintainable code and collaborating with teams to deliver impactful projects. 
            When I'm not coding, I enjoy exploring new technologies, reading, and contributing to open-source projects.
          </p>
        </div>
        {/* Hobby Section */}
        <div className="mt-5 d-flex">
          <div className="mx-3">
            <FaMusic size={30} style={{ color: '#6c757d' }} />
            <p style={{ fontSize: '16px', color: '#495057', marginTop: '10px' }}>Music</p>
          </div>
          <div className="mx-3">
            <FaFilm size={30} style={{ color: '#6c757d' }} />
            <p style={{ fontSize: '16px', color: '#495057', marginTop: '10px' }}>Movies</p>
          </div>
          <div className="mx-3">
            <FaFutbol size={30} style={{ color: '#6c757d' }} />
            <p style={{ fontSize: '16px', color: '#495057', marginTop: '10px' }}>Sports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
