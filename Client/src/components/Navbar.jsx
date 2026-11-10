import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { menuLinks, assets } from "../assets/constance/constance";

const Navbar = ({ setShowLogin }) => {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = React.useState(() => window.scrollY > 24);
  const transparent = pathname === '/' && !scrolled;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `transition hover:text-primary ${
      isActive ? (transparent ? "text-blue-300 font-semibold" : "text-primary font-semibold") : (transparent ? "text-white" : "text-gray-700")
    }`;

  return (
    <div className={`flex justify-between items-center px-4 sm:px-6 lg:px-16 py-4 fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${transparent ? "bg-transparent" : "bg-white shadow-md"}`}>
      {/* LOGO - left */}
      <Link to="/" className="lg:flex-1">
        <img src={assets.logo} alt="logo" className="h-8 max-w-[160px] object-contain" />
      </Link>

      {/* NAV LINKS - middle */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-10">
        {menuLinks.map((link) => (
          <NavLink key={link.name} to={link.path} end className={linkClass}>
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* LOGIN - right */}
      <div className="hidden lg:flex flex-1 justify-end">
        <button
          onClick={() => setShowLogin(true)}
          className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg"
        >
          Login
        </button>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button className="lg:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-mobile-menu" onClick={() => setOpen(!open)}>
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className={`w-7 ${transparent ? "brightness-0 invert" : ""}`}
        />
      </button>

      {/* MOBILE MENU */}
      <div
        id="main-mobile-menu"
        inert={!open}
        className={`lg:hidden fixed top-16 right-0 h-[calc(100dvh-4rem)] w-72 max-w-full overflow-y-auto bg-white shadow-lg p-5 transition-all duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {menuLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block text-lg py-3 ${isActive ? "text-primary font-semibold" : ""}`
            }
          >
            {link.name}
          </NavLink>
        ))}

        <button
          className="mt-6 w-full py-2 bg-primary text-white rounded-lg"
          onClick={() => {
            setShowLogin(true);
            setOpen(false);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;


