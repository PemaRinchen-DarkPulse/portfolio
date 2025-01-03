import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi'; // Importing the hamburger icon
import Home from './components/body/home/Home';
import About from './components/body/about/About';
import Resume from './components/body/resume/Resume';
import Projects from './components/body/project/ProjectList';
import Contact from './components/body/contact/Contact';
import BubbleChat from './components/body/bubbleChat/BubbleChat';
import './app.css';
import SideBar from './components/sideBar/SideBar';
import { useState, useEffect } from 'react';
import SideBarSmallScreen from './components/sideBar/SideBarSmallScreen';

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size and update state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Bootstrap's "md" breakpoint is 768px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <Router>
      <div
        className="row"
        style={{
          background: 'linear-gradient(135deg, #1E2A47, #4E5B79)',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        {!isSmallScreen && (
          <div className="d-none d-md-block col-2">
            <SideBar />
          </div>
        )}
        <div
          className={`col-${isSmallScreen ? '12' : '10'} ${isSmallScreen ? 'my-0' : 'my-3'} me-5`}
          style={{
            position: 'relative', // Ensures the hamburger button is correctly aligned
            marginLeft: isSmallScreen ? '0px' : '30px',
            backgroundColor: '#f4f4f9',
            borderRadius: '15px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          {isSmallScreen && (
            <SideBarSmallScreen/>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
      <BubbleChat />
    </Router>
  );
}

export default App;
