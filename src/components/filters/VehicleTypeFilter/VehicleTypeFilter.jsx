import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVehicleType } from '../../../redux/slices/filtersSlice';
import styles from './VehicleTypeFilter.module.css';

// SVG ikonları
import Alcove from '../../../assets/images/icons/alcove.svg';
import Fully from '../../../assets/images/icons/fully.svg';
import Van from '../../../assets/images/icons/van.svg';

const vehicleTypes = [
  { id: 'van', label: 'Van', icon: Van },
  { id: 'fullyIntegrated', label: 'Fully Integrated', icon: Fully },
  { id: 'alcove', label: 'Alcove', icon: Alcove },
];

const VehicleTypeFilter = () => {
  const dispatch = useDispatch();
  const selectedType = useSelector((state) => state.filters.vehicleType);

  const handleTypeChange = (type) => {
    dispatch(setVehicleType(selectedType === type ? '' : type));
  };

  return (
    <div className={styles.filterGroup}>
      <h3 className={styles.filterTitle}>Vehicle Type</h3>
      <div className={styles.vehicleTypes}>
        {vehicleTypes.map((type) => (
          <button
            key={type.id}
            className={`${styles.typeButton} ${
              selectedType === type.id ? styles.active : ''
            }`}
            onClick={() => handleTypeChange(type.id)}
          >
            <img src={type.icon} alt={type.label} className={styles.typeIcon} />
            <span>{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleTypeFilter;