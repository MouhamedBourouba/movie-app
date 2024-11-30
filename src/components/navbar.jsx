import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ navigationItems }) {
  return (
    <nav className="flex h-12 w-full flex-row items-center justify-between bg-black px-3">
      <div className="flex flex-row space-x-4">
        {navigationItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.route}
            className={({ isActive }) =>
              `text-base font-semibold text-white ${isActive ? "text-red-600 underline" : "hover:text-red-300"} transition-all duration-200 ease-in-out max-sm:text-xs`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <img
        className="block h-5 w-5 transition-all duration-200 ease-in-out max-sm:h-4 max-sm:w-4"
        src="./src/assets/search.svg"
      />
    </nav>
  );
}

export default Navbar;
