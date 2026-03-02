import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCamperById } from '../../redux/slices/campersSlice';
import Loader from '../../components/common/Loader/Loader';
import Notification from '../../components/common/Notification/Notification';
import Button from '../../components/common/Button/Button';
import styles from './CamperDetailPage.module.css';

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
    // Form validasyonu
    if (!formData.name || !formData.email || !formData.date) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    // Başarılı rezervasyon mesajı
    setNotification({
      type: 'success',
      message: 'Booking successful! We will contact you soon.'
    });

    // Formu temizle
    setFormData({
      name: '',
      email: '',
      date: '',
      comment: '',
    });
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

        {/* Başlık ve Fiyat */}
        <div className={styles.header}>
          <h1 className={styles.title}>{camper.name}</h1>
          <div className={styles.priceSection}>
            <span className={styles.price}>€{formatPrice(camper.price)}</span>
          </div>
        </div>

        {/* Rating ve Lokasyon */}
        <div className={styles.ratingLocation}>
          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            <span>{camper.rating || 0} ({camper.reviews?.length || 0} reviews)</span>
          </div>
          <div className={styles.location}>
            📍 {camper.location}
          </div>
        </div>

        {/* Galeri */}
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

        {/* Açıklama */}
        <p className={styles.description}>{camper.description}</p>

        {/* Tab Menü */}
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

        {/* İçerik */}
        <div className={styles.content}>
          <div className={styles.mainContent}>
            {activeTab === 'features' ? (
              <div className={styles.features}>
                <h3 className={styles.sectionTitle}>Vehicle Features</h3>
                <div className={styles.featureGrid}>
                  {/* Temel Özellikler */}
                  {camper.transmission && (
                    <div className={styles.featureItem}>⚙️ Transmission: {camper.transmission}</div>
                  )}
                  {camper.engine && (
                    <div className={styles.featureItem}>🔧 Engine: {camper.engine}</div>
                  )}
                  {camper.AC && (
                    <div className={styles.featureItem}>❄️ AC</div>
                  )}
                  {camper.bathroom && (
                    <div className={styles.featureItem}>🚽 Bathroom</div>
                  )}
                  {camper.kitchen && (
                    <div className={styles.featureItem}>🍳 Kitchen</div>
                  )}
                  {camper.TV && (
                    <div className={styles.featureItem}>📺 TV</div>
                  )}
                  {camper.radio && (
                    <div className={styles.featureItem}>📻 Radio</div>
                  )}
                  {camper.refrigerator && (
                    <div className={styles.featureItem}>🧊 Refrigerator</div>
                  )}
                  {camper.microwave && (
                    <div className={styles.featureItem}>🔥 Microwave</div>
                  )}
                  {camper.gas && (
                    <div className={styles.featureItem}>⛽ Gas</div>
                  )}
                  {camper.water && (
                    <div className={styles.featureItem}>💧 Water</div>
                  )}
                </div>

                <h3 className={styles.sectionTitle}>Vehicle Details</h3>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>Form: {camper.form || 'N/A'}</div>
                  <div className={styles.detailItem}>Length: {camper.length || 'N/A'}</div>
                  <div className={styles.detailItem}>Width: {camper.width || 'N/A'}</div>
                  <div className={styles.detailItem}>Height: {camper.height || 'N/A'}</div>
                  <div className={styles.detailItem}>Tank: {camper.tank || 'N/A'}</div>
                  <div className={styles.detailItem}>Consumption: {camper.consumption || 'N/A'}</div>
                </div>
              </div>
            ) : (
              <div className={styles.reviews}>
                <h3 className={styles.sectionTitle}>Customer Reviews</h3>
                {camper.reviews?.length > 0 ? (
                  camper.reviews.map((review, index) => (
                    <div key={index} className={styles.reviewCard}>
                      <div className={styles.reviewHeader}>
                        <span className={styles.reviewerName}>{review.reviewer_name}</span>
                        <div className={styles.reviewRating}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? styles.starFilled : styles.star}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className={styles.reviewComment}>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet</p>
                )}
              </div>
            )}
          </div>

          {/* Rezervasyon Formu */}
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