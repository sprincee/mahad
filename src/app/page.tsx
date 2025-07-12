import Hero from './components/Hero'
import Navbar from './components/Navbar'
import About from './components/About'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      {/* Add more sections/components here as you build them */}
      {/* <Projects /> */}
      {/* <Contact /> */}
    </>
  )
}