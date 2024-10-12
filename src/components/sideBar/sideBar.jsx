import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin, FaHome, FaUser, FaFileAlt, FaImage, FaServer, FaEnvelope } from 'react-icons/fa';

const SideBar = () => {
    return (
        <div className='col-2 position-fixed text-white d-flex flex-column' style={{ backgroundColor: "#040b14", minHeight: "100vh" }}>
            {/* Profile Section */}
            <div className='rounded-circle mt-4 align-self-center' style={{ height: "120px", width: "120px", backgroundColor: "white" }}>
                {/* Add Profile Image Here */}
            </div>
            <div className='text-center mt-3'>
                <h4>Pema Rinchen</h4>
                {/* Social Media Icons */}
                <ul className='d-flex justify-content-center mt-3' style={{ listStyle: "none", padding: 0 }}>
                    <li className='mx-2'>
                        <div className='rounded-circle bg-primary d-flex align-items-center justify-content-center' style={{ height: "40px", width: "40px" }}>
                            <FaInstagram size={20} />
                        </div>
                    </li>
                    <li className='mx-2'>
                        <div className='rounded-circle bg-primary d-flex align-items-center justify-content-center' style={{ height: "40px", width: "40px" }}>
                            <FaFacebook size={20} />
                        </div>
                    </li>
                    <li className='mx-2'>
                        <div className='rounded-circle bg-primary d-flex align-items-center justify-content-center' style={{ height: "40px", width: "40px" }}>
                            <FaLinkedin size={20} />
                        </div>
                    </li>
                </ul>
            </div>

            {/* Menu Section */}
            <div className='mt-5'>
                <ul className='navbar-nav ms-3'>
                    <li className='nav-item d-flex align-items-center mb-4' style={{ cursor: 'pointer' }}>
                        <FaHome className='me-3' /> Home
                    </li>
                    <li className='nav-item d-flex align-items-center mb-4' style={{ cursor: 'pointer' }}>
                        <FaUser className='me-3' /> About
                    </li>
                    <li className='nav-item d-flex align-items-center mb-4' style={{ cursor: 'pointer' }}>
                        <FaFileAlt className='me-3' /> Resume
                    </li>
                    <li className='nav-item d-flex align-items-center mb-4' style={{ cursor: 'pointer' }}>
                        <FaImage className='me-3' /> Portfolio
                    </li>
                    <li className='nav-item d-flex align-items-center mb-4' style={{ cursor: 'pointer' }}>
                        <FaServer className='me-3' /> Service
                    </li>
                    <li className='nav-item d-flex align-items-center mb-4' style={{ cursor: 'pointer' }}>
                        <FaEnvelope className='me-3' /> Contact
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
