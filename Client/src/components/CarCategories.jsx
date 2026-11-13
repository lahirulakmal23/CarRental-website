import { motion as Motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Car, CarFront } from 'lucide-react'
import { carCategories } from '../assets/constance/carCategories'
import { dummyCarData } from '../assets/constance/constance'

const MotionLink = Motion.create(Link)

const categories = carCategories.map(({ name, description, image }) => {
  const cars = dummyCarData.filter((car) => car.category === name)
  return { name, description, image: image || cars[0]?.image, count: cars.length }
})

export default function CarCategories() {
  const reducedMotion = useReducedMotion()
  return (
    <section className="px-4 sm:px-6 lg:px-16 pb-16" aria-labelledby="car-categories-title">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2 id="car-categories-title" className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Browse by Car Category</h2>
          <p className="mt-4 text-sm text-gray-500 md:text-base">Find the right ride for your journey.</p>
        </div>
        <Link to="/cars" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4">
          View All Cars <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {categories.map(({ name, description, image, count }, index) => (
          <MotionLink initial={reducedMotion ? false : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: reducedMotion ? 0 : index * 0.1 }} key={name} to={`/cars?category=${encodeURIComponent(name)}`} className="group relative isolate flex min-h-72 md:min-h-80 items-end overflow-hidden rounded-2xl bg-slate-900 text-white focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
            {image ? <img src={image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" /> : <div aria-hidden="true" className="absolute inset-0 -z-20 flex items-start justify-center bg-gradient-to-br from-blue-500 via-blue-800 to-slate-900 pt-10">{name === '4WD & SUV Vehicles' ? <CarFront className="h-28 w-28 text-white/70" strokeWidth={1} /> : <Car className="h-28 w-28 text-white/70" strokeWidth={1} />}</div>}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
            <div className="flex w-full items-end justify-between gap-4 p-7 md:p-8">
              <div>
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="mt-2 text-sm text-slate-200">{description}</p>
                <p className="mt-3 text-xs font-medium text-white/75">{count} {count === 1 ? 'vehicle' : 'vehicles'}</p>
              </div>
              <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 transition-colors group-hover:bg-blue-500"><ArrowRight className="h-6 w-6" /></span>
            </div>
          </MotionLink>
        ))}
      </div>
    </section>
  )
}





