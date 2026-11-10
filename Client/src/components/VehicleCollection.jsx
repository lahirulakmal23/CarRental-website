import { useState } from 'react'
import { carCategories } from '../assets/constance/carCategories'
import { Link } from 'react-router-dom'
import { ArrowRight, Car, Fuel, Gauge, LayoutGrid, Settings2, Users } from 'lucide-react'
import { dummyCarData } from '../assets/constance/constance'

const categories = ['All Vehicles', ...carCategories.map(({ name }) => name)]

export default function VehicleCollection() {
  const [category, setCategory] = useState('All Vehicles')
  const currency = import.meta.env.VITE_CURRENCY || '$'
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
          {vehicles.length === 0 && <div className="col-span-full rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center"><Car aria-hidden="true" className="mx-auto mb-4 h-10 w-10 text-primary" /><h3 className="text-lg font-semibold text-gray-900">No {category.toLowerCase()} vehicles listed yet</h3><p className="mt-2 text-sm text-gray-500">Choose another category to explore our collection.</p><button type="button" onClick={() => setCategory('All Vehicles')} className="mt-5 cursor-pointer font-semibold text-primary hover:underline">View all vehicles</button></div>}{vehicles.map((car) => (
            <Link key={car._id} to={`/car-details/${car._id}`} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <div className="flex flex-wrap items-start justify-between gap-3 px-6 pt-6">
                <h3 className="font-semibold text-gray-900">{car.brand.trim()} {car.model}</h3>
                <p className="text-gray-500"><span className="text-xl font-bold text-primary">{currency}{car.pricePerDay}</span><span className="text-xs"> / day</span></p>
              </div>
              <div className="mx-6 my-5 overflow-hidden rounded-xl bg-slate-50">
                <img src={car.image} alt={`${car.brand.trim()} ${car.model}`} loading="lazy" className="h-44 w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105" />
              </div>
              <div className="px-6 pb-6">
                <div className="mb-4 flex items-center justify-between gap-2 text-xs">
                  <span className="text-gray-500">{car.year} &middot; {car.category}</span>
                  <span className={`rounded-full px-2.5 py-1 font-medium ${car.isAvaliable ? 'bg-blue-50 text-primary' : 'bg-gray-100 text-gray-500'}`}>{car.isAvaliable ? 'Available' : 'Unavailable'}</span>
                </div>
                <dl className="grid grid-cols-2 gap-x-3 gap-y-5 border-t border-gray-100 pt-5">
                  {[
                    { icon: Users, label: 'Seats', value: `${car.seating_capacity} passengers` },
                    { icon: Settings2, label: 'Gearbox', value: car.transmission },
                    { icon: Gauge, label: 'Year', value: car.year },
                    { icon: Fuel, label: 'Fuel Type', value: car.fuel_type },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
                      <div><dt className="text-[11px] text-gray-400">{label}</dt><dd className="mt-0.5 text-xs font-medium text-gray-700">{value}</dd></div>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-primary">View Vehicle <ArrowRight aria-hidden="true" className="h-4 w-4" /></div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/cars" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dull focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Explore All Vehicles <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>
  )
}


