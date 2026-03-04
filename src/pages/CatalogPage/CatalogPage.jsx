import React, { useEffect, useState } from 'react';
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
  
  
  const [searchTriggered, setSearchTriggered] = useState(false);

  
  useEffect(() => {
    handleSearch();
  }, []);

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
    
    // Ek ekipman filtreleri 
    Object.entries(filters.equipment).forEach(([key, value]) => {
      if (value === true) {
        params[key] = true;
      }
    });
    
    return params;
  };

 
  const handleSearch = () => {
    console.log('Arama yapılıyor...', filters);
    
    const filterParams = buildFilterParams();
    console.log('Arama parametreleri:', filterParams);
    
    dispatch(clearCampers());
    dispatch(getCampers({ ...filterParams, page: 1, limit }));
    setSearchTriggered(true);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(incrementPage());
    
    const filterParams = buildFilterParams();
    dispatch(getCampers({ ...filterParams, page: nextPage, limit }));
  };

  // Yüklenecek daha fazla kart var mı kontrol etme
  const hasMore = items.length < total;

  // Aktif filtre var mı kontrol etme
  const hasActiveFilters = () => {
    if (filters.location && filters.location.trim() !== '') return true;
    if (filters.vehicleType && filters.vehicleType !== '') return true;
    
    return Object.values(filters.equipment).some(value => value === true);
  };

  return (
    <div className={styles.catalogPage}>
      <div className="container">
        <div className={styles.catalogLayout}>
          <aside className={styles.filtersSidebar}>
            <LocationFilter />
            <h2 className={styles.filtersTitle}>Filters</h2>
            
            <EquipmentFilter />
            <VehicleTypeFilter />
            
            <div className={styles.searchButtonContainer}>
              <Button 
                onClick={handleSearch} 
                variant="primary"
                disabled={loading}
                className={styles.searchButton}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
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
                         className={styles.loadMore}
                          onClick={handleLoadMore} 
                          variant="secondary"
                          disabled={loading}
                        >
                          {loading ? 'Loading...' : 'Load More'}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  !loading && searchTriggered && (
                    <div className={styles.noResultsContainer}>
                      {hasActiveFilters() ? (
                        // Filtre var ama sonuç yok
                        <p className={styles.noResults}>
                           No campers found matching your criteria.
                        </p>
                      ) : (
                        // Hiç filtre yok ve sonuç yok
                        <p className={styles.noResults}>
                          No campers available at the moment.
                        </p>
                      )}
                    </div>
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