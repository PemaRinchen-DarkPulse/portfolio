import React from 'react';

const Resume = () => {
  // Styles object containing all CSS
  const styles = {
    resumeContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    resumeHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '0 10px',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '15px',
        marginBottom: '20px'
      }
    },
    resumeTitle: {
      color: '#343a40',
      fontWeight: 'bold',
      fontSize: window.innerWidth <= 480 ? '1.6rem' : window.innerWidth <= 768 ? '1.8rem' : window.innerWidth <= 992 ? '2rem' : '2.5rem',
      margin: '0'
    },
    downloadBtn: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: window.innerWidth <= 992 ? '10px 20px' : '12px 24px',
      textDecoration: 'none',
      borderRadius: '5px',
      fontWeight: '500',
      fontSize: window.innerWidth <= 992 ? '0.9rem' : '1rem',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      display: window.innerWidth > 1200 ? 'inline-block' : 'none'
    },
    resumeContent: {
      display: 'flex',
      flexDirection: window.innerWidth <= 750 ? 'column' : 'row',
      gap: '0',
      minHeight: window.innerWidth <= 750 ? 'auto' : '600px',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    resumeLeftSection: {
      flex: window.innerWidth <= 750 ? 'none' : '0 0 40%',
      width: window.innerWidth <= 750 ? '100%' : 'auto',
      backgroundColor: '#212529',
      color: 'white',
      padding: window.innerWidth <= 480 ? '20px 15px' : window.innerWidth <= 750 ? '25px 20px' : window.innerWidth <= 992 ? '30px 25px' : '40px 30px',
      minHeight: window.innerWidth <= 750 ? 'auto' : '600px',
      order: window.innerWidth <= 750 ? '2' : 'initial'
    },
    resumeRightSection: {
      flex: window.innerWidth <= 750 ? 'none' : '0 0 60%',
      width: window.innerWidth <= 750 ? '100%' : 'auto',
      backgroundColor: 'white',
      color: '#343a40',
      padding: window.innerWidth <= 480 ? '20px 15px' : window.innerWidth <= 750 ? '25px 20px' : window.innerWidth <= 992 ? '30px 25px' : '40px 30px',
      minHeight: window.innerWidth <= 750 ? 'auto' : '600px',
      order: window.innerWidth <= 750 ? '1' : 'initial'
    },
    sectionGroup: {
      marginBottom: window.innerWidth <= 480 ? '15px' : window.innerWidth <= 750 ? '20px' : window.innerWidth <= 768 ? '30px' : '40px'
    },
    sectionTitle: {
      textTransform: 'uppercase',
      fontSize: window.innerWidth <= 480 ? '1rem' : window.innerWidth <= 768 ? '1.1rem' : '1.2rem',
      fontWeight: 'bold',
      marginBottom: '15px',
      letterSpacing: '1px',
      color: 'white'
    },
    sectionTitleRight: {
      textTransform: 'uppercase',
      fontSize: window.innerWidth <= 480 ? '1rem' : window.innerWidth <= 768 ? '1.1rem' : '1.2rem',
      fontWeight: 'bold',
      marginBottom: '15px',
      letterSpacing: '1px',
      color: '#343a40'
    },
    sectionDivider: {
      border: 'none',
      height: '2px',
      backgroundColor: 'white',
      marginBottom: '20px',
      width: '100%'
    },
    sectionDividerRight: {
      border: 'none',
      height: '2px',
      backgroundColor: '#6c757d',
      marginBottom: '20px',
      width: '100%'
    },
    educationEntry: {
      marginBottom: '25px',
      lineHeight: '1.6'
    },
    skillsList: {
      listStyle: 'none',
      padding: '0',
      lineHeight: '1.8'
    },
    skillsListItem: {
      marginBottom: '8px',
      position: 'relative',
      paddingLeft: '20px'
    },
    profileText: {
      lineHeight: '1.7',
      fontSize: window.innerWidth <= 768 ? '0.95rem' : '1rem',
      color: '#555'
    },
    projectEntry: {
      marginBottom: '30px'
    },
    projectTitle: {
      fontWeight: 'bold',
      color: '#343a40',
      marginBottom: '5px',
      fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem'
    },
    projectRole: {
      color: '#6c757d',
      fontStyle: 'italic',
      marginBottom: '10px'
    },
    projectDetails: {
      paddingLeft: '20px',
      lineHeight: '1.6'
    },
    projectDetailsItem: {
      marginBottom: '8px',
      color: '#555'
    }
  };

  return (
    <div style={styles.resumeContainer}>
      <div style={styles.resumeHeader}>
        <h1 style={styles.resumeTitle}>Resume</h1>
        <a
          href="https://drive.google.com/uc?export=download&id=1m_0xsO07A8nJGL31j2F1-XE-cbH1vNm1"
          style={styles.downloadBtn}
          target="_self"
          rel="noopener noreferrer"
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Download Resume
        </a>
      </div>

      <div style={styles.resumeContent}>
        {/* Left Black Section */}
        <div style={styles.resumeLeftSection}>
          <div style={styles.sectionGroup}>
            <h5 style={styles.sectionTitle}>Education</h5>
            <hr style={styles.sectionDivider} />
            <div style={styles.educationEntry}>
              <p><strong style={{color: '#ffc107'}}>Mar 2016 – Mar 2022</strong></p>
              <p>The Royal Academy</p>
              <p>Diploma in Bhutan Baccalaureate</p>
              <p style={{fontSize: '0.9rem', color: '#ccc'}}>Coursework: Science Stream (Focus on Chemistry,Physic and math), elective in Space and Technology.</p>
            </div>
            <div style={styles.educationEntry}>
              <p><strong style={{color: '#ffc107'}}>Aug 2022 – July 2026</strong></p>
              <p>Symbiosis Institute of Technology</p>
              <p>B.Tech Computer Science and Technology</p>
              <p style={{fontSize: '0.9rem', color: '#ccc'}}>Coursework: Data Science, MERN Stack Development, Spring Boot, Agile Methodologies, Machine Learning, Data Structures & Algorithms, Database Management Systems (MySQL)</p>
            </div>
          </div>

          <div style={styles.sectionGroup}>
            <h5 style={styles.sectionTitle}>Skills</h5>
            <hr style={styles.sectionDivider} />
            <div style={{marginBottom: '20px'}}>
              <p><strong style={{color: '#ffc107'}}>Programming Languages:</strong></p>
              <ul style={styles.skillsList}>
                <li style={{...styles.skillsListItem}}>
                  <span style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                    C, C++, Java, Python, JavaScript
                  </span>
                </li>
              </ul>
            </div>
            <div style={{marginBottom: '20px'}}>
              <p><strong style={{color: '#ffc107'}}>Frameworks & Libraries:</strong></p>
              <ul style={styles.skillsList}>
                <li style={{...styles.skillsListItem}}>
                  <span style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                    React.js, Node.js, Express.js , SpringBoot
                  </span>
                </li>
              </ul>
            </div>
            <div style={{marginBottom: '20px'}}>
              <p><strong style={{color: '#ffc107'}}>Databases:</strong></p>
              <ul style={styles.skillsList}>
                <li style={{...styles.skillsListItem}}>
                  <span style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                    MongoDB, MySQL
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p><strong style={{color: '#ffc107'}}>Tools & Platforms:</strong></p>
              <ul style={styles.skillsList}>
                <li style={{...styles.skillsListItem}}>
                  <span style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                    Git, GitHub, Vercel, Postman
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right White Section */}
        <div style={styles.resumeRightSection}>
          <div style={styles.sectionGroup}>
            <h5 style={styles.sectionTitleRight}>Professional Summary</h5>
            <hr style={styles.sectionDividerRight} />
            <p style={styles.profileText}>
              Motivated and detail-oriented Computer Science student with hands-on experience in full-stack development and
              Data Science. Skilled in building scalable and user-centric platforms using MERN stack and Java (Spring Boot)
              and machine learning models. Strong foundation in programming and system design with proven ability to
              translate ideas into functional solutions. Eager to contribute to dynamic teams and grow through challenges
            </p>
          </div>

          <div style={styles.sectionGroup}>
            <h5 style={styles.sectionTitleRight}>Projects</h5>
            <hr style={styles.sectionDividerRight} />
            <div style={styles.projectEntry}>
              <h6 style={styles.projectTitle}>Ai Medicare – AI-Powered Telehealth System (In Progress)</h6>
              <p style={styles.projectRole}><em>GitHub/Ai-Medicare</em></p>
              <ul style={styles.projectDetails}>
                <li style={styles.projectDetailsItem}>Designing and prototyping a telehealth platform that uses AIin order to conduct remote consultations, real-time symptom analysis, and triage patients.</li>
                <li style={styles.projectDetailsItem}>Integrated Natural Language Processing (NLP) to interpret patient health queries and present doctor-like initial answers.</li>
                <li style={styles.projectDetailsItem}>Developed a machine learning risk prediction model(logistic regression and random forest) to determine early indicators of chronic illnesses, and demonstrated increased diagnostic precision by 25 percent in test condition.</li>
                <li style={styles.projectDetailsItem}>Custom-developed backend services with Express.js web framework with an emphasis on role-based authentication (JWT/OAuth2), encrypted health records, and video consultation.</li>
                <li style={styles.projectDetailsItem}>Demonstrated at SIT Industry Conclave, where the system was presented to industry experts on the real-world healthcare applications.</li>
                <li style={styles.projectDetailsItem}><strong>Tools & Technologies:</strong> MongoDB, Express.js, React.js, Node.js, Python (ML), JWT Authentication, Git/GitHub</li>
              </ul>
            </div>

            <div style={styles.projectEntry}>
              <h6 style={styles.projectTitle}>Alumni Network – The Royal Academy (In Progress)</h6>
              <p style={styles.projectRole}><em>GitHub/Alumni-Network</em></p>
              <ul style={styles.projectDetails}>
                <li style={styles.projectDetailsItem}>Designed a community-based alumni software to enhance mentorship, professional networking, and event attendance activities between alumni, teachers, and students.</li>
                <li style={styles.projectDetailsItem}>Integrated a React.js front-end with a responsive design and backend APIs written in Express.js coupled with MongoDB that allowed it to scale for 1000+ users.</li>
                <li style={styles.projectDetailsItem}>Added a suggestion engine for networking (based on similarities in education and industry).</li>
                <li style={styles.projectDetailsItem}>To maximize data security and comply with regulations, authentication was deployed using JWT and bcrypt.</li>
                <li style={styles.projectDetailsItem}><strong>Tools & Technologies:</strong> MongoDB, Express.js, React.js, Node.js, Python (ML), JWT Authentication, Git/GitHub</li>
              </ul>
            </div>

            <div style={styles.projectEntry}>
              <h6 style={styles.projectTitle}>Ride-Hailing – Data Science Project 2025</h6>
              <ul style={styles.projectDetails}>
                <li style={styles.projectDetailsItem}>Used ride-hailing datasets to conduct end-to-end data analysis as a way to understand the supply-demand balance, customer retention, and driver efficiency.</li>
                <li style={styles.projectDetailsItem}>Conducted data preparation, feature engineering, clustering (K-Means), correlation analysis, and predictive modeling (time-series, regression) to forecast demand.</li>
                <li style={styles.projectDetailsItem}>Developed Power BI dashboards to visualize ride frequency peak demand areas, trip duration, cancellations, and driver earnings.</li>
                <li style={styles.projectDetailsItem}>Optimized resource allocation plans, leading to a 15–20 percent improvement in demand forecast accuracy compared to baseline.</li>
                <li style={styles.projectDetailsItem}><strong>Tools & Technologies:</strong> Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Google Colab, Power BI</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
