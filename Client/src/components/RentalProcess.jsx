import { Car, CalendarCheck, KeyRound, Navigation } from 'lucide-react'

const steps = [
  { icon: Car, title: 'Choose Your Car', description: 'Explore our collection and find the right vehicle for your plans and budget.' },
  { icon: CalendarCheck, title: 'Book Instantly', description: 'Select your rental dates and send your booking request in a few simple steps.' },
  { icon: KeyRound, title: 'Pick Up', description: 'Collect your car at your agreed location and get ready for the road.' },
  { icon: Navigation, title: 'Drive & Enjoy', description: 'Enjoy the freedom to explore, with our team here whenever you need support.' },
]

export default function RentalProcess() {
  return (
    <section className="overflow-hidden bg-slate-900 px-6 py-16 text-white md:px-16 md:py-20" aria-labelledby="rental-process-title">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="inline-block rounded-md bg-primary/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">How It Works</p>
          <h2 id="rental-process-title" className="mt-4 text-3xl font-extrabold md:text-4xl">Our Easy Rental Process</h2>
          <p className="mt-3 text-sm text-slate-400 md:text-base">Simple steps to get you on the road.</p>
        </div>
        <ol className="relative mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div aria-hidden="true" className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-14 hidden border-t border-dashed border-slate-500 lg:block" />
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="relative text-center">
              <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 border-slate-900 bg-primary shadow-[0_0_0_1px_rgba(96,165,250,0.25)]">
                <Icon aria-hidden="true" className="h-11 w-11 text-white" strokeWidth={1.4} />
                <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-900 bg-blue-100 text-xs font-bold text-primary">{index + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mx-auto mt-2 max-w-60 text-sm leading-relaxed text-slate-400">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
