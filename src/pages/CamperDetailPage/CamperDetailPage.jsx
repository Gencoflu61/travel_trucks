import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCamperById } from '../../redux/slices/campersSlice';
import Loader from '../../components/common/Loader/Loader';
import Notification from '../../components/common/Notification/Notification';
import Button from '../../components/common/Button/Button';
import styles from './CamperDetailPage.module.css';

// SVG ikonları
import AcIcon from '../../assets/images/icons/ac.svg';
import BathroomIcon from '../../assets/images/icons/bathroom.svg';
import KitchenIcon from '../../assets/images/icons/kitchen.svg';
import TvIcon from '../../assets/images/icons/tv.svg';
import RadioIcon from '../../assets/images/icons/radio.svg';
import RefrigeratorIcon from '../../assets/images/icons/refrigerator.svg';
import MicrowaveIcon from '../../assets/images/icons/microwave.svg';
import GasIcon from '../../assets/images/icons/gas.svg';
import WaterIcon from '../../assets/images/icons/water.svg';
import EngineIcon from '../../assets/images/icons/fuel-pump.svg';
import AutomaticIcon from '../../assets/images/icons/automatic.svg';
import LocationIcon from '../../assets/images/icons/map.svg';
import StarFilledIcon from '../../assets/images/icons/star-outline.svg'; 
import StarEmptyIcon from '../../assets/images/icons/star.svg'; 
const CamperDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCamper: camper, loading, error } = useSelector((state) => state.campers);
  const [activeTab, setActiveTab] = useState('features');
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(getCamperById(id));
    }
  }, [dispatch, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setNotification({
      type: 'success',
      message: 'Booking successful! We will contact you soon.'
    });

    setFormData({
      name: '',
      email: '',
      date: '',
      comment: '',
    });
  };

  const getFeatureIcon = (feature) => {
    const icons = {
      petrol: EngineIcon,
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

  const formatPrice = (price) => {
    return price?.toFixed(2) || '0.00';
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!camper) return <div className={styles.notFound}>Camper not found</div>;

  return (
    <div className={styles.detailPage}>
      <div className="container">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className={styles.header}>
          <h1 className={styles.title}>{camper.name}</h1>
          <div className={styles.ratingLocation}>
            <div className={styles.rating}>
              <img src={StarFilledIcon} alt="star" className={styles.starIcon} />
              <span>{camper.rating || 0} ({camper.reviews?.length || 0} reviews)</span>
            </div>
            <div className={styles.location}>
              <img src={LocationIcon} alt="location" className={styles.locationIcon} />
              <span>{camper.location}</span>
            </div>
          </div>
          <div className={styles.priceSection}>
            <span className={styles.price}>€{formatPrice(camper.price)}</span>
          </div>
        </div>

        <div className={styles.gallery}>
          {camper.gallery?.map((image, index) => (
            <img 
              key={index}
              src={image.original || image}
              alt={`${camper.name} - ${index + 1}`}
              className={styles.galleryImage}
            />
          ))}
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'features' ? styles.active : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.mainContent}>
            {activeTab === 'features' ? (
              <div className={styles.features}>
                <div className={styles.featuresContainer}>
                  {camper.automatic && (
                    <span className={styles.feature}>
                      {getFeatureIcon('automatic')} Automatic
                    </span>
                  )}
                  {camper.engine && (
                    <span className={styles.feature}>
                      {getFeatureIcon('petrol')} {camper.engine}
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

                <h3 className={styles.sectionTitle}>Vehicle Details</h3>
                <div className={styles.detailsTable}>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Form</span>
                    <span className={styles.detailsValue}>{camper.form || 'Panel truck'}</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Length</span>
                    <span className={styles.detailsValue}>{camper.length || '5.4 m'}</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Width</span>
                    <span className={styles.detailsValue}>{camper.width || '2.01 m'}</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Height</span>
                    <span className={styles.detailsValue}>{camper.height || '2.05 m'}</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Tank</span>
                    <span className={styles.detailsValue}>{camper.tank || '132 l'}</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Consumption</span>
                    <span className={styles.detailsValue}>{camper.consumption || '12.4l/100km'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.reviews}>
                {camper.reviews?.map((review, index) => {
                  const ratingValue = review.reviewer_rating || 0;
                  
                  const avatarColors = ['#e44848', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffcc5c', '#ff6f69'];
                  
                  return (
                    <div key={index} className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewerInfo}>
                          <div 
                            className={styles.avatar} 
                            style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
                          >
                            {review.reviewer_name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                        </div>
                        <div className={styles.reviewPart}>
                          <span className={styles.reviewerName}>{review.reviewer_name || 'Anonymous'}</span>
                          <div className={styles.reviewRating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <img 
                                key={star}
                                src={star <= ratingValue ? StarFilledIcon : StarEmptyIcon}
                                alt="star"
                                className={star <= ratingValue ? styles.starFilled : styles.starEmpty}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className={styles.reviewComment}>{review.comment || ''}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className={styles.sidebar}>
            <div className={styles.bookingForm}>
              <h3 className={styles.formTitle}>Book your campervan now</h3>
              <p className={styles.formSubtitle}>
                Stay connected! We're always ready to help you.
              </p>
              
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
                <input
                  type="date"
                  name="date"
                  placeholder='Booking date*'
                  value={formData.date}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
                <textarea
                  name="comment"
                  placeholder="Comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  rows="4"
                />
                <Button type="submit" variant="primary" className={styles.submitButton}>
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailPage;