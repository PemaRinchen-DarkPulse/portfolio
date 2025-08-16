import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { HiMenu } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import './Navbar.css';

const SideBarSmallScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false); // Disabled initial pulsing
  
  // Monitor for sidebar open/close events from Bootstrap
  useEffect(() => {
    const offcanvas = document.getElementById('offcanvasExample');
    
    if (offcanvas) {
      // Listen for when the sidebar is shown
      offcanvas.addEventListener('shown.bs.offcanvas', () => {
        setIsOpen(true);
      });
      
      // Listen for when the sidebar is hidden
      offcanvas.addEventListener('hidden.bs.offcanvas', () => {
        setIsOpen(false);
      });
    }
    
    return () => {
      if (offcanvas) {
        offcanvas.removeEventListener('shown.bs.offcanvas', () => {});
        offcanvas.removeEventListener('hidden.bs.offcanvas', () => {});
      }
    };
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Stop pulsing when menu is opened
    if (!isOpen) {
      setIsPulsing(false);
    }
  };
  return (
    <div className="d-block d-xl-none"> {/* Only display below 1200px (xl breakpoint) */}
      {/* Button to toggle the offcanvas */}
      <button
        className={`btn menu-btn ${isOpen ? 'open' : ''}`}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
        onClick={toggleMenu}
        style={{
          position: "fixed",
          right: "15px",
          top: "15px", 
          background: isOpen ? "rgba(64, 89, 139, 0.9)" : "rgba(30, 42, 71, 0.85)",
          border: "none",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: "1050", // Higher z-index to ensure it's always on top
          boxShadow: isOpen ? "0px 0px 8px rgba(255, 255, 255, 0.2)" : "0px 2px 8px rgba(0, 0, 0, 0.3)",
          padding: "0",
          transition: "all 0.3s ease",
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="menu-btn-icon">
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span style={{ color: "#fff", fontSize: "1.8rem" }}>☰</span>
          )}
        </div>
      </button>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{
          width: "270px", /* Adjusted to match the width shown in the screenshot */
          maxWidth: "80%",
          boxShadow: "none", /* Removed shadow to match the design in the screenshot */
          backgroundColor: "#040b14", /* Match the background color from SideBar component */
          padding: 0, /* Remove default padding */
        }}
        data-bs-backdrop="true" /* Ensure clicking outside closes the sidebar */
        data-bs-scroll="false"
      >
        <SideBar />
      </div>
    </div>
  );
};

export default SideBarSmallScreen;
