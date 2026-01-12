import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuLinks, assets } from "../assets/constance/constance";

const Navbar = ({setShowLogin}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={`flex justify-between  items-center py-4 md:px-12 shadow-md fixed top-0 left-0 w-full z-50 transition-all
      ${location.pathname === "/" ? "bg-gray-50" : "bg-white"}`}
    >
      {/* LOGO */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>

      {/* DESKTOP NAV LINKS */}
      <div className="hidden sm:flex items-center gap-10">
        {menuLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:text-primary transition"
          >
            {link.name}
          </Link>
        ))}

        {/* SEARCH BAR (Desktop only) */}
        <div className="hidden lg:flex items-center text-sm gap-2 border px-3 py-1 rounded-full max-w-56">
          <input
            type="text"
            placeholder="Search..."
            className="py-1 w-full bg-transparent outline-none placeholder-gray-500"
          />
          <img src={assets.search_icon} alt="search" className="w-4" />
        </div>

        {/* BUTTONS (Desktop only) */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => navigate("/owner")}
            className="cursor-pointer"
          >
            Dashboard
          </button>

          <button onClick={() => setShowLogin(true)} className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg">
            Login
          </button>
        </div>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="sm:hidden"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="w-7"
        />
      </button>

      {/* MOBILE MENU */}
      <div
        className={`sm:hidden fixed top-16 right-0 h-screen w-64 bg-white shadow-lg p-5 transition-all duration-300 
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {menuLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setOpen(false)}
            className="block text-lg py-3 "
          >
            {link.name}
          </Link>
        ))}

        {/* Search Bar on Mobile */}
        <div className="mt-4 flex items-center border px-3 py-2 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none"
          />
          <img src={assets.search_icon} alt="search" className="w-5" />
        </div>

        {/* Buttons on Mobile */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => {
              navigate("/owner");
              setOpen(false);
            }}
            className="py-2 border rounded-lg"
          >
            Dashboard
          </button>

          <button
            className="py-2 bg-primary text-white rounded-lg"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
