import React from "react";
import { dummyUserData, assets } from "../../assets/constance/constance";
import { Link } from "react-router-dom";

const NavbarOwner = () => {
  const user = dummyUserData;

  return (
    <nav className="w-full h-16 bg-gray-50 border-b   border-gray-300  flex items-center justify-between px-8">
      
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="logo" className="h-7" />
        
      </Link>

      {/* Right: User Info */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600 hidden sm:block">
          Welcome, <span className="font-semibold">{user.name || "Owner"}</span>
        </p>

       
      </div>
    </nav>
  );
};

export default NavbarOwner;
