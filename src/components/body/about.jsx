import React from 'react';
import Profile from '../../assets/images/picture.png'
const About = () => {
  return (
    <section id="about" className="about section">

      <div className="container section-title" data-aos="fade-up">
        <h2>About</h2>
        <p>With great dedication and skill, I approach every task with a commitment to excellence and problem-solving. I am driven by a strong sense of responsibility and a focus on creating solutions that are both effective and user-centered. Nothing stands in my way when it comes to delivering quality work and overcoming challenges, making sure every project benefits from a thorough and professional approach.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-4">
            <img src={Profile} className="img-fluid rounded-3 mt-3" alt="Profile image of the developer"/>
          </div>
          <div className="col-lg-8 content">
            <h2>Full Stack Web Developer.</h2>
            <p className="fst-italic py-3">
            A passionate and dedicated Full Stack Web Developer, skilled in creating dynamic, responsive, and user-centered applications. With a strong foundation in both front-end and back-end technologies, they excel in developing seamless experiences tailored to meet client needs. Their commitment to continual learning and exploring the latest in web technologies drives them to deliver innovative and efficient solutions, whether building a website from scratch or enhancing an existing application.            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>31 Dec 2002</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.example.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+91 9699881639</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Thimphu , Bhutan</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>21</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Bachuler in Technology</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>email@example.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>Available</span></li>
                </ul>
              </div>
            </div>
            <p className="py-3">
            I balance my academic commitments with freelance projects, gaining real-world experience while helping clients bring their visions to life. I aim to make meaningful contributions to each project, whether through individual efforts or team collaboration, and I look forward to expanding my skills further as I progress through my studies.            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

export default About;
