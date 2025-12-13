import React from 'react'
import { testimonials } from '../assets/constance/constance';

const Testimonial = () => {
        const Star = ({ filled }) => (
        <svg className="w-4 h-4 text-blue-400" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z" />
        </svg>
    );

  return (
      <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
            <div className="flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl md:text-[40px] font-bold">Customer Testimonials</h1>
                <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-[696px]">Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 mb-10">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <Star key={index} filled={testimonial.rating > index} />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.testimonial}"</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Testimonial
