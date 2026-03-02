import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEquipment } from '../../../redux/slices/filtersSlice';
import styles from './EquipmentFilter.module.css';

const equipmentList = [
  { id: 'AC', label: 'AC', icon: '❄️' },
  { id: 'bathroom', label: 'Bathroom', icon: '🚽' },
  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'TV', label: 'TV', icon: '📺' },
  { id: 'radio', label: 'Radio', icon: '📻' },
  { id: 'refrigerator', label: 'Refrigerator', icon: '🧊' },
  { id: 'microwave', label: 'Microwave', icon: '🔥' },
  { id: 'gas', label: 'Gas', icon: '⛽' },
  { id: 'water', label: 'Water', icon: '💧' },
];

const EquipmentFilter = () => {
  const dispatch = useDispatch();
  const equipment = useSelector((state) => state.filters.equipment);

  const handleEquipmentToggle = (equipId) => {
    console.log('Tıklanan ekipman:', equipId);
    console.log('Önceki durum:', equipment[equipId]);
    dispatch(toggleEquipment(equipId));
  };

  // Debug için
  console.log('EquipmentFilter render edildi, equipment state:', equipment);

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
            <span className={styles.equipmentIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EquipmentFilter;