import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../assets/constance/constance";
import SearchBar from "./SearchBar";

const slides = [
  { image: assets.hero_new, label: "Audi on a scenic mountain road" },
  { image: assets.car_image4, label: "Blue sports car on an open road" },
  { image: assets.car_image1, label: "BMW ready for your next journey" },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopForReducedMotion = () => { if (preference.matches) setPlaying(false); };
    preference.addEventListener("change", stopForReducedMotion);
    return () => preference.removeEventListener("change", stopForReducedMotion);
  }, []);

  useEffect(() => {
    if (!playing || focused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing, focused, activeSlide]);

  const changeSlide = (index) => {
    setActiveSlide((index + slides.length) % slides.length);
  };
  const controlClass = "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-slate-900/50 text-white transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  return (
    <div className="w-full">
      <section
        className="relative isolate w-full min-h-[480px] md:min-h-[560px] overflow-hidden"
        aria-label="Featured car images"
        aria-roledescription="carousel"
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      >
        {slides.map((slide, index) => (
          <div key={slide.image} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.label}`} aria-hidden={activeSlide !== index} className={`absolute inset-0 -z-20 motion-safe:transition-opacity motion-safe:duration-1000 motion-safe:ease-in-out ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide.image} alt={slide.label} fetchPriority={index === 0 ? "high" : "auto"} className="h-full w-full object-cover object-center" />
          </div>
        ))}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="relative px-6 md:px-16 pt-36 md:pt-44 pb-48">
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] text-gray-200 uppercase mb-4">Car Rental Service</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">Explore More<br /><span className="text-blue-500">Drive Freely</span></h1>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-md mt-5">Rent the perfect car for your journey. Affordable rates, flexible plans and a smooth experience &mdash; only at CarRental.</p>
        </div>

        <div className="absolute inset-x-6 bottom-24 flex items-center justify-between gap-4 md:inset-x-16 md:bottom-28">
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous image" onClick={() => changeSlide(activeSlide - 1)} className={controlClass}><ChevronLeft aria-hidden="true" className="h-5 w-5" /></button>
            <div className="flex items-center gap-1" role="group" aria-label="Choose hero image">
              {slides.map((slide, index) => (
                <button key={slide.image} type="button" aria-label={`Show image ${index + 1}: ${slide.label}`} aria-current={index === activeSlide ? "true" : undefined} onClick={() => changeSlide(index)} className="flex h-10 min-w-8 cursor-pointer items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-white"><span className={`h-2 rounded-full transition-all motion-reduce:transition-none ${index === activeSlide ? 'w-7 bg-blue-500' : 'w-2 bg-white/60'}`} /></button>
              ))}
            </div>
            <button type="button" aria-label="Next image" onClick={() => changeSlide(activeSlide + 1)} className={controlClass}><ChevronRight aria-hidden="true" className="h-5 w-5" /></button>
          </div>
        </div>
      </section>

      <div className="relative max-w-6xl mx-auto px-4 -mt-16 md:-mt-20 mb-14 z-10"><SearchBar /></div>
    </div>
  );
};

export default Hero;


