import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { assets } from "../assets/constance/constance";
import Footer from "../components/Footer";

const officeAddress = "No. 123, Galle Road, Colombo 03, Sri Lanka";
const mapQuery = encodeURIComponent(officeAddress);

const contactInfo = [
  { icon: Phone, title: "Phone", lines: ["+94 77 123 4567", "Mon - Sun, 8:00 AM - 10:00 PM"] },
  { icon: Mail, title: "Email", lines: ["info@carrental.lk", "We reply within 24 hours"] },
  { icon: MapPin, title: "Office Address", lines: ["No. 123, Galle Road,", "Colombo 03, Sri Lanka"] },
];

const socials = [FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube];

const subjects = ["Booking enquiry", "Existing booking", "Payments & refunds", "List my car", "Other"];

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send the message to the server once a contact API exists
    setSent(true);
    setForm(emptyForm);
  };

  const inputClass =
    "mt-1.5 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 bg-white";
  const labelClass = "text-sm font-medium text-slate-800";

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
            Contact Us
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
            We're Here to Help
          </h1>
          <p className="mt-5 text-sm md:text-base text-gray-200 max-w-lg leading-relaxed">
            Have a question, need assistance, or want to make a booking? Get in
            touch with our friendly team — we're just a message away.
          </p>
        </div>
      </div>

      <section className="px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CONTACT INFO */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
          {contactInfo.map(({ icon: Icon, title, lines }) => (
            <div key={title} className="flex items-start gap-4 pb-6 mb-6 border-b border-gray-100">
              <div className="w-11 h-11 shrink-0 rounded-full bg-blue-600 flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="text-sm text-gray-700 mt-1">{lines[0]}</p>
                <p className="text-sm text-gray-500">{lines[1]}</p>
              </div>
            </div>
          ))}

          <p className="font-semibold text-slate-900">Follow Us</p>
          <div className="flex items-center gap-3 mt-3">
            {socials.map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center text-white"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-slate-50 rounded-2xl border border-gray-100 p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
          <span className="block w-10 h-1 rounded-full bg-blue-600 mt-2" />
          <p className="text-sm text-gray-500 mt-3">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className={labelClass}>
              Full Name *
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
            </label>
            <label className={labelClass}>
              Email Address *
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
            </label>
            <label className={labelClass}>
              Phone Number *
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+94 77 123 4567" className={inputClass} />
            </label>
            <label className={labelClass}>
              Subject
              <select name="subject" value={form.subject} onChange={handleChange} className={inputClass}>
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className={`${labelClass} block mt-5`}>
            Message *
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Type your message here..." className={`${inputClass} resize-none`} />
          </label>

          {sent && (
            <p className="mt-4 text-sm text-blue-600">
              Thanks for reaching out! We'll reply to you shortly.
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold py-3 rounded-lg cursor-pointer"
          >
            Send Message
            <Send className="w-4 h-4" />
          </button>
        </form>
      </section>

      {/* MAP */}
      <section className="px-6 md:px-16 pb-16">
        <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <iframe
            title="Office location"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="w-full h-80 md:h-96 border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:right-10 bg-white md:rounded-xl md:shadow-xl p-6 md:w-80">
            <p className="text-lg font-bold text-slate-900">Our Office</p>
            <p className="text-sm text-gray-500 mt-2">
              No. 123, Galle Road,
              <br />
              Colombo 03, Sri Lanka
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-between bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
            >
              Get Directions <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
