import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar({ navigationItems }) {
  let [selected, setSelected] = useState("/movie-app/");

  return (
    <nav className="sticky left-0 top-0 z-50 flex h-12 w-full flex-row items-center justify-center border-b border-black bg-white">
      <div className="flex flex-row space-x-4">
        {navigationItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.route}
            className={() =>
              `text-base font-semibold text-black ${selected == item.route ? "text-red-500 underline" : "hover:text-red-500"} transition-all duration-200 ease-in-out max-sm:text-xs`
            }
            onClick={() => setSelected(item.route)}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
