import React from 'react'
import SideBar from '../../components/owner/SideBar'
import NavbarOwner from '../../components/owner/NavbarOwner'


const Layout = () => {
  return (
    <div className='flex flex-col'>
        <NavbarOwner/>
        <div className='flex'>
            <SideBar/>
            

        </div>

      
    </div>
  )
}

export default Layout
