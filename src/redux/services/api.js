import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

const api = axios.create({
  baseURL: BASE_URL,
});


export const fetchAllCampers = async () => {
  try {
    const response = await api.get('/campers');
    console.log('API ham cevap:', response.data);
    
    
    let campersData = [];
    
    if (Array.isArray(response.data)) {
      campersData = response.data;
    } else if (response.data && response.data.items && Array.isArray(response.data.items)) {
      campersData = response.data.items;
    } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
      campersData = response.data.data;
    } else {
      console.error('Beklenmeyen veri yapısı:', response.data);
      campersData = [];
    }
    
    console.log('İşlenmiş kampçı verisi:', campersData);
    return campersData;
  } catch (error) {
    console.error('API Hatası:', error);
    throw error;
  }
};

export const fetchCampers = async (params = {}) => {
  try {
    const allCampers = await fetchAllCampers();
    
    if (!Array.isArray(allCampers)) {
      console.error('allCampers bir dizi değil:', allCampers);
      return {
        items: [],
        total: 0
      };
    }
    
    console.log('Filtreleme başlıyor. Toplam kampçı:', allCampers.length);
    console.log('Filtreleme parametreleri:', params);
    
   
    let filteredCampers = [...allCampers];
    
    // Lokasyon filtresi
    if (params.location && params.location.trim() !== '') {
      filteredCampers = filteredCampers.filter(camper => 
        camper.location && camper.location.toLowerCase().includes(params.location.toLowerCase())
      );
    }
    
    // Araç tipi filtresi (form)
    if (params.form && params.form !== '') {
      filteredCampers = filteredCampers.filter(camper => 
        camper.form === params.form
      );
    }
    
    // Ekipman filtreleri
    if (params.AC === true || params.AC === 'true') {
      filteredCampers = filteredCampers.filter(camper => camper.AC === true);
    }
    if (params.bathroom === true || params.bathroom === 'true') {
      filteredCampers = filteredCampers.filter(camper => camper.bathroom === true);
    }
    if (params.kitchen === true || params.kitchen === 'true') {
      filteredCampers = filteredCampers.filter(camper => camper.kitchen === true);
    }
    if (params.TV === true || params.TV === 'true') {
      filteredCampers = filteredCampers.filter(camper => camper.TV === true);
    }
    if (params.radio === true || params.radio === 'true') {
      filteredCampers = filteredCampers.filter(camper => camper.radio === true);
    }
    if (params.refrigerator === true || params.refrigerator === 'true') {
      filteredCampers = filteredCampers.filter(camper => camper.refrigerator === true);
    }
    if (params.microwave === true || params.microwave === 'true') {
      filteredCampers = filteredCampers.filter(camper => camper.microwave === true);
    }
    if (params.gas === true || params.gas === 'true') {
      filteredCampers = filteredCampers.filter(camper => camper.gas === true);
    }
    if (params.water === true || params.water === 'true') {
      filteredCampers = filteredCampers.filter(camper => camper.water === true);
    }
    
    console.log('Filtrelenmiş kampçı sayısı:', filteredCampers.length);
    
    // Sayfalama
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 4;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedCampers = filteredCampers.slice(start, end);
    
    return {
      items: paginatedCampers,
      total: filteredCampers.length
    };
  } catch (error) {
    console.error('Filtreleme Hatası:', error);
    return {
      items: [],
      total: 0
    };
  }
};

export const fetchCamperById = async (id) => {
  try {
    const response = await api.get(`/campers/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Hatası:', error);
    throw error;
  }
};

export default api;