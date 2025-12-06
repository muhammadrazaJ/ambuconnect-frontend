import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Initialize token from localStorage if available
const validToken = localStorage.getItem('token');
if (validToken) {
  setAuthToken(validToken);
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const auth = {
  register: async (data: RegisterData) => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
  login: async (data: LoginData) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
  logout: () => {
    setAuthToken('');
  },
};

export default api;
