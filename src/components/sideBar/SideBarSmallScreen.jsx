import React from "react";
import SideBar from "./SideBar";

const SideBarSmallScreen = () => {
  return (
    <div>
      {/* Button to toggle the offcanvas */}
      <button
        className="btn"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
        style={{
          position: "absolute",
          right: "15px",
          top: "15px", // Ensure the button is positioned correctly
          background: "transparent",
          border: "none",
          fontSize: "1.8rem",
          cursor: "pointer",
        }}
      >
        <span>☰</span> {/* Simple hamburger icon */}
      </button>
      <div
        className="offcanvas offcanvas-start"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{
          width: "250px",
          maxWidth: "80%",
        }}
      >
        <SideBar />
      </div>
    </div>
  );
};

export default SideBarSmallScreen;
