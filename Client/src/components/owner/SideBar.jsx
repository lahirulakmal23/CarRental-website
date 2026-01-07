import React, { useState } from "react";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/constance/constance";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const user = dummyUserData;
  const location = useLocation();
  const [image, setImage] = useState(null);

  const updateImage = () => {
    if (image) {
      user.image = URL.createObjectURL(image);
      setImage(null);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-6 text-sm bg-white border-r 
                w-full md:w-54 lg:w-64">
      
      {/* Profile Image */}
      <div className="group relative">
        <label htmlFor="image" className="cursor-pointer relative">
          <img
            src={image ? URL.createObjectURL(image) : user?.image}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover border"
          />

          {/* Edit Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition">
            <img src={assets.edit_icon} alt="edit" className="w-6 h-6" />
          </div>

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          onClick={updateImage}
          className="mt-3 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded"
        >
          Save
          <img src={assets.check_icon} alt="save" className="w-4 h-4" />
        </button>
      )}

      {/* User Name */}
      <p className="mt-3 font-semibold">{user?.name}</p>

      {/* Menu Links */}
      <div className="w-full mt-6 flex flex-col gap-1">
        {ownerMenuLinks.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 mb-2 transition  
              ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary   font-semibold"
                  : "hover:bg-primary/10 text-gray-600 "
              }`}
          >
            <img src={item.icon} alt={item.name} className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
