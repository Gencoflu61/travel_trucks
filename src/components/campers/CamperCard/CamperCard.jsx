import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../../redux/slices/favoritesSlice';
import Button from '../../common/Button/Button';

// SVG ikonları
import AcIcon from '../../../assets/images/icons/ac.svg';
import BathroomIcon from '../../../assets/images/icons/bathroom.svg';
import KitchenIcon from '../../../assets/images/icons/kitchen.svg';
import TvIcon from '../../../assets/images/icons/tv.svg';
import RadioIcon from '../../../assets/images/icons/radio.svg';
import RefrigeratorIcon from '../../../assets/images/icons/refrigerator.svg';
import MicrowaveIcon from '../../../assets/images/icons/microwave.svg';
import GasIcon from '../../../assets/images/icons/gas.svg';
import WaterIcon from '../../../assets/images/icons/water.svg';
import EngineIcon from '../../../assets/images/icons/fuel-pump.svg';
import AutomaticIcon from '../../../assets/images/icons/automatic.svg';
import HeartIcon from '../../../assets/images/icons/heart.svg';
import HeartOutlineIcon from '../../../assets/images/icons/heart-outline.svg';
import StarOutlineIcon from '../../../assets/images/icons/star-outline.svg';
import LocationIcon from '../../../assets/images/icons/map.svg';

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
    return price?.toFixed(2) || '0.00';
  };

  // Özellik ikonları
  const getFeatureIcon = (feature) => {
    const icons = {
      engine: EngineIcon,
      AC: AcIcon,
      automatic: AutomaticIcon,
      bathroom: BathroomIcon,
      kitchen: KitchenIcon,
      TV: TvIcon,
      radio: RadioIcon,
      refrigerator: RefrigeratorIcon,
      microwave: MicrowaveIcon,
      gas: GasIcon,
      water: WaterIcon,
    };
    
    const IconComponent = icons[feature];
    return IconComponent ? <img src={IconComponent} alt={feature} className={styles.featureIcon} /> : null;
  };

  return (
    <div className={styles.camperCard}>
      <div className={styles.imageContainer}>
        <img 
          src={camper.gallery?.[0]?.original || camper.img || 'https://via.placeholder.com/300x200'} 
          alt={camper.name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{camper.name}</h3>
          <div className={styles.priceSection}>
            <span className={styles.price}>€{formatPrice(camper.price)}
              <button 
          className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
          onClick={handleFavoriteClick}
        >
          <img 
            src={isFavorite ? HeartIcon : HeartOutlineIcon} 
            alt="favorite" 
            className={styles.favoriteIcon}
          />
        </button>
            </span>
          </div>
        </div>

        <div className={styles.ratingLocation}>
          <div className={styles.rating}>
            <img src={StarOutlineIcon} alt="star" className={styles.starIcon} />
            <span>{camper.rating || 0} ({camper.reviews?.length || 0} reviews)</span>
          </div>
          <div className={styles.location}>
            <img src={LocationIcon} alt="location" className={styles.locationIcon} />
            <span>{camper.location}</span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {camper.automatic && (
            <span className={styles.feature}>
              {getFeatureIcon('automatic')} {camper.automatic}
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
          {camper.TV && (
            <span className={styles.feature}>
              {getFeatureIcon('TV')} TV
            </span>
          )}
          {camper.radio && (
            <span className={styles.feature}>
              {getFeatureIcon('radio')} Radio
            </span>
          )}
          {camper.refrigerator && (
            <span className={styles.feature}>
              {getFeatureIcon('refrigerator')} Refrigerator
            </span>
          )}
          {camper.microwave && (
            <span className={styles.feature}>
              {getFeatureIcon('microwave')} Microwave
            </span>
          )}
          {camper.gas && (
            <span className={styles.feature}>
              {getFeatureIcon('gas')} Gas
            </span>
          )}
          {camper.water && (
            <span className={styles.feature}>
              {getFeatureIcon('water')} Water
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