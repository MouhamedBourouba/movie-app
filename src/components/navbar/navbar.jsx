import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"

function Navbar({ navigationItems }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} />
        <br />
        <h2>Movier</h2>
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
