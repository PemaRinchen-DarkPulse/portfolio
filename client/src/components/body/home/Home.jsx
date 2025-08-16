import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import Image from "../../../assets/images/home.jpg";

const Home = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const roles = [
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
  ];

  useEffect(() => {
    const typeInterval = setInterval(() => {
      setText((prevText) => {
        const nextText = roles[index].slice(0, prevText.length + 1);
        if (nextText === roles[index]) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % roles.length);
            setText("");
          }, 2000);
        }
        return nextText;
      });
    }, 150);

    return () => clearInterval(typeInterval);
  }, [index]);
  return (
    <div className="container my-5 d-flex flex-column justify-content-center" style={{ minHeight: "80vh" }}>
      {/* Main section with image and title */}
      <div className="row align-items-center mb-5 profile-main-section">
        <div
          className="col-6 ms-5 me-3 profile-image-col"
          style={{ height: "300px", width: "auto" }}
        >
          <img
            src={Image}
            alt="Profile"
            className="col-6 rounded-circle border shadow profile-image"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-6 profile-content-col">
          <h1 className="fw-bold text-dark">Pema Rinchen</h1>
          <h3 className="mb-4 text-muted">
            I am a <span className="typed-text text-primary">{text}</span>
          </h3>
          <div className="profile-buttons">
            <a
              href="https://drive.google.com/uc?export=download&id=1P_C1hugvfsPtz_zucAI057pK3ruztsLh"
              className="btn btn-primary me-3 px-4 py-2 shadow-sm"
              target="_self"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
            <a
              href="/contact"
              className="btn btn-outline-primary px-4 py-2 shadow-sm"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* About section with paragraph and social links */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-10 profile-summary-section">
          <h5>Summary:</h5>
          <p className="lead mb-4 text-muted">
            Passionate about creating elegant solutions to complex problems.
            Experienced in building responsive web applications using modern
            technologies.
          </p>
          <div className="social-links mb-4">
            <h5>Social Links:</h5>
            <div className="social-icons">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark me-4"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary me-4"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-info me-4"
              >
                <FaTwitter size={28} />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-danger me-4"
              >
                <FaEnvelope size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Media Queries for Mobile Responsiveness Only */}
      <style jsx>{`
        /* Mobile styles only - Desktop remains unchanged */
        @media (max-width: 767px) {
          .profile-main-section {
            flex-direction: column !important;
            text-align: center !important;
          }
          
          .profile-image-col {
            margin: 0 auto 30px auto !important;
            width: 250px !important;
            height: 250px !important;
            flex: none !important;
          }
          
          .profile-image {
            width: 250px !important;
            height: 250px !important;
            border-radius: 50% !important;
            object-fit: cover !important;
            display: block !important;
            margin: 0 auto !important;
          }
          
          .profile-content-col {
            text-align: center !important;
            flex: none !important;
            width: 100% !important;
          }
          
          .profile-buttons {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 15px !important;
          }
          
          .profile-buttons .btn {
            width: 200px !important;
            margin: 0 !important;
          }
          
          .profile-summary-section {
            text-align: center !important;
          }
          
          .social-icons {
            display: flex !important;
            justify-content: center !important;
            gap: 20px !important;
          }
          
          .social-icons a {
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
