import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.logo}>
          TravelTrucks
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={`${styles.navLink} ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/catalog" className={`${styles.navLink} ${isActive('/catalog')}`}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;