import { Link } from 'react-router-dom'
import { ArrowRight, CircleCheck } from 'lucide-react'
import { assets } from '../assets/constance/constance'

const benefits = [
  '24/7 Online Booking',
  'Diverse Vehicle Selection',
  'Flexible Pick-up and Drop-off Locations',
]

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-white px-6 py-16 md:px-16 md:py-24" aria-labelledby="home-about-title">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative isolate flex min-h-64 items-center justify-center py-8 sm:min-h-80">
          <div aria-hidden="true" className="absolute inset-x-6 inset-y-8 -z-20 -rotate-6 rounded-[2.5rem] bg-gradient-to-br from-blue-100 via-blue-200 to-primary/70" />
          <div aria-hidden="true" className="absolute bottom-5 left-12 right-8 -z-10 h-16 -rotate-6 rounded-3xl bg-primary/15" />
          <img src={assets.main_car2} alt="Red Mercedes sports car" loading="lazy" className="relative w-full object-contain drop-shadow-xl" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About Us</p>
          <h2 id="home-about-title" className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">Our Commitment to Your <span className="text-primary">Comfort and Satisfaction</span></h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">Discover a simpler way to rent a car. With a wide choice of vehicles, easy online booking, and flexible rental options, we help you find the right ride for every journey.</p>
          <ul className="mt-6 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm font-semibold text-slate-700"><CircleCheck aria-hidden="true" className="h-5 w-5 shrink-0 fill-primary text-white" />{benefit}</li>
            ))}
          </ul>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dull focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">More About Us <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}
