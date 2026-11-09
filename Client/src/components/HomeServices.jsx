import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import exploreImage from '../assets/images/car_image4.png'
import fleetImage from '../assets/images/car_image1.png'
import accessoriesImage from '../assets/images/car_image2.png'
import travelImage from '../assets/images/hero-new.jpg'
import './HomeServices.css'

const services = [
  { title: 'Explore Sri Lanka', description: 'Ultimate guide for tourists', image: exploreImage, to: '/about', tall: true },
  { title: 'Corporate Fleet Management', description: 'Save time, save money!', image: fleetImage, to: '/contact', tall: true },
  { title: 'Vehicle Accessories', description: 'Enhance your experience', image: accessoriesImage, to: '/contact' },
  { title: 'For Travel Packages', description: 'Plan your Sri Lankan adventure', image: travelImage, to: '/contact' },
]

export default function HomeServices() {
  return (
    <section className="home-services" aria-label="Explore our travel and vehicle services">
      {services.map(({ title, description, image, to, tall }) => (
        <Link key={title} to={to} className={`home-services__card${tall ? ' home-services__card--tall' : ''}`}>
          <img className="home-services__image" src={image} alt="" loading="lazy" />
          <div className="home-services__content">
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <span className="home-services__arrow" aria-hidden="true"><ArrowRight size={34} strokeWidth={1.8} /></span>
          </div>
        </Link>
      ))}
    </section>
  )
}
