import { motion as Motion, MotionConfig, useReducedMotion } from 'framer-motion'
import Hero from '../components/Hero.jsx'
import Banner from '../components/Banner.jsx'
import CarCategories from '../components/CarCategories.jsx'
import VehicleCollection from '../components/VehicleCollection.jsx'
import AboutSection from '../components/AboutSection.jsx'
import RentalProcess from '../components/RentalProcess.jsx'
import Testimonial from '../components/Testimonial.jsx'
import BlogSection from '../components/BlogSection.jsx'
import Footer from '../components/Footer.jsx'

const Reveal = ({ children }) => {
  const reducedMotion = useReducedMotion()
  return (
    <Motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  )
}

const Home = () => {
  return (
    <MotionConfig reducedMotion="user">
    <div>
      <Hero />
      <Reveal><CarCategories /></Reveal>
      <Reveal><VehicleCollection /></Reveal>
      <Reveal><RentalProcess /></Reveal>
      <Reveal><AboutSection /></Reveal>
      <Reveal><Banner /></Reveal>
      <Reveal><Testimonial /></Reveal>
      <Reveal><BlogSection /></Reveal>
      <Footer />
    </div>
    </MotionConfig>
  )
}

export default Home






