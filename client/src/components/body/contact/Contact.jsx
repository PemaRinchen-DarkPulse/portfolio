import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import SharedHero from '../../shared/SharedHero';
import { sendContactMessage } from '../../../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Styles object for responsive design
  const styles = {
    contactContainer: {
      padding: '2rem 0',
    },
    contactContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    contactSections: {
      display: 'flex',
      gap: '2rem',
      marginBottom: '2rem',
    },
    contactInfoSection: {
      flex: 1,
      backgroundColor: '#212529',
      color: 'white',
      borderRadius: '0.5rem',
      padding: '2rem',
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      minHeight: '500px',
    },
    contactFormSection: {
      flex: 1,
      backgroundColor: '#6c757d',
      color: 'white',
      borderRadius: '0.5rem',
      padding: '2rem',
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    },
    contactInfoTitle: {
      fontSize: '1.75rem',
      marginBottom: '1.5rem',
      fontWeight: 600,
    },
    contactInfoItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.5rem',
    },
    contactInfoIcon: {
      marginRight: '1rem',
      color: '#dc3545',
      flexShrink: 0,
    },
    contactInfoDetails: {
      color: 'white',
    },
    contactInfoDetailsH6: {
      marginBottom: '0.25rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    contactInfoDetailsP: {
      marginBottom: 0,
      color: 'white',
      textDecoration: 'none',
    },
    contactInfoDetailsA: {
      marginBottom: 0,
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    socialSection: {
      marginTop: '2rem',
    },
    socialSectionH6: {
      marginBottom: '1rem',
      fontSize: '1rem',
      fontWeight: 600,
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem',
    },
    socialLinkA: {
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    contactFormTitle: {
      fontSize: '1.75rem',
      marginBottom: '1.5rem',
      fontWeight: 600,
      color: 'white',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    formLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 500,
      color: 'white',
    },
    formControl: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ced4da',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      lineHeight: 1.5,
      backgroundColor: 'white',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    },
    btnSubmit: {
      backgroundColor: '#0d6efd',
      border: '1px solid #0d6efd',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.15s ease-in-out',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    alert: {
      padding: '0.75rem 1rem',
      marginBottom: '1rem',
      border: '1px solid transparent',
      borderRadius: '0.375rem',
      position: 'relative',
    },
    alertSuccess: {
      color: '#0f5132',
      backgroundColor: '#d1e7dd',
      borderColor: '#badbcc',
    },
    alertDanger: {
      color: '#842029',
      backgroundColor: '#f8d7da',
      borderColor: '#f5c2c7',
    },
    alertClose: {
      position: 'absolute',
      top: '0.5rem',
      right: '0.5rem',
      background: 'none',
      border: 'none',
      fontSize: '1.25rem',
      cursor: 'pointer',
      opacity: 0.5,
    },
    mapSection: {
      marginTop: '2rem',
    },
    mapTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      fontWeight: 600,
      color: '#212529',
    },
    mapContainer: {
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    },
    mapIframe: {
      width: '100%',
      height: '400px',
      border: 0,
      borderRadius: '0.5rem',
    },
  };

  // Media query hook for responsive design
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply mobile styles
  const mobileStyles = {
    contactContent: {
      ...styles.contactContent,
      padding: isMobile ? '0 0.5rem' : '0 1rem',
    },
    contactSections: {
      ...styles.contactSections,
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    contactInfoSection: {
      ...styles.contactInfoSection,
      minHeight: isMobile ? 'auto' : '500px',
      padding: isMobile ? '1.5rem' : '2rem',
    },
    contactFormSection: {
      ...styles.contactFormSection,
      padding: isMobile ? '1.5rem' : '2rem',
    },
    contactInfoItem: {
      ...styles.contactInfoItem,
      marginBottom: isMobile ? '1rem' : '1.5rem',
    },
    socialSection: {
      ...styles.socialSection,
      marginTop: isMobile ? '1.5rem' : '2rem',
    },
    socialLinks: {
      ...styles.socialLinks,
      gap: isMobile ? '0.75rem' : '1rem',
    },
    formGroup: {
      ...styles.formGroup,
      marginBottom: isMobile ? '1rem' : '1.5rem',
    },
    mapIframe: {
      ...styles.mapIframe,
      height: isMobile ? '300px' : '400px',
    },
    contactInfoTitle: {
      ...styles.contactInfoTitle,
      fontSize: isMobile ? '1.5rem' : '1.75rem',
      marginBottom: isMobile ? '1rem' : '1.5rem',
    },
    contactFormTitle: {
      ...styles.contactFormTitle,
      fontSize: isMobile ? '1.5rem' : '1.75rem',
      marginBottom: isMobile ? '1rem' : '1.5rem',
    },
    mapTitle: {
      ...styles.mapTitle,
      fontSize: isMobile ? '1.25rem' : '1.5rem',
    },
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all fields');
      }

      await sendContactMessage(formData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <SharedHero 
        title="Get In <span class='highlight'>Touch</span>"
        subtitle="Let's connect and discuss opportunities"
      />
      
      <div style={mobileStyles.contactContainer || styles.contactContainer}>
        <div style={mobileStyles.contactContent}>
          <div style={mobileStyles.contactSections}>
            {/* Contact Info Section (Black - Left on desktop, First on mobile) */}
            <div style={mobileStyles.contactInfoSection}>
              <h3 style={mobileStyles.contactInfoTitle}>Get in Touch</h3>
              
              <div style={mobileStyles.contactInfoItem}>
                <FaMapMarkerAlt style={styles.contactInfoIcon} size={20} />
                <div style={styles.contactInfoDetails}>
                  <h6 style={styles.contactInfoDetailsH6}>ADDRESS</h6>
                  <p style={styles.contactInfoDetailsP}>SIT Pune, Maharashtra, India.</p>
                </div>
              </div>
              
              <div style={mobileStyles.contactInfoItem}>
                <FaPhoneAlt style={styles.contactInfoIcon} size={20} />
                <div style={styles.contactInfoDetails}>
                  <h6 style={styles.contactInfoDetailsH6}>PHONE</h6>
                  <a 
                    href="tel:+919699881639" 
                    style={styles.contactInfoDetailsA}
                    onMouseEnter={(e) => e.target.style.color = '#dc3545'}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                  >
                    +91 969 988 1639
                  </a>
                </div>
              </div>
              
              <div style={mobileStyles.contactInfoItem}>
                <FaWhatsapp style={styles.contactInfoIcon} size={20} />
                <div style={styles.contactInfoDetails}>
                  <h6 style={styles.contactInfoDetailsH6}>WHATSAPP</h6>
                  <a
                    href="https://wa.me/+919699881639"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.contactInfoDetailsA}
                    onMouseEnter={(e) => e.target.style.color = '#dc3545'}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                  >
                    +91 969 988 1639
                  </a>
                </div>
              </div>
              
              <div style={mobileStyles.contactInfoItem}>
                <FaEnvelope style={styles.contactInfoIcon} size={20} />
                <div style={styles.contactInfoDetails}>
                  <h6 style={styles.contactInfoDetailsH6}>EMAIL</h6>
                  <a 
                    href="mailto:pemarinchen675@gmail.com"
                    style={styles.contactInfoDetailsA}
                    onMouseEnter={(e) => e.target.style.color = '#dc3545'}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                  >
                    pemarinchen675@gmail.com
                  </a>
                </div>
              </div>

              <div style={mobileStyles.socialSection}>
                <h6 style={styles.socialSectionH6}>FOLLOW ME</h6>
                <div style={mobileStyles.socialLinks}>
                  <a
                    href="https://www.instagram.com/blazepknight/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.socialLinkA}
                    onMouseEnter={(e) => e.target.style.color = '#dc3545'}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://www.facebook.com/BlazePknight"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.socialLinkA}
                    onMouseEnter={(e) => e.target.style.color = '#dc3545'}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                  >
                    <FaFacebookF size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pema-rinchen-305558264/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.socialLinkA}
                    onMouseEnter={(e) => e.target.style.color = '#dc3545'}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                  >
                    <FaLinkedinIn size={24} />
                  </a>
                  <a
                    href="https://github.com/PemaRinchen-DarkPulse"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.socialLinkA}
                    onMouseEnter={(e) => e.target.style.color = '#dc3545'}
                    onMouseLeave={(e) => e.target.style.color = 'white'}
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Section (Grey - Right on desktop, Second on mobile) */}
            <div style={mobileStyles.contactFormSection}>
              <h3 style={mobileStyles.contactFormTitle}>Send a Message</h3>
              
              {/* Status Message */}
              {submitStatus.message && (
                <div style={{
                  ...styles.alert,
                  ...(submitStatus.type === 'success' ? styles.alertSuccess : styles.alertDanger)
                }}>
                  {submitStatus.message}
                  <button 
                    type="button" 
                    style={{
                      ...styles.alertClose,
                      ':hover': { opacity: 1 }
                    }}
                    onClick={() => setSubmitStatus({ type: '', message: '' })}
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0.5'}
                  >
                    ×
                  </button>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div style={mobileStyles.formGroup}>
                  <label htmlFor="name" style={styles.formLabel}>
                    Name
                  </label>
                  <input
                    type="text"
                    style={{
                      ...styles.formControl,
                      ':focus': {
                        borderColor: '#86b7fe',
                        outline: 0,
                        boxShadow: '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
                      }
                    }}
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div style={mobileStyles.formGroup}>
                  <label htmlFor="email" style={styles.formLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    style={styles.formControl}
                    id="email"
                    placeholder="johndoe@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div style={mobileStyles.formGroup}>
                  <label htmlFor="message" style={styles.formLabel}>
                    Message
                  </label>
                  <textarea
                    style={styles.formControl}
                    id="message"
                    rows="4"
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  style={{
                    ...styles.btnSubmit,
                    opacity: isSubmitting ? 0.65 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    ':hover': !isSubmitting ? {
                      backgroundColor: '#0b5ed7',
                      borderColor: '#0a58ca'
                    } : {}
                  }}
                  disabled={isSubmitting}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = '#0b5ed7';
                      e.target.style.borderColor = '#0a58ca';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = '#0d6efd';
                      e.target.style.borderColor = '#0d6efd';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <span className="button-loading">Sending Message...</span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section (Below on both desktop and mobile, Third on mobile) */}
          <div style={styles.mapSection}>
            <h4 style={mobileStyles.mapTitle}>Location</h4>
            <div style={styles.mapContainer}>
              <iframe
                style={mobileStyles.mapIframe}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5158362493565!2d73.7252788!3d18.5413032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bc3e3d28683b%3A0x64a3e9ef22f676a0!2sSymbiosis%20Institute%20of%20Technology%20%7C%20SIT%20Pune!5e0!3m2!1sen!2sin!4v1690136815452!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
