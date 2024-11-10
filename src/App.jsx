import { useState } from 'react'
import SideBar from './components/sideBar/sideBar'
import Contact from './components/body/contact'
import Hero from './components/body/hero'
import About from './components/body/about'
import Projects from './components/body/projects'
import Resume from './components/body/resume'
function App() {

  return (
    <>
      <div className="row">
        <div className="col-2">
          <SideBar/>
        </div>
        <div className="col-10">
        <Hero/>
        <About/>
        <Resume/>
        <Projects/>
        <Contact/>
        </div>
      </div>
    </>
  )
}

export default App
