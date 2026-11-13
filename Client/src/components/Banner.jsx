import { motion as Motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/constance/constance";

const Banner = () => {
  const reducedMotion = useReducedMotion();
  return (
  <section className="w-full" aria-labelledby="promotion-title">
    <div className="relative isolate grid min-h-[300px] w-full overflow-hidden bg-gradient-to-r from-[#0d142e] via-blue-800 to-blue-500 md:grid-cols-2">
      <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-24 h-[600px] w-56 rotate-45 opacity-10 [background:repeating-linear-gradient(0deg,transparent,transparent_18px,#fff_18px,#fff_24px)]" />
      <Motion.div
        initial={reducedMotion ? false : { opacity: 0, x: 90 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative order-2 flex items-center px-5 py-8 md:order-2 md:px-0 md:pt-12"
      >
        <img
          src={assets.banner_car_image}
          alt="BMW available for rental"
          loading="lazy"
          className="relative mx-auto w-full max-w-xl object-contain drop-shadow-2xl md:-mb-5 md:mr-5 md:scale-110"
        />
      </Motion.div>
      <div className="relative z-10 order-1 flex flex-col items-center justify-center px-6 pt-10 text-center text-white md:order-1 md:py-12 lg:px-10">
        <h2 id="promotion-title" className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">Sale 50% Off</h2>
        <p className="mt-4 text-base font-semibold sm:text-xl lg:text-2xl">On All Rental Cars For 1 Month</p>
        <Link
          to="/cars"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#0d142e] px-9 py-4 text-sm font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
        >
          Book Your Car
        </Link>
      </div>
    </div>
  </section>
  );
};

export default Banner;