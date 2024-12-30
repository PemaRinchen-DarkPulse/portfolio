import React from "react";

const ProjectCard = () => {
  return (
      <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-3">Card title</h5>
        <p class="card-text text-muted">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>

        <div className="mb-3">
          <h5>Technologies used:</h5>
          <div>
          <span className="bg-dark text-white p-1 rounded-3 me-2">React</span>
          <span className="bg-dark text-white p-1 rounded-3 me-2">React</span>
          <span className="bg-dark text-white p-1 rounded-3 me-2">React</span>
          </div>
        </div>
        <div>
        <a href="#" class="card-link">
          GitHub
        </a>
        <a href="#" class="card-link">
          Live Demo
        </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
