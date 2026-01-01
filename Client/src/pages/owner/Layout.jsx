import React from 'react'
import SideBar from '../../components/owner/SideBar'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Dashborad from './Dashborad'


const Layout = () => {
  return (
    <div className='flex flex-col'>
        <NavbarOwner/>
        <div className='flex'>
            <SideBar/>  
            <Dashborad/>

        </div>

      
    </div>
  )
}

export default Layout
