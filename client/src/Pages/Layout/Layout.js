import React from 'react';
import Navbar from '../../Components/Navbar/Navbar.js';
import AdminNav from '../../Components/Navbar/AdminNav.js';
import { useLocation } from "react-router-dom"
import styles from './Layout.module.css';

function Layout({ children }) {
  const location = useLocation();
  
  return (
    <div className={styles["layout-container"]}>
      <div className={styles["navbar-container"]} >
        {location.pathname.startsWith("/admin") ? (<AdminNav />): <Navbar />}
      </div>
      <main className={styles["main-content"]}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
