import SideBar from '../../components/owner/SideBar'
import NavbarOwner from '../../components/owner/NavbarOwner'
import { Outlet } from 'react-router-dom'



const Layout = ({ user, onLogout }) => {
  return (
  <div className="flex h-dvh flex-col overflow-hidden">
      <NavbarOwner user={user} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <SideBar user={user} onLogout={onLogout} />

        {/* THIS IS WHERE ROUTES CHANGE */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
