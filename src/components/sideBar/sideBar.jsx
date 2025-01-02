import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin, FaHome, FaUser, FaFileAlt, FaImage, FaServer, FaEnvelope } from 'react-icons/fa';

const SideBar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="position-fixed text-white d-flex flex-column justify-content-between" style={{ backgroundColor: "#040b14", minHeight: "100vh" }}>
            <div>
                {/* Profile Section */}
                <div className="rounded-circle mt-4 align-self-center" style={{ height: "120px", width: "120px", backgroundColor: "white", overflow: "hidden" }}>
                    <img src="path_to_image.jpg" alt="Profile" className="img-fluid w-100 h-100 object-fit-cover" />
                </div>
                <div className="text-center mt-3">
                    <h4>Pema Rinchen</h4>
                    <ul className="d-flex justify-content-center mt-3" style={{ listStyle: "none", padding: 0 }}>
                        {[
                            { icon: <FaInstagram size={20} />, link: "#" },
                            { icon: <FaFacebook size={20} />, link: "#" },
                            { icon: <FaLinkedin size={20} />, link: "#" },
                        ].map((social, index) => (
                            <li key={index} className="mx-2">
                                <a
                                    href={social.link}
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        textDecoration: "none",
                                        color: "white",
                                        border: "1px solid white",
                                        transition: "background-color 0.3s, color 0.3s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "black";
                                        e.target.style.color = "white";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "transparent";
                                        e.target.style.color = "white";
                                    }}
                                >
                                    {social.icon}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Navigation Section */}
                <div className="mt-5">
                    <ul className="navbar-nav ms-3">
                        {[
                            { icon: <FaHome />, label: "Home", path: "/" },
                            { icon: <FaUser />, label: "About", path: "/about" },
                            { icon: <FaFileAlt />, label: "Resume", path: "/resume" },
                            { icon: <FaImage />, label: "Portfolio", path: "/portfolio" },
                            { icon: <FaServer />, label: "Project", path: "/projects" },
                            { icon: <FaEnvelope />, label: "Contact", path: "/contact" },
                        ].map((item, index) => (
                            <li key={index} className="nav-item d-flex align-items-center mb-2" style={{ cursor: "pointer" }}>
                                <Link
                                    to={item.path}
                                    className={`d-flex align-items-center text-decoration-none w-100 ${isActive(item.path) ? 'active' : ''}`}
                                    style={{
                                        padding: "10px 15px",
                                        borderRadius: "5px",
                                        transition: "color 0.3s, background-color 0.3s",
                                        backgroundColor: isActive(item.path) ? "black" : "transparent",
                                        color: isActive(item.path) ? "white" : "white",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive(item.path)) {
                                            e.target.style.backgroundColor = "black";
                                            e.target.style.color = "white";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive(item.path)) {
                                            e.target.style.backgroundColor = "transparent";
                                            e.target.style.color = "white";
                                        }
                                    }}
                                >
                                    <div className="me-3" style={{ color: "inherit" }}>{item.icon}</div>
                                    <span style={{ color: "inherit" }}>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="text-center py-3" style={{fontSize: "0.9rem" }}>
            <hr />
                © 2025 Pema Rinchen
            </div>
        </div>
    );
};

export default SideBar;
