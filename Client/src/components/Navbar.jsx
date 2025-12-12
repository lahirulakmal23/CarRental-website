import React, { use } from 'react'
import {Link,useLocation, useNavigate} from 'react-router-dom'
import { menuLinks, assets } from '../assets/constance/constance'



const Navbar = () => {

    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const navigate= useNavigate

  return (
   
    <div className={'flex justify-between items-center p-4 shadow-md fixed top-0 left-0 w-full bg-white z-50 relative-transition-all  ${location.pathname === "/"? "bg:light" : "bg-white"}'}>
        <Link to="/">
            <img src={assets.logo} alt="logo" className='h-8' />
        </Link>

        <div className='max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-borderColor right-0  flex  flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 sm:p-0 bg-white sm:bg-transparent transition-all duration-300 z-50 ${location.pathname === "/"? "bg:light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}'>
            {menuLinks.map((link) => (
                <Link key={link.name} to={link.path} className='m-2'>
                    {link.name}
                </Link>
            ))}
        </div>
        <div className='hidden lg:flex items-center text-sm gap-2 border border-color px-3 rounded-full max-w--56'>
            <input type='text' placeholder='Search...' className='py-1.5  w-full bg-transparent outline-none placeholder-gray-500' /> 
            <img src={assets.search_icon} alt="serch" />
        </div>

        <div className='flex max-sm:flex-col  items-start sm:items-center gap-4'>
            <button onClick={()=>useNavigate('/owner')} className='cursor-pointer'>Dashbord</button>
            <button className='cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transtion-all text-white rounded-lg'>Login</button>

        </div>
      
    </div>
  )
}


export default Navbar
