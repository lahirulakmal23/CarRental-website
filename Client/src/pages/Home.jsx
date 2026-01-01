import React from 'react'
import Hero from '../components/Hero.jsx'
import FeaturedVehicles from '../components/FeaturedSection.jsx'
import Banner from '../components/Banner.jsx'
import Testimonial from '../components/Testimonial.jsx' 
import Footer from '../components/Footer.jsx'
import CarDetails from './CarDetails.jsx'


const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedVehicles />
      <Banner />
      <Testimonial />
      <Footer />
     

      
      
    </div>
  )
}

export default Home
