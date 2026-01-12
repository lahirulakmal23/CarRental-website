import React from 'react'
import SideBar from '../../components/owner/SideBar'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Dashborad from '../owner/Dashborad'
import { Outlet } from 'react-router-dom'



const Layout = () => {
  return (
  <div className="flex flex-col">
      <NavbarOwner />

      <div className="flex">
        <SideBar />

        {/* THIS IS WHERE ROUTES CHANGE */}
        <div className="flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
