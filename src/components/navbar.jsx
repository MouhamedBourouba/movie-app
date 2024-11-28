import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ navigationItems }) {
  const lofff = () => {
    console.log("yeaaaaah bubffy");
  };

  return (
    <nav className="fixed left-0 right-0 top-0 flex h-12 flex-row items-center justify-between bg-black pl-2">
      <div onClick={lofff} className="flex flex-row">
        <img src="./src/assets/logo.svg" className="size-8 self-center" />
        <h2 className="ml-1 self-center font-bold text-white">Movier</h2>
      </div>

      <div className="ml-5">
        {navigationItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.route}
            className={({ isActive }) =>
              `mr-4 self-center text-base font-semibold max-sm:text-[11px] ${isActive
                ? "text-red-400 underline underline-offset-4"
                : "text-white"
              } transition-all duration-200 ease-in-out hover:text-red-300 hover:underline max-sm:mr-2`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div></div>
    </nav>
  );
}

export default Navbar;
