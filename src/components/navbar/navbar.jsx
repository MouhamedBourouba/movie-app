import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

function Navbar({ navigationItems }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h2>Movie App</h2>
      </div>
      <div className={styles.navigation}>
        {navigationItems.map((item, index) => (
          <Link key={index} to={item.route}>
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
