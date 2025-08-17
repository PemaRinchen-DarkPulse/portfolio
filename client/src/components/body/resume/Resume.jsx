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
              <p style={{fontSize: '0.9rem', color: '#ccc'}}>Coursework: Computer Architecture, Comparison of Learning Algorithms, Computational Theory</p>
            </div>
            <div style={styles.educationEntry}>
              <p><strong style={{color: '#ffc107'}}>Aug 2022 – July 2026</strong></p>
              <p>Symbiosis Institute of Technology</p>
              <p>B.Tech Computer Science and Technology</p>
              <p style={{fontSize: '0.9rem', color: '#ccc'}}>Coursework: Computer Architecture, Comparison of Learning Algorithms, Computational Theory</p>
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
                    C, C++, Java
                  </span>
                </li>
                <li style={{...styles.skillsListItem}}>
                  <span style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                    Python, JavaScript
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
                    React.js, Node.js
                  </span>
                </li>
                <li style={{...styles.skillsListItem}}>
                  <span style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                    Express.js, SpringBoot
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
                    Git, GitHub
                  </span>
                </li>
                <li style={{...styles.skillsListItem}}>
                  <span style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                    Vercel, Postman
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
              data science applications. Skilled in building scalable, user-centric platforms using the MERN stack and applying 
              machine learning models for real-world problem-solving. Developed and tested projects including an 
              AI-powered telehealth system, an alumni networking platform, and a ride-hailing demand forecasting 
              model. Strong foundation in programming, algorithms, and system design, with proven ability to translate ideas 
              into functional solutions. Eager to contribute to dynamic teams and grow through impactful software development 
              challenges.
            </p>
          </div>

          <div style={styles.sectionGroup}>
            <h5 style={styles.sectionTitleRight}>Work Experience</h5>
            <hr style={styles.sectionDividerRight} />
            <div style={styles.projectEntry}>
              <h6 style={styles.projectTitle}>Full Stack & Data Science Developer</h6>
              <p style={styles.projectRole}><em>Self-Initiated Projects | Remote | Jun 2023 – Present</em></p>
              <ul style={styles.projectDetails}>
                <li style={styles.projectDetailsItem}>Built AiMediCare, an AI-powered telehealth system tested with 1,000+ patient health records, 500+ prescriptions, and 200+ pharmacy operations, improving efficiency in digital healthcare workflows.</li>
                <li style={styles.projectDetailsItem}>Designed and tested an Alumni Network platform for The Royal Academy, connecting 500+ alumni with mentorship, collaboration, and event participation features.</li>
                <li style={styles.projectDetailsItem}>Developed a Ride-Hailing demand forecasting model by analyzing 100,000+ ride requests, achieving 82% prediction accuracy and proposing strategies to cut cancellations by 15%.</li>
                <li style={styles.projectDetailsItem}>Applied MERN stack, Python (ML), and data visualization libraries to deliver scalable, real-world solutions.</li>
                <li style={styles.projectDetailsItem}>Collaborated via GitHub for version control, implemented JWT authentication, and deployed prototypes on cloud platforms.</li>
              </ul>
            </div>
          </div>

          <div style={styles.sectionGroup}>
            <h5 style={styles.sectionTitleRight}>Projects</h5>
            <hr style={styles.sectionDividerRight} />
            <div style={styles.projectEntry}>
              <h6 style={styles.projectTitle}>AiMediCare – AI-Powered Telehealth System (In Progress)</h6>
              <p style={styles.projectRole}><em>github/Ai-Medicare</em></p>
              <ul style={styles.projectDetails}>
                <li style={styles.projectDetailsItem}>Built a healthcare platform for patients, doctors, and pharmacies, enabling digital healthcare support.</li>
                <li style={styles.projectDetailsItem}>Tested patient features for 50+ symptoms analysis, appointment scheduling, and storage of 1,000+ health records.</li>
                <li style={styles.projectDetailsItem}>Verified doctor workflows by digitally managing 500+ prescriptions and reviewing patient history securely.</li>
                <li style={styles.projectDetailsItem}>Simulated pharmacy operations for 200+ daily prescriptions with automated verification and inventory checks.</li>
                <li style={styles.projectDetailsItem}>Planned ML integration targeting 85% accuracy in preliminary health recommendations.</li>
                <li style={styles.projectDetailsItem}><strong>Tools:</strong> MongoDB, Express.js, React.js, Node.js, Python (ML), JWT Authentication, Git/GitHub</li>
              </ul>
            </div>

            <div style={styles.projectEntry}>
              <h6 style={styles.projectTitle}>Alumni Network – The Royal Academy (In Progress)</h6>
              <p style={styles.projectRole}><em>github/Alumni-Network</em></p>
              <ul style={styles.projectDetails}>
                <li style={styles.projectDetailsItem}>Developed a platform connecting 500+ alumni for mentorship, collaboration, and events.</li>
                <li style={styles.projectDetailsItem}>Tested mentorship features enabling 100+ students to connect with alumni for career guidance.</li>
                <li style={styles.projectDetailsItem}>Collected 200+ teacher tributes showcasing alumni appreciation and engagement.</li>
                <li style={styles.projectDetailsItem}>Simulated collaboration features allowing alumni to initiate/join 50+ projects across domains.</li>
                <li style={styles.projectDetailsItem}>Tested event system for alumni to register for 20+ school events annually, improving participation.</li>
                <li style={styles.projectDetailsItem}><strong>Tools:</strong> MongoDB, Express.js, React.js, Node.js, Python (ML), JWT Authentication, Git/GitHub</li>
              </ul>
            </div>

            <div style={styles.projectEntry}>
              <h6 style={styles.projectTitle}>Ride-Hailing – Data Science Project</h6>
              <p style={styles.projectRole}><em>2025</em></p>
              <ul style={styles.projectDetails}>
                <li style={styles.projectDetailsItem}>Analyzed 100,000+ ride requests to identify demand patterns across time, location, and weather conditions.</li>
                <li style={styles.projectDetailsItem}>Cleaned and preprocessed dataset by handling 20%+ missing values and reducing noise for accurate predictions.</li>
                <li style={styles.projectDetailsItem}>Trained machine learning models (Linear Regression, Random Forest) achieving 82% accuracy in demand forecasting.</li>
                <li style={styles.projectDetailsItem}>Visualized peak hours, cancellation trends, and driver allocation efficiency using Matplotlib & Seaborn.</li>
                <li style={styles.projectDetailsItem}>Proposed optimization strategy to reduce ride cancellations by 15% through better supply-demand matching.</li>
                <li style={styles.projectDetailsItem}><strong>Tools:</strong> Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Google Colab</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
