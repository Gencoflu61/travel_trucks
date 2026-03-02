import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.copyright}>
          © 2024 TravelTrucks. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;