import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const searchEmployees = (params) => API.get('/employees/search', { params });
export const getEmployeeProfile = (id) => API.get(`/employees/profile/${id}`);
export const getEmployeeDashboard = () => API.get('/employees/dashboard');
export const updateEmployeeProfile = (data) => API.put('/employees/profile', data);
export const getEmployerDashboard = () => API.get('/employers/dashboard');
export const sendJobRequest = (data) => API.post('/employers/job-request', data);
export const acceptJob = (id) => API.post(`/jobs/${id}/accept`);
export const rejectJob = (id) => API.post(`/jobs/${id}/reject`);
export const completeJob = (id) => API.post(`/jobs/${id}/complete`);
export const createVouch = (data) => API.post('/vouches/create', data);
export const getEmployeeVouches = (employeeId) => API.get(`/vouches/employee/${employeeId}`);

export default API;
