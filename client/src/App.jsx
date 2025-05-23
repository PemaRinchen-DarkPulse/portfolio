import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
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
import Portfolio from './components/body/portfolio/Portfolio';
import Details from './components/body/portfolio/Details';
import Login from './components/auth/Login';
import { AuthProvider } from './components/auth/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function Layout() {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // ⬅️ If current route is '/login', skip layout and just render the login form
  if (location.pathname === '/login') {
    return <Login />;
  }

  return (
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
          position: 'relative',
          marginLeft: isSmallScreen ? '0px' : '30px',
          backgroundColor: '#f4f4f9',
          borderRadius: '15px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        {isSmallScreen && <SideBarSmallScreen />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
        <BubbleChat />
      </Router>
    </AuthProvider>
  );
}

export default App;
