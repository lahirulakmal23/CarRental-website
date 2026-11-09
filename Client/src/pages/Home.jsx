import React from 'react'
import Hero from '../components/Hero.jsx'
import CarCategories from '../components/CarCategories.jsx'
import VehicleCollection from '../components/VehicleCollection.jsx'
import AboutSection from '../components/AboutSection.jsx'
import RentalProcess from '../components/RentalProcess.jsx'
import Testimonial from '../components/Testimonial.jsx'
import Footer from '../components/Footer.jsx'
import HomeServices from '../components/HomeServices.jsx'

const Home = () => {
  return (
    <div>
      <Hero />
      <CarCategories />
      <VehicleCollection />
      <RentalProcess />
      <AboutSection />
      <HomeServices />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default Home





