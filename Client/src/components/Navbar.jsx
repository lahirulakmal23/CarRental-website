import React from "react";
import { Link, NavLink } from "react-router-dom";
import { menuLinks, assets } from "../assets/constance/constance";

const Navbar = ({ setShowLogin }) => {
  const [open, setOpen] = React.useState(false);

  const linkClass = ({ isActive }) =>
    `transition hover:text-primary ${
      isActive ? "text-primary font-semibold" : "text-gray-700"
    }`;

  return (
    <div className="flex justify-between items-center px-6 md:px-16 py-4 bg-white shadow-md fixed top-0 left-0 w-full z-50">
      {/* LOGO - left */}
      <Link to="/" className="md:flex-1">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>

      {/* NAV LINKS - middle */}
      <div className="hidden md:flex items-center gap-10">
        {menuLinks.map((link) => (
          <NavLink key={link.name} to={link.path} end className={linkClass}>
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* LOGIN - right */}
      <div className="hidden md:flex flex-1 justify-end">
        <button
          onClick={() => setShowLogin(true)}
          className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg"
        >
          Login
        </button>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="w-7"
        />
      </button>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-16 right-0 h-screen w-64 bg-white shadow-lg p-5 transition-all duration-300
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
