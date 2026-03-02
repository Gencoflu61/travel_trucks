import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCampers, clearCampers, incrementPage } from '../../redux/slices/campersSlice';
import CamperList from '../../components/campers/CamperList/CamperList';
import LocationFilter from '../../components/filters/LocationFilter/LocationFilter';
import VehicleTypeFilter from '../../components/filters/VehicleTypeFilter/VehicleTypeFilter';
import EquipmentFilter from '../../components/filters/EquipmentFilter/EquipmentFilter';
import Button from '../../components/common/Button/Button';
import Loader from '../../components/common/Loader/Loader';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, loading, page, limit, total } = useSelector((state) => state.campers);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    console.log('Filtreler değişti:', filters);
    
    // Filtreleri API parametrelerine dönüştür
    const filterParams = buildFilterParams();
    console.log('API parametreleri:', filterParams);
    
    // Sayfa 1'den başla
    dispatch(clearCampers());
    dispatch(getCampers({ ...filterParams, page: 1, limit }));
  }, [
    filters.location, 
    filters.vehicleType,
    filters.equipment.AC,
    filters.equipment.bathroom,
    filters.equipment.kitchen,
    filters.equipment.TV,
    filters.equipment.radio,
    filters.equipment.refrigerator,
    filters.equipment.microwave,
    filters.equipment.gas,
    filters.equipment.water
  ]);

  const buildFilterParams = () => {
    const params = {
      page: 1,
      limit: limit
    };
    
    // Lokasyon filtresi
    if (filters.location && filters.location.trim() !== '') {
      params.location = filters.location;
    }
    
    // Araç tipi filtresi
    if (filters.vehicleType && filters.vehicleType !== '') {
      params.form = filters.vehicleType;
    }
    
    // Ek ekipman filtreleri - sadece true olanları ekle
    Object.entries(filters.equipment).forEach(([key, value]) => {
      if (value === true) {
        params[key] = true;
      }
    });
    
    return params;
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(incrementPage());
    
    const filterParams = buildFilterParams();
    dispatch(getCampers({ ...filterParams, page: nextPage, limit }));
  };

  // Yüklenecek daha fazla kart var mı kontrol et
  const hasMore = items.length < total;

  return (
    <div className={styles.catalogPage}>
      <div className="container">
        <div className={styles.catalogLayout}>
          <aside className={styles.filtersSidebar}>
            <h2 className={styles.filtersTitle}>Filters</h2>
            <LocationFilter />
            <VehicleTypeFilter />
            <EquipmentFilter />
            
            {/* BURADAKİ TEST DİV'İ KALDIRDIK */}
            
          </aside>

          <main className={styles.catalogMain}>
            {loading && items.length === 0 ? (
              <Loader />
            ) : (
              <>
                {items.length > 0 ? (
                  <>
                    <CamperList campers={items} />
                    
                    {hasMore && (
                      <div className={styles.loadMoreContainer}>
                        <Button 
                          onClick={handleLoadMore} 
                          variant="secondary"
                          disabled={loading}
                        >
                          {loading ? 'Yükleniyor...' : 'Daha Fazla Göster'}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  !loading && (
                    <p className={styles.noResults}>
                      Kriterlerinize uygun kampçı bulunamadı.
                    </p>
                  )
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;