import axios from 'axios';
const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

export const api = axios.create({
    baseURL: BASE_URL,
});

export const fetchCampers = async (params) => {
    const { data } = await api.get('/campers', { params });
    return data;
};

export const fetchCamperById = async (id) => {
    const { data } = await api.get(`/campers/${id}`);
    return data;
};