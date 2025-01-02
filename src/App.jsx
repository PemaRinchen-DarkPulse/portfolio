import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/body/home/Home';
import About from './components/body/about/About'
import Resume from './components/body/resume/Resume';
import Projects from './components/body/project/ProjectList';
import Contact from './components/body/contact/Contact';
import BubbleChat from './components/body/bubbleChat/BubbleChat';
import './app.css';
import SideBar from './components/sideBar/SideBar';

function App() {
  return (
    <Router>
      <div className="row" style={{ background: 'linear-gradient(135deg, #1E2A47, #4E5B79)', minHeight: '100vh' }}>
        <div className="col-2">
          <SideBar/>
        </div>
        <div className="col-10 my-3 me-5 " style={{ marginLeft: "30px", backgroundColor: '#f4f4f9', borderRadius: '15px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' }}>
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
