import React from 'react';

const Resume = () => {
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="ms-2" style={{ color: '#343a40', fontWeight: 'bold' }}>Resume</h1>
        <a
  href="https://drive.google.com/uc?export=download&id=1P_C1hugvfsPtz_zucAI057pK3ruztsLh"
  className="btn btn-primary me-3 px-4 py-2 shadow-sm"
  target="_self"
  rel="noopener noreferrer"
>
  Download Resume
</a>

      </div>

      <div className="row ms-2">
        <div className="col-4 bg-dark text-white p-4 rounded">
          <div className="mb-5">
            <h5 className="text-uppercase">Education</h5>
            <hr style={{ borderTop: '2px solid #ffffff' }} />
            <div className="education-entry mb-3">
              <p><strong>2016 - 2021</strong></p>
              <p>The Royal Academy</p>
              <p>Diploma in Bhutan Baccalaureate </p>
            </div>
            <div className="education-entry mb-3">
              <p><strong>2022 - 2026</strong></p>
              <p>Symbiosis Institute Of Technology</p>
              <p>B.Tech Computer Science</p>
              {/* <p><strong>GPA:</strong> 3.8 / 4.0</p> */}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-5">
            <h5 className="text-uppercase">Skills</h5>
            <hr style={{ borderTop: '2px solid #ffffff' }} />
            <ul>
              <li>Project Management</li>
              <li>Public Relations</li>
              <li>Teamwork</li>
              <li>Time Management</li>
              <li>Leadership</li>
              <li>Effective Communication</li>
              <li>Critical Thinking</li>
            </ul>
          </div>

          {/* Languages Section */}
          <div>
            <h5 className="text-uppercase">Languages</h5>
            <hr style={{ borderTop: '2px solid #ffffff' }} />
            <ul>
              <li>English (Fluent)</li>
              <li>French (Fluent)</li>
              <li>German (Basics)</li>
              <li>Spanish (Intermediate)</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-8 p-4 rounded">
          {/* Profile Section */}
          <div className="mb-4">
            <h5 className="text-uppercase">Profile</h5>
            <hr style={{ borderTop: '2px solid #6c757d' }} />
            <p>
              Experienced and dedicated professional with a strong background in business management, marketing, and team leadership. Adept at executing strategies that boost company growth and improve operational efficiency.
            </p>
          </div>

          {/* Projects Section */}
          <div className="mb-4">
            <h5 className="text-uppercase">Projects</h5>
            <hr style={{ borderTop: '2px solid #6c757d' }} />
            <div className="mb-3">
              <h6 className="font-weight-bold">E-commerce Website Redesign</h6>
              <p><em>Project Manager | 2029</em></p>
              <ul>
                <li>Led a team to redesign the entire e-commerce platform, improving user experience and increasing conversions by 30%.</li>
                <li>Coordinated with designers, developers, and content creators to meet deadlines and deliver the project within budget.</li>
              </ul>
            </div>

            <div className="mb-3">
              <h6 className="font-weight-bold">Market Expansion Strategy</h6>
              <p><em>Project Lead | 2028</em></p>
              <ul>
                <li>Developed a market entry strategy for a new region, which resulted in a 25% market share within the first six months.</li>
                <li>Conducted market research and competitor analysis to tailor marketing efforts to local preferences.</li>
              </ul>
            </div>

            <div>
              <h6 className="font-weight-bold">Branding Campaign for Startup</h6>
              <p><em>Project Manager | 2027</em></p>
              <ul>
                <li>Managed a branding campaign for a new startup, focusing on social media marketing and content creation.</li>
                <li>Helped the startup increase its social media following by 50% in six months.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
