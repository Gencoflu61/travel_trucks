import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVehicleType } from '../../../redux/slices/filtersSlice';
import styles from './VehicleTypeFilter.module.css';

const vehicleTypes = [
  { id: 'alcove', label: 'Alcove' },
  { id: 'fullyIntegrated', label: 'Fully Integrated' },
  { id: 'panelTruck', label: 'Panel Truck' },
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
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleTypeFilter;