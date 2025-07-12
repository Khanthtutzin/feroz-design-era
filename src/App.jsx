import { BrowserRouter as Routers, Route, Routes, Link } from 'react-router'

import './App.css'
import Hero from './assets/components/Hero'
import NavBar from './assets/components/NavBar'
import About from './assets/components/About'
import Contact from './assets/components/Contact'
import Projects from './assets/components/Projects'
import BannerGallery from './assets/components/BannerGallery'
import Footer from './assets/components/Footer'

function App() {

  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Projects />
      <BannerGallery />
      <Contact />
      <Footer />
    </>
  )
}

export default App
