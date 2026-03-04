import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEquipment } from '../../../redux/slices/filtersSlice';

// SVG ikonları
import AcIcon from '../../../assets/images/icons/ac.svg';
import BathroomIcon from '../../../assets/images/icons/bathroom.svg';
import KitchenIcon from '../../../assets/images/icons/kitchen.svg';
import TvIcon from '../../../assets/images/icons/tv.svg';
import AutomaticIcon from '../../../assets/images/icons/automatic.svg';

import styles from './EquipmentFilter.module.css';

const equipmentList = [
  { id: 'AC', label: 'AC', icon: AcIcon },
  { id: 'automatic', label: 'Automatic', icon: AutomaticIcon },
  { id: 'kitchen', label: 'Kitchen', icon: KitchenIcon },
  { id: 'bathroom', label: 'Bathroom', icon: BathroomIcon },
  { id: 'TV', label: 'TV', icon: TvIcon },
];

const EquipmentFilter = () => {
  const dispatch = useDispatch();
  const equipment = useSelector((state) => state.filters.equipment);

  const handleEquipmentToggle = (equipId) => {
    dispatch(toggleEquipment(equipId));
  };

  return (
    <div className={styles.filterGroup}>
      <h3 className={styles.filterTitle}>Vehicle Equipment</h3>
      <div className={styles.equipmentGrid}>
        {equipmentList.map((item) => (
          <button
            key={item.id}
            className={`${styles.equipmentButton} ${
              equipment[item.id] ? styles.active : ''
            }`}
            onClick={() => handleEquipmentToggle(item.id)}
            type="button"
          >
            <img 
              src={item.icon} 
              alt={item.label} 
              className={styles.equipmentIcon}
            />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EquipmentFilter;