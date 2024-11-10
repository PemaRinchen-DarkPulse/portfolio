import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

// Sample events data array
const events = [
  {
    id: 1,
    title: 'Alumni Network Project',
    subtitle: 'Project link',
    description: 'An Alumni Network connects graduates, fostering professional relationships, mentorship, and career growth.',
    imgSrc: 'https://picsum.photos/300/200?random=1',
    projectLink: "https://alumni-network-sx5d-ks15plisy-pema-rinchens-projects-fb20da05.vercel.app/"
  },
  {
    id: 2,
    title: 'Project 2',
    subtitle: 'Project 2 link',
    description: 'Some quick example text for Project 2.',
    imgSrc: 'https://picsum.photos/300/200?random=2',
    projectLink: "https://example.com/project2"
  },
  {
    id: 3,
    title: 'Project 3',
    subtitle: 'Project 3 link',
    description: 'Some quick example text for Project 3.',
    imgSrc: 'https://picsum.photos/300/200?random=3',
    projectLink: "https://example.com/project3"
  },
  {
    id: 4,
    title: 'Project 4',
    subtitle: 'Project 4 link',
    description: 'Some quick example text for Project 4.',
    imgSrc: 'https://picsum.photos/300/200?random=4',
    projectLink: "https://example.com/project4"
  },
];

const Projects = () => {
  return (
    <div className='row'>
      <h1>Projects</h1>
      <a href="">See All</a>
      {events.map((event) => (
        <div className="col-md-4" key={event.id}>
          <Card className='m-2 rounded-1'>
            <img className='rounded-top-2'
              alt="Sample"
              src={event.imgSrc}
            />
            <CardBody>
              <CardTitle tag="h5">
                {event.title}
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {/* Correct use of event.projectLink */}
                <a href={event.projectLink} target="_blank" rel="noopener noreferrer">
                  {event.subtitle}
                </a>
              </CardSubtitle>
              <CardText>
                {event.description}
              </CardText>
              <Button>
                View Details
              </Button>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Projects;
