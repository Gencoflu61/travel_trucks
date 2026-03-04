import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewNow = () => {
    navigate('/catalog');
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.title}>
            Campers of your dreams
          </h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Button onClick={handleViewNow} variant="primary">
            View Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;