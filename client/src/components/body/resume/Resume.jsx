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
      flexDirection: window.innerWidth <= 650 ? 'column' : 'row',
      gap: '0',
      minHeight: '600px',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    resumeLeftSection: {
      flex: window.innerWidth <= 650 ? 'none' : '0 0 40%',
      width: window.innerWidth <= 650 ? '100%' : 'auto',
      backgroundColor: '#212529',
      color: 'white',
      padding: window.innerWidth <= 480 ? '20px 15px' : window.innerWidth <= 650 ? '25px 20px' : window.innerWidth <= 992 ? '30px 25px' : '40px 30px',
      minHeight: '600px',
      order: window.innerWidth <= 650 ? '1' : 'initial'
    },
    resumeRightSection: {
      flex: window.innerWidth <= 650 ? 'none' : '0 0 60%',
      width: window.innerWidth <= 650 ? '100%' : 'auto',
      backgroundColor: 'white',
      color: '#343a40',
      padding: window.innerWidth <= 480 ? '20px 15px' : window.innerWidth <= 650 ? '25px 20px' : window.innerWidth <= 992 ? '30px 25px' : '40px 30px',
      minHeight: '600px',
      order: window.innerWidth <= 650 ? '2' : 'initial'
    },
    sectionGroup: {
      marginBottom: window.innerWidth <= 480 ? '25px' : window.innerWidth <= 768 ? '30px' : '40px'
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
          href="https://drive.google.com/uc?export=download&id=1P_C1hugvfsPtz_zucAI057pK3ruztsLh"
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
              <p><strong style={{color: '#ffc107'}}>2016 - 2021</strong></p>
              <p>The Royal Academy</p>
              <p>Diploma in Bhutan Baccalaureate</p>
            </div>
            <div style={styles.educationEntry}>
              <p><strong style={{color: '#ffc107'}}>2022 - 2026</strong></p>
              <p>Symbiosis Institute Of Technology</p>
              <p>B.Tech Computer Science</p>
            </div>
          </div>

          <div style={styles.sectionGroup}>
            <h5 style={styles.sectionTitle}>Skills</h5>
            <hr style={styles.sectionDivider} />
            <ul style={styles.skillsList}>
              <li style={{...styles.skillsListItem, '::before': {content: '"▸"', position: 'absolute', left: '0', color: '#ffc107', fontWeight: 'bold'}}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  Project Management
                </span>
              </li>
              <li style={{...styles.skillsListItem}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  Public Relations
                </span>
              </li>
              <li style={{...styles.skillsListItem}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  Teamwork
                </span>
              </li>
              <li style={{...styles.skillsListItem}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  Time Management
                </span>
              </li>
              <li style={{...styles.skillsListItem}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  Leadership
                </span>
              </li>
              <li style={{...styles.skillsListItem}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  Effective Communication
                </span>
              </li>
              <li style={{...styles.skillsListItem}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  Critical Thinking
                </span>
              </li>
            </ul>
          </div>

          <div style={styles.sectionGroup}>
            <h5 style={styles.sectionTitle}>Languages</h5>
            <hr style={styles.sectionDivider} />
            <ul style={styles.skillsList}>
              <li style={{...styles.skillsListItem}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  English (Fluent)
                </span>
              </li>
              <li style={{...styles.skillsListItem}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  French (Fluent)
                </span>
              </li>
              <li style={{...styles.skillsListItem}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  German (Basics)
                </span>
              </li>
              <li style={{...styles.skillsListItem}}>
                <span style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '-20px', color: '#ffc107', fontWeight: 'bold'}}>▸</span>
                  Spanish (Intermediate)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right White Section */}
        <div style={styles.resumeRightSection}>
          <div style={styles.sectionGroup}>
            <h5 style={styles.sectionTitleRight}>Profile</h5>
            <hr style={styles.sectionDividerRight} />
            <p style={styles.profileText}>
              Experienced and dedicated professional with a strong background in business management, marketing, and team leadership. Adept at executing strategies that boost company growth and improve operational efficiency.
            </p>
          </div>

          <div style={styles.sectionGroup}>
            <h5 style={styles.sectionTitleRight}>Projects</h5>
            <hr style={styles.sectionDividerRight} />
            <div style={styles.projectEntry}>
              <h6 style={styles.projectTitle}>E-commerce Website Redesign</h6>
              <p style={styles.projectRole}><em>Project Manager | 2029</em></p>
              <ul style={styles.projectDetails}>
                <li style={styles.projectDetailsItem}>Led a team to redesign the entire e-commerce platform, improving user experience and increasing conversions by 30%.</li>
                <li style={styles.projectDetailsItem}>Coordinated with designers, developers, and content creators to meet deadlines and deliver the project within budget.</li>
              </ul>
            </div>

            <div style={styles.projectEntry}>
              <h6 style={styles.projectTitle}>Market Expansion Strategy</h6>
              <p style={styles.projectRole}><em>Project Lead | 2028</em></p>
              <ul style={styles.projectDetails}>
                <li style={styles.projectDetailsItem}>Developed a market entry strategy for a new region, which resulted in a 25% market share within the first six months.</li>
                <li style={styles.projectDetailsItem}>Conducted market research and competitor analysis to tailor marketing efforts to local preferences.</li>
              </ul>
            </div>

            <div style={styles.projectEntry}>
              <h6 style={styles.projectTitle}>Branding Campaign for Startup</h6>
              <p style={styles.projectRole}><em>Project Manager | 2027</em></p>
              <ul style={styles.projectDetails}>
                <li style={styles.projectDetailsItem}>Managed a branding campaign for a new startup, focusing on social media marketing and content creation.</li>
                <li style={styles.projectDetailsItem}>Helped the startup increase its social media following by 50% in six months.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
