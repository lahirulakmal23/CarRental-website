import { Link } from 'react-router-dom'
import { ArrowRight, Fuel, Gauge, Settings2, Users } from 'lucide-react'

export default function CarCard({ car }) {
  const currency = import.meta.env.VITE_CURRENCY || '$'
  return (
            <Link to={`/car-details/${car._id}`} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
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
                  <span className={`rounded-full px-2.5 py-1 font-medium ${car.isAvaliable ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{car.isAvaliable ? 'Available' : 'Unavailable'}</span>
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
  )
}


