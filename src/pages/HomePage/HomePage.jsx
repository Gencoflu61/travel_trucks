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
            Discover Your Next Adventure with TravelTrucks
          </h1>
          <p className={styles.subtitle}>
            Explore our wide range of campers and hit the road in style
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