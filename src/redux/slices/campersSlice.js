import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from '../services/api';

export const getCampers = createAsyncThunk(
  'campers/getCampers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchCampers(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCamperById = createAsyncThunk(
  'campers/getCamperById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchCamperById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    selectedCamper: null,
    total: 0,
    page: 1,
    limit: 4,
    loading: false,
    error: null,
  },
  reducers: {
    clearCampers: (state) => {
      state.items = [];
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetCampers: (state) => {
      state.items = [];
      state.page = 1;
      state.total = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Campers yükleniyor...');
      })
      .addCase(getCampers.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Campers yüklendi:', action.payload);
        
        if (action.payload && action.payload.items) {
          if (state.page === 1) {
            state.items = action.payload.items || [];
          } else {
            // Yeni gelenleri ekle (tekrar edenleri önle)
            const newItems = action.payload.items || [];
            const existingIds = new Set(state.items.map(item => item.id));
            const uniqueNewItems = newItems.filter(item => !existingIds.has(item.id));
            state.items = [...state.items, ...uniqueNewItems];
          }
          state.total = action.payload.total || 0;
        } else {
          console.warn('Beklenmeyen payload yapısı:', action.payload);
          state.items = [];
          state.total = 0;
        }
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Campers yüklenirken hata:', action.payload);
      })
      .addCase(getCamperById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCamper = action.payload;
      })
      .addCase(getCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCampers, incrementPage, resetCampers } = campersSlice.actions;
export default campersSlice.reducer;