import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../../redux/slices/filtersSlice';
import styles from './LocationFilter.module.css';

const LocationFilter = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.filters.location);

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  return (
    <div className={styles.filterGroup}>
      <label className={styles.filterLabel}>Location</label>
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter location..."
        className={styles.locationInput}
      />
    </div>
  );
};

export default LocationFilter;