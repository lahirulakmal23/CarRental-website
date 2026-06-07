import React, { useState } from "react";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/constance/constance";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const user = dummyUserData;
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const updateImage = () => {
    if (image) {
      user.image = previewUrl;
      setImage(null);
    }
  };

  const cancelImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-7 pb-4 text-sm bg-white border-r border-gray-100 w-full md:w-56 lg:w-64">

      {/* Profile Section */}
      <div className="flex flex-col items-center w-full px-4">
        <div className="group relative">
          <label htmlFor="image" className="cursor-pointer block">
            {previewUrl || user?.image ? (
              <img
                src={previewUrl || user.image}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-offset-2 ring-blue-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-lg ring-2 ring-offset-2 ring-blue-100">
                {getInitials(user?.name)}
              </div>
            )}

            {/* Edit Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-150">
              <img src={assets.edit_icon} alt="edit" className="w-5 h-5" />
            </div>

            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Save / Cancel */}
        {image && (
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={updateImage}
              className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
            >
              Save
              <img src={assets.check_icon} alt="" className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={cancelImage}
              className="text-xs font-medium text-gray-400 hover:text-gray-600 px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Name & Role */}
        <p className="mt-3 font-semibold text-gray-900 text-sm">{user?.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">Owner</p>
      </div>

      {/* Divider */}
      <div className="w-full mt-6 border-t border-gray-100" />

      {/* Menu Links */}
      <nav className="w-full mt-4 flex flex-col gap-0.5 px-3">
        {ownerMenuLinks.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150
              ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-0.5 before:bg-blue-500 before:rounded-r"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`
            }
          >
            <img
              src={item.icon}
              alt=""
              className={`w-[18px] h-[18px] ${
                location.pathname === item.path ? "opacity-100" : "opacity-60"
              }`}
            />
            <span className="text-[13.5px]">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto w-full px-3 pt-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 text-[13.5px]">
          <img src={assets.logout_icon} alt="" className="w-[18px] h-[18px] opacity-60" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;