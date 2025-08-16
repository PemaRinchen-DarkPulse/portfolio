import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin, FaHome, FaUser, FaFileAlt, FaImage, FaServer, FaEnvelope, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../auth/AuthContext';
import profileImage from '../../assets/images/profile.webp';

const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);
    const { isAuthenticated, logout } = useContext(AuthContext);
    const isActive = (path) => location.pathname === path;
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div
            className="position-fixed text-white d-flex flex-column justify-content-between sidebar-container"
            style={{ backgroundColor: '#040b14', minHeight: '100vh', boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' }}
        >
            <div>
                {/* Profile Section */}
                <div
                    className="rounded-circle mt-4 mx-auto d-flex align-items-center justify-content-center"
                    style={{ 
                        height: '120px', 
                        width: '120px', 
                        backgroundColor: 'white', 
                        overflow: 'hidden',
                        border: '3px solid #2c2f3f',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <img src={profileImage} alt="Profile" className="img-fluid w-100 h-100 object-fit-cover" />
                </div>
                
                <div className="text-center mt-3">
                    <h4 style={{ fontWeight: '600', letterSpacing: '1px' }}>Pema Rinchen</h4>
                    <ul className="d-flex justify-content-center mt-3" style={{ 
                        listStyle: 'none', 
                        padding: 0, 
                        margin: '0 auto',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        {[
                            { icon: <FaInstagram size={20} />, link: 'https://www.instagram.com/blazepknight/' },
                            { icon: <FaFacebook size={20} />, link: 'https://www.facebook.com/BlazePknight'  },
                            { icon: <FaLinkedin size={20} />, link: '#' },
                        ].map((social, index) => (
                            <li key={index} className="mx-2">
                                <a
                                    href={social.link}
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                        textDecoration: 'none',
                                        color: 'white',
                                        border: '1px solid white',
                                        backgroundColor: hovered === index ? '#1a2b3a' : 'transparent',
                                        transition: 'all 0.3s ease',
                                        transform: hovered === index ? 'translateY(-3px)' : 'translateY(0)',
                                        margin: '0 5px',
                                    }}
                                    onMouseEnter={() => setHovered(index)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {social.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Navigation Section */}
                <div className="mt-5">
                    <ul className="navbar-nav" style={{ padding: '0 10px' }}>
                        {[                            { icon: <FaHome />, label: 'Home', path: '/' },
                            { icon: <FaUser />, label: 'About', path: '/about' },
                            { icon: <FaFileAlt />, label: 'Resume', path: '/resume' },
                            { icon: <FaImage />, label: 'Portfolio', path: '/portfolio' },
                            { icon: <FaServer />, label: 'Project', path: '/projects' },
                            { icon: <FaEnvelope />, label: 'Contact', path: '/contact' },
                            ...(isAuthenticated 
                              ? [{ icon: <FaSignOutAlt />, label: 'Logout', path: '#', onClick: handleLogout }]
                              : []
                            ),
                        ].map((item, index) => (
                            <li key={index} className="nav-item d-flex align-items-center mb-2">
                                {item.onClick ? (
                                    <a 
                                        href="#" 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            item.onClick();
                                        }}
                                        className="d-flex align-items-center text-decoration-none w-100"
                                        style={{
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                            backgroundColor: 'transparent',
                                            color: '#b0b0b0',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            boxShadow: 'none',
                                        }}
                                    >
                                        <div className="me-3" style={{ color: 'inherit' }}>
                                            {item.icon}
                                        </div>
                                        <span style={{ color: 'inherit', fontWeight: '400', letterSpacing: '0.5px' }}>
                                            {item.label}
                                        </span>
                                    </a>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className="d-flex align-items-center text-decoration-none w-100"
                                        style={{
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                            backgroundColor: isActive(item.path) ? '#1a2b3a' : 'transparent',
                                            color: isActive(item.path) ? 'white' : '#b0b0b0',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            boxShadow: isActive(item.path) ? '0 0 8px rgba(26, 43, 58, 0.5)' : 'none',
                                        }}
                                    >
                                        <div className="me-3" style={{ color: 'inherit' }}>
                                            {item.icon}
                                        </div>
                                        <span style={{ color: 'inherit', fontWeight: isActive(item.path) ? '500' : '400', letterSpacing: '0.5px' }}>
                                            {item.label}
                                        </span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="text-center py-3" style={{ fontSize: '0.9rem' }}>
                <hr style={{ borderColor: '#2c2f3f', opacity: '0.5', margin: '0 20px 15px' }} />
                © 2025 Pema Rinchen
            </div>
        </div>
    );
};

export default SideBar;
