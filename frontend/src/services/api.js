import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

// Events API
export const eventsAPI = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  getStats: () => api.get('/events/stats'),
  // DSA-powered endpoints
  search: (query) => api.get('/events/search', { params: { q: query } }),
  getConflicts: () => api.get('/events/conflicts'),
  getUpcoming: (count) => api.get('/events/upcoming', { params: { count } }),
  getEventsInRange: (start, end) => api.get('/events/range', { params: { start, end } }),
};

// Registrations API
export const registrationsAPI = {
  getAll: (params) => api.get('/registrations', { params }),
  search: (query) => api.get('/registrations/search', { params: { q: query } }),
  getById: (id) => api.get(`/registrations/${id}`),
  create: (data) => api.post('/registrations', data),
  update: (id, data) => api.put(`/registrations/${id}`, data),
  checkIn: (id) => api.post(`/registrations/${id}/checkin`),
  delete: (id) => api.delete(`/registrations/${id}`),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (params) => api.get('/analytics/dashboard', { params }),
  getRegistrationTrend: (params) => api.get('/analytics/registrations/trend', { params }),
  getSales: (params) => api.get('/analytics/sales', { params }),
  getQuickActions: (params) => api.get('/analytics/quick-actions', { params }),
  getTicketDistribution: (params) => api.get('/analytics/tickets/distribution', { params }),
};

export default api;