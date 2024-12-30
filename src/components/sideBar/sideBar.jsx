import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin, FaHome, FaUser, FaFileAlt, FaImage, FaServer, FaEnvelope } from 'react-icons/fa';

const SideBar = () => {
    return (
        <div className="position-fixed text-white d-flex flex-column" style={{ backgroundColor: "#040b14", minHeight: "100vh" }}>
            <div className="rounded-circle mt-4 align-self-center" style={{ height: "120px", width: "120px", backgroundColor: "white" }}>
                {/* Add Profile Image Here */}
            </div>
            <div className="text-center mt-3">
                <h4>Pema Rinchen</h4>
                <ul className="d-flex justify-content-center mt-3" style={{ listStyle: "none", padding: 0 }}>
                    <li className="mx-2">
                        <a href="#" className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white"
                           style={{ height: "40px", width: "40px", textDecoration: "none" }}>
                            <FaInstagram size={20} />
                        </a>
                    </li>
                    <li className="mx-2">
                        <a href="#" className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white"
                           style={{ height: "40px", width: "40px", textDecoration: "none" }}>
                            <FaFacebook size={20} />
                        </a>
                    </li>
                    <li className="mx-2">
                        <a href="#" className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white"
                           style={{ height: "40px", width: "40px", textDecoration: "none" }}>
                            <FaLinkedin size={20} />
                        </a>
                    </li>
                </ul>
            </div>

            <div className="mt-5">
                <ul className="navbar-nav ms-3">
                    {[
                        { icon: <FaHome />, label: "Home", path: "/" },
                        { icon: <FaUser />, label: "About", path: "/about" },
                        { icon: <FaFileAlt />, label: "Resume", path: "/resume" },
                        { icon: <FaImage />, label: "Portfolio", path: "/projects" },
                        { icon: <FaServer />, label: "Project", path: "/projects" },
                        { icon: <FaEnvelope />, label: "Contact", path: "/contact" },
                    ].map((item, index) => (
                        <li key={index} className="nav-item d-flex align-items-center mb-4" style={{ cursor: "pointer" }}>
                            <Link
                                to={item.path}
                                className="d-flex align-items-center text-white text-decoration-none w-100"
                                style={{ transition: "color 0.3s, background-color 0.3s" }}
                            >
                                <div className="me-3">{item.icon}</div>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
