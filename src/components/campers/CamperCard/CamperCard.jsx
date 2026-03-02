import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../../redux/slices/favoritesSlice';
import Button from '../../common/Button/Button';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === camper.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(camper));
  };

  const handleShowMore = () => {
    window.open(`/catalog/${camper.id}`, '_blank');
  };

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  // Özellik ikonları
  const getFeatureIcon = (feature) => {
    const icons = {
      transmission: '⚙️',
      engine: '🔧',
      AC: '❄️',
      bathroom: '🚽',
      kitchen: '🍳',
      TV: '📺',
      radio: '📻',
      refrigerator: '🧊',
      microwave: '🔥',
      gas: '⛽',
      water: '💧',
    };
    return icons[feature] || '•';
  };

  return (
    <div className={styles.camperCard}>
      <div className={styles.imageContainer}>
        <img 
          src={camper.gallery?.[0]?.original || camper.img || '/placeholder.jpg'} 
          alt={camper.name}
          className={styles.image}
        />
        <button 
          className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{camper.name}</h3>
          <div className={styles.priceSection}>
            <span className={styles.price}>€{formatPrice(camper.price)}</span>
          </div>
        </div>

        <div className={styles.ratingLocation}>
          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            <span>{camper.rating} ({camper.reviews?.length || 0} reviews)</span>
          </div>
          <div className={styles.location}>
            📍 {camper.location}
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {camper.transmission && (
            <span className={styles.feature}>
              {getFeatureIcon('transmission')} {camper.transmission}
            </span>
          )}
          {camper.engine && (
            <span className={styles.feature}>
              {getFeatureIcon('engine')} {camper.engine}
            </span>
          )}
          {camper.AC && (
            <span className={styles.feature}>
              {getFeatureIcon('AC')} AC
            </span>
          )}
          {camper.bathroom && (
            <span className={styles.feature}>
              {getFeatureIcon('bathroom')} Bathroom
            </span>
          )}
          {camper.kitchen && (
            <span className={styles.feature}>
              {getFeatureIcon('kitchen')} Kitchen
            </span>
          )}
        </div>

        <Button onClick={handleShowMore} variant="primary">
          Show More
        </Button>
      </div>
    </div>
  );
};

export default CamperCard;