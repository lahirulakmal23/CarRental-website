import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6'
import { assets } from '../assets/constance/constance'

const Footer = () => {
  const socials = [FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn]

  return (
      <footer className='bg-[#0b1220] text-gray-400 pt-14 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
                <div className='max-w-72'>
                    <img src={assets.logo} alt="logo" className='mb-4 h-8 brightness-0 invert' />
                    <p className='text-sm'>
                        Reliable car rental service for your next journey. Drive easy, live free.
                    </p>
                    <div className='flex items-center gap-3 mt-5'>
                        {socials.map((Icon, index) => (
                            <a key={index} href="#" className='w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 transition flex items-center justify-center text-white'>
                                <Icon className='w-3.5 h-3.5' />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <p className='font-semibold text-white'>Quick Links</p>
                    <ul className='mt-4 flex flex-col gap-2 text-sm'>
                        <li><Link to="/" className='hover:text-blue-500'>Home</Link></li>
                        <li><Link to="/cars" className='hover:text-blue-500'>Cars</Link></li>
                        <li><Link to="/about" className='hover:text-blue-500'>About Us</Link></li>
                        <li><Link to="/contact" className='hover:text-blue-500'>Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <p className='font-semibold text-white'>Support</p>
                    <ul className='mt-4 flex flex-col gap-2 text-sm'>
                        <li><a href="#" className='hover:text-blue-500'>FAQ</a></li>
                        <li><a href="#" className='hover:text-blue-500'>Terms & Conditions</a></li>
                        <li><a href="#" className='hover:text-blue-500'>Privacy Policy</a></li>
                        <li><a href="#" className='hover:text-blue-500'>Help</a></li>
                    </ul>
                </div>

                <div>
                    <p className='font-semibold text-white'>Contact Us</p>
                    <ul className='mt-4 flex flex-col gap-3 text-sm'>
                        <li className='flex items-start gap-2'>
                            <MapPin className='w-4 h-4 mt-0.5 text-blue-500 shrink-0' />
                            No. 123, Galle Road, Colombo, Sri Lanka
                        </li>
                        <li className='flex items-center gap-2'>
                            <Phone className='w-4 h-4 text-blue-500 shrink-0' />
                            +94 77 123 4567
                        </li>
                        <li className='flex items-center gap-2'>
                            <Mail className='w-4 h-4 text-blue-500 shrink-0' />
                            info@carrental.lk
                        </li>
                    </ul>
                </div>
            </div>

            <div className='max-w-6xl mx-auto border-t border-white/10 mt-12 py-5 text-center text-xs'>
                <p>© {new Date().getFullYear()} CarRental. All rights reserved.</p>
            </div>
        </footer>
  )
}

export default Footer
