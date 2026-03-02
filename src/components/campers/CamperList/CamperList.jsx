import React from 'react';
import CamperCard from '../CamperCard/CamperCard';
import styles from './CamperList.module.css';

const CamperList = ({ campers }) => {
  if (!campers || campers.length === 0) {
    return null;
  }

  return (
    <div className={styles.camperList}>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </div>
  );
};

export default CamperList;