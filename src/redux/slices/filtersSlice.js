import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  vehicleType: '',
  equipment: {
    AC: false,
    bathroom: false,
    kitchen: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
    },
    toggleEquipment: (state, action) => {
      const equipment = action.payload;
      console.log('toggleEquipment reducer çalıştı:', equipment, 'önceki:', state.equipment[equipment]);
      state.equipment[equipment] = !state.equipment[equipment];
      console.log('toggleEquipment sonrası:', state.equipment[equipment]);
    },
    resetFilters: (state) => {
      state.location = '';
      state.vehicleType = '';
      state.equipment = {
        AC: false,
        bathroom: false,
        kitchen: false,
        TV: false,
        radio: false,
        refrigerator: false,
        microwave: false,
        gas: false,
        water: false,
      };
    },
  },
});

export const { setLocation, setVehicleType, toggleEquipment, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;