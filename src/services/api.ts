//api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
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

// Load token on startup
const savedToken = localStorage.getItem('token');
if (savedToken) {
  setAuthToken(savedToken);
}

// ----------------------------
// Correct Backend Response Types
// ----------------------------

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string; // ADDED because backend needs it
}

export interface LoginData {
  email: string;
  password: string;
}

// Backend Login Response
export interface LoginResponse {
  message: string;
  token: string;
}

// Backend Register Response
export interface RegisterResponse {
  success: boolean;
  message: string;
}

// ----------------------------
// Auth API
// ----------------------------

export const auth = {
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);

    // Save JWT token
    if (response.data.token) {
      setAuthToken(response.data.token);
    }

    return response.data;
  },

  logout: () => {
    setAuthToken('');
  },
};

export default api;
