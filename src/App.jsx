import React from 'react'
import CustomCursor from './components/CustomCursor'
import SpiderDrone from './components/SpiderDrone'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      <CustomCursor />
      <SpiderDrone />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Stats />
      <Achievements />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
