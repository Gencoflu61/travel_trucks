import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../../redux/slices/filtersSlice';
import styles from './LocationFilter.module.css';

import LocationIcon from '../../../assets/images/icons/map.svg';

const LocationFilter = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.filters.location);

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  return (
    <div className={styles.filterGroup}>
      <label className={styles.filterLabel}>Location</label>
       <div className={styles.inputWrapper}>
        <img src={LocationIcon} alt="location" className={styles.inputIcon} />
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="City"
          className={styles.locationInput}
        />
      </div>
    </div>
  );
};

export default LocationFilter;