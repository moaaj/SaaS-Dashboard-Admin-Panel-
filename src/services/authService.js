import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your actual API URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during login' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during registration' };
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  hasRole: (role) => {
    const user = authService.getCurrentUser();
    return user?.role === role;
  },

  // Mock login for development (remove in production)
  mockLogin: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user data
    const mockUsers = [
      {
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
      },
      {
        email: 'editor@example.com',
        password: 'editor123',
        role: 'editor',
        name: 'Editor User',
      },
      {
        email: 'viewer@example.com',
        password: 'viewer123',
        role: 'viewer',
        name: 'Viewer User',
      },
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const token = 'mock-jwt-token-' + Math.random();
      const userData = {
        id: Math.random(),
        email: user.email,
        name: user.name,
        role: user.role,
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { token, user: userData };
    }
    
    throw { message: 'Invalid credentials' };
  },
}; 