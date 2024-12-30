import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  return (
    <div className="container my-4" style={{marginRight:'60px'}}>
      <h3 className="ms-2 mb-4">My Projects</h3>
      <div className="row">
        <div className="col-md-6">
          <ProjectCard />
        </div>
        <div className="col-md-6">
          <ProjectCard />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <ProjectCard />
        </div>
        <div className="col-md-6">
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
