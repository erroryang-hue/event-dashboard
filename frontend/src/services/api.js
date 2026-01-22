import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// Event APIs
export const getEvents = () => api.get('/events');
export const createEvent = (data) => api.post('/events', data);

// Registration APIs
export const getRegistrations = () => api.get('/registrations');
export const registerUser = (data) => api.post('/registrations', data);

// Analytics APIs
export const getAnalytics = () => api.get('/analytics');

export default api;
