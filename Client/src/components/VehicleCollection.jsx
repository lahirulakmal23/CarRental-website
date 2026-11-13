import ScrollReveal from "./ScrollReveal"
import { useState } from 'react'
import CarCard from './CarCard'
import { carCategories } from '../assets/constance/carCategories'
import { Link } from 'react-router-dom'
import { ArrowRight, Car, LayoutGrid } from 'lucide-react'
import { dummyCarData } from '../assets/constance/constance'

const categories = ['All Vehicles', ...carCategories.map(({ name }) => name)]

export default function VehicleCollection() {
  const [category, setCategory] = useState('All Vehicles')
  const vehicles = dummyCarData.filter((car) => category === 'All Vehicles' || car.category === category)

  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-16 md:py-20" aria-labelledby="vehicle-collection-title">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><Car className="h-4 w-4" /> Our Collection</p>
          <h2 id="vehicle-collection-title" className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Discover Premium <span className="text-primary">Vehicles</span></h2>
          <p className="mt-4 text-sm text-gray-500 md:text-base">Choose a car that fits your plans, your style, and your budget.</p>
        </div>

        <div className="my-9 flex flex-wrap justify-center gap-3" role="group" aria-label="Filter collection by category">
          {categories.map((name) => {
            const Icon = name === 'All Vehicles' ? LayoutGrid : Car
            return (
              <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${category === name ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary'}`}>
                <Icon className="h-4 w-4" />{name}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {vehicles.length === 0 && <div className="col-span-full rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center"><Car aria-hidden="true" className="mx-auto mb-4 h-10 w-10 text-primary" /><h3 className="text-lg font-semibold text-gray-900">No {category.toLowerCase()} vehicles listed yet</h3><p className="mt-2 text-sm text-gray-500">Choose another category to explore our collection.</p><button type="button" onClick={() => setCategory('All Vehicles')} className="mt-5 cursor-pointer font-semibold text-primary hover:underline">View all vehicles</button></div>}{vehicles.map((car, index) => (
            <ScrollReveal key={car._id} delay={(index % 3) * 0.1} className="h-full"><CarCard car={car} /></ScrollReveal>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/cars" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dull focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Explore All Vehicles <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>
  )
}



