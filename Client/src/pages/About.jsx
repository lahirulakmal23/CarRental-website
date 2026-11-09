import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Headphones, Tag, MapPin } from "lucide-react";
import { assets } from "../assets/constance/constance";
import Footer from "../components/Footer";

const reasons = [
  { icon: ShieldCheck, title: "Trusted & Safe", text: "Well-maintained vehicles and verified partners." },
  { icon: Headphones, title: "24/7 Support", text: "We're always here to help, anytime, anywhere." },
  { icon: Tag, title: "Best Prices", text: "Competitive rates with no hidden fees." },
  { icon: MapPin, title: "Wide Selection", text: "From economy to luxury, we have it all." },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 bg-white">
      {/* HERO SECTION */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.hero_new})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/95 via-[#0b1220]/70 to-transparent" />
        <div className="relative px-6 md:px-16 py-16 md:py-24 text-white">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-200">
            About Us
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
            Your Trusted
            <br />
            Car Rental Partner
          </h1>
          <p className="mt-5 text-sm md:text-base text-gray-200 max-w-lg leading-relaxed">
            At CarRental, we believe in giving you the freedom to explore more.
            Whether it's a weekend getaway, a business trip, or a long-term
            rental, we're here to make your journey simple, safe and
            unforgettable.
          </p>
        </div>
      </div>

      {/* OUR STORY */}
      <section className="px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-blue-600 uppercase">
            Our Story
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            From a Simple Idea to
            <br />
            Your Travel Companion
          </h2>
          <p className="mt-5 text-gray-600 leading-relaxed max-w-xl">
            CarRental was founded with a clear vision — to make car rental easy,
            affordable and accessible for everyone. What started as a small
            local service has now grown into a trusted platform, helping
            thousands of customers hit the road with confidence.
          </p>
          <button
            onClick={() => navigate("/cars")}
            className="mt-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <img
          src={assets.car_image1}
          alt="Our story"
          className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-lg"
        />
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-slate-50 px-6 md:px-16 py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Why Choose CarRental?
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-[220px]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.hero_new})` }}
      >
        <div className="absolute inset-0 bg-[#0b1220]/90" />
        <div className="relative px-6 md:px-16 py-10 flex flex-col md:flex-row md:items-center gap-6 text-white">
          <img src={assets.logo} alt="logo" className="h-8 w-fit brightness-0 invert" />
          <div className="md:flex-1 md:pl-10">
            <h3 className="text-xl md:text-2xl font-bold">
              Ready for Your Next Adventure?
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Book your car today and experience the freedom of the road.
            </p>
          </div>
          <button
            onClick={() => navigate("/cars")}
            className="w-fit flex items-center gap-2 bg-white hover:bg-blue-50 transition text-blue-600 text-sm font-semibold px-6 py-2.5 rounded-lg cursor-pointer"
          >
            Book Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
