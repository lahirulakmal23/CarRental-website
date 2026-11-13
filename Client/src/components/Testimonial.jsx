import ScrollReveal from "./ScrollReveal"
import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star, Car, ShieldCheck, Headphones } from 'lucide-react'
import { assets, testimonials } from '../assets/constance/constance';

const stats = [
    { icon: Car, value: "10,000+", label: "Happy Customers" },
    { icon: Star, value: "4.8/5", label: "Average Rating" },
    { icon: ShieldCheck, value: "100%", label: "Secure Booking" },
    { icon: Headphones, value: "24/7", label: "Customer Support" },
];

const ArrowButton = ({ onClick, disabled, className, children }) => (
    <button
        aria-label={className.includes("left") ? "Previous testimonials" : "Next testimonials"} onClick={onClick}
        disabled={disabled}
        className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-blue-50 text-blue-600 shadow-sm items-center justify-center hover:bg-blue-100 disabled:opacity-40 transition cursor-pointer ${className}`}
    >
        {children}
    </button>
);

const Testimonial = () => {
    const trackRef = useRef(null);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    // Work out how many "pages" fit the current screen width and which one is visible
    const updatePages = () => {
        const track = trackRef.current;
        if (!track) return;
        setPageCount(Math.max(1, Math.round(track.scrollWidth / track.clientWidth)));
        setPage(Math.round(track.scrollLeft / track.clientWidth));
    };

    useEffect(() => {
        updatePages();
        window.addEventListener("resize", updatePages);
        return () => window.removeEventListener("resize", updatePages);
    }, []);

    const goTo = (index) => {
        const track = trackRef.current;
        track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
    };

  return (
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-20">
            {/* Heading */}
            <div className="flex flex-col items-center text-center px-6">
                <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-blue-600 uppercase">
                    <span className="w-10 h-px bg-blue-600" />
                    Customer Reviews
                    <span className="w-10 h-px bg-blue-600" />
                </p>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
                    What Our Customers <span className="text-blue-600">Say</span>
                </h2>
                <p className="mt-4 text-sm md:text-base text-gray-500 max-w-xl">
                    Real experiences from real travelers. See why thousands of customers choose CarRental for their car rental needs.
                </p>
            </div>

            {/* Carousel */}
            <div className="relative max-w-[1600px] mx-auto px-4 md:px-16 mt-12">
                <ArrowButton onClick={() => goTo(page - 1)} disabled={page === 0} className="left-2">
                    <ChevronLeft className="w-5 h-5" />
                </ArrowButton>

                <div
                    ref={trackRef}
                    onScroll={updatePages}
                    className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {testimonials.map((testimonial, index) => (
                        <ScrollReveal delay={(index % 3) * 0.1} key={testimonial.id} className="snap-start shrink-0 w-full sm:w-1/2 lg:w-1/3 p-3">
                            <div className="h-full flex flex-col bg-white rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.06)] p-6">
                                <div className="flex flex-wrap items-start gap-3">
                                    <img className="w-12 h-12 shrink-0 rounded-full object-cover" src={testimonial.image} alt={testimonial.name} />
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                                        <p className="text-xs text-blue-600/80 mt-0.5">
                                            {testimonial.location} • {testimonial.trips} {testimonial.trips === 1 ? "trip" : "trips"}
                                        </p>
                                        <div className="flex items-center gap-0.5 mt-2">
                                            {Array(5).fill(0).map((_, index) => (
                                                <Star
                                                    key={index}
                                                    className={`w-4 h-4 ${testimonial.rating > index ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Quote className="w-5 h-5 shrink-0 text-blue-200 fill-blue-200 rotate-180" />
                                </div>

                                <p className="text-sm text-gray-600 leading-relaxed mt-5 flex-1">"{testimonial.testimonial}"</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <ArrowButton onClick={() => goTo(page + 1)} disabled={page >= pageCount - 1} className="right-2">
                    <ChevronRight className="w-5 h-5" />
                </ArrowButton>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: pageCount }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-2.5 rounded-full transition-all cursor-pointer ${page === index ? "w-2.5 bg-blue-600" : "w-2.5 bg-gray-300"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Stats strip */}
            <div className="relative mt-16">
                {/* Decorative road image on the right, faded into the page */}
                <img
                    src={assets.hero_new}
                    alt=""
                    className="hidden xl:block absolute right-0 bottom-0 h-full w-[40%] object-cover [mask-image:linear-gradient(to_right,transparent,black_45%)]"
                />
                {/* Blue swoosh bottom-left */}
                <div className="absolute -left-24 -bottom-24 w-96 h-48 rounded-[50%] border-t-[28px] border-blue-600/80 rotate-12" />

                <div className="relative max-w-6xl mx-auto px-4 py-12 xl:pr-[38%] grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-8">
                    {stats.map(({ icon: Icon, value, label }, index) => (
                        <ScrollReveal delay={index * 0.1} key={label} className={`flex flex-col items-center text-center ${index > 0 ? "sm:border-l border-gray-200" : ""}`}>
                            <Icon className="w-9 h-9 text-blue-600" strokeWidth={1.75} />
                            <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
                            <p className="text-sm text-gray-500">{label}</p>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
  )
}

export default Testimonial




