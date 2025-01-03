import React from "react";

const ProjectCard = () => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div style={{ padding: "24px" }}>
        {/* Project Title */}
        <h5 style={{ fontWeight: "bold", color: "#333", marginBottom: "16px" }}>
          Project Title
        </h5>

        {/* Project Description */}
        <p style={{ fontSize: "1rem", color: "#666", marginBottom: "24px" }}>
          This is a brief description of the project. It highlights the main
          features and functionality of the application.
        </p>

        {/* Technologies Section */}
        <div style={{ marginBottom: "24px" }}>
          <h6 style={{ fontWeight: "bold", color: "#444", marginBottom: "8px" }}>
            Technologies Used:
          </h6>
          <div>
            <span
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "16px",
                fontSize: "0.9rem",
                marginRight: "8px",
              }}
            >
              React
            </span>
            <span
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "16px",
                fontSize: "0.9rem",
                marginRight: "8px",
              }}
            >
              Node.js
            </span>
            <span
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "16px",
                fontSize: "0.9rem",
              }}
            >
              MongoDB
            </span>
          </div>
        </div>

        {/* Buttons Section */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <a
            href="#"
            style={{
              display: "inline-block",
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "bold",
              border: "2px solid #007bff",
              borderRadius: "8px",
              padding: "8px 16px",
              textAlign: "center",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#007bff";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#007bff";
            }}
          >
            GitHub
          </a>
          <a
            href="#"
            style={{
              display: "inline-block",
              textDecoration: "none",
              background: "linear-gradient(90deg, #007bff, #0056b3)",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              textAlign: "center",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
