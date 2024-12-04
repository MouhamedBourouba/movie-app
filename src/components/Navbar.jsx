import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ navigationItems }) {
  return (
    <nav className="sticky left-0 top-0 z-50 flex h-12 w-full flex-row items-center justify-between border-b border-black bg-white">
      <div className="flex flex-row space-x-4">
        {navigationItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.route}
            className={({ isActive }) =>
              `text-base font-semibold text-black ${isActive ? "text-red-500 underline" : "hover:text-red-500"} transition-all duration-200 ease-in-out max-sm:text-sm`
            }
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
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
