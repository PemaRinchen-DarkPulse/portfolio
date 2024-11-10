import React from 'react';
import './resume.css'; // Import external CSS file

const Resume = () => {
  return (
    <section id="resume" className="resume section">

      <div className="container section-title" data-aos="fade-up">
        <h2>Resume</h2>
        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem.</p>
      </div>

      <div className="container">

        <div className="row">

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Summary</h3>

            <div className="resume-item pb-0">
              <h4>Brandon Johnson</h4>
              <p><em>Innovative and deadline-driven Graphic Designer with 3+ years of experience.</em></p>
              <ul>
                <li>Portland par 127,Orlando, FL</li>
                <li>(123) 456-7891</li>
                <li>alice.barkley@example.com</li>
              </ul>
            </div>

            <h3 className="resume-title">Education</h3>
            <div className="resume-item">
              <h4>Diploma In Bhuatn Bacculaurate</h4>
              <h5>2016 - 2021</h5>
              <p><em>The Royal Academy, Pangbisa, Paro, Bhutan</em></p>
              <p>Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit.</p>
            </div>

            <div className="resume-item">
              <h4>Bachelor of Tech Computer Science & Engineering</h4>
              <h5>2022 - 2026</h5>
              <p><em>Symbiosis Institute Of Technology</em></p>
              <p>Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis.</p>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <h3 className="resume-title">Professional Experience</h3>
            <div className="resume-item">
              <h4>Senior Graphic Design Specialist</h4>
              <h5>2019 - Present</h5>
              <p><em>Experion, New York, NY </em></p>
              <ul>
                <li>Lead in the design, development, and implementation of communication materials</li>
                <li>Delegate tasks to the 7 members of the design team</li>
                <li>Supervise the assessment of all graphic materials</li>
                <li>Oversee the efficient use of production project budgets ranging from $2,000 - $25,000</li>
              </ul>
            </div>

            <div className="resume-item">
              <h4>Graphic Design Specialist</h4>
              <h5>2017 - 2018</h5>
              <p><em>Stepping Stone Advertising, New York, NY</em></p>
              <ul>
                <li>Developed numerous marketing programs (logos, brochures, infographics)</li>
                <li>Managed up to 5 projects at a given time</li>
                <li>Consulted with clients on graphic design choices</li>
                <li>Created 4+ design presentations and proposals for clients</li>
              </ul>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Resume;
