import { useState } from 'react'
import SideBar from './components/sideBar/sideBar'
import Contact from './components/body/contact'
import Home from './components/body/home'
import About from './components/body/about'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="row">
        <div className="col-2">
          <SideBar/>
        </div>
        <div className="col-10">
        <Home/>
        <About/>
        <Contact/>
        </div>
      </div>
    </>
  )
}

export default App
