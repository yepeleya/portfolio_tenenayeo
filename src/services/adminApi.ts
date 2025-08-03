import axios from 'axios';
import { TokenManager } from '../utils/tokenManager';

const API_BASE_URL = 'http://localhost:3002/api'; // Forcer le bon port

console.log('🔗 API Configuration:', {
  baseURL: API_BASE_URL,
  environment: process.env.NODE_ENV,
  envVar: process.env.REACT_APP_API_URL,
  timestamp: new Date().toISOString()
});

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes de timeout
});

// Intercepteur pour ajouter le token d'authentification
adminApi.interceptors.request.use((config) => {
  const token = TokenManager.getValidToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs d'authentification
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/login';
    } else if (error.response?.status === 431) {
      // Erreur 431: Request Header Fields Too Large
      console.warn('En-têtes trop volumineux, nettoyage du token');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
    return Promise.reject(error);
  }
);

// Types
export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read_status: boolean;
}

export interface Feedback {
  id: number;
  name: string;
  email: string;
  feedback: string;
  type: 'suggestion' | 'bug' | 'compliment' | 'question';
  created_at: string;
  read_status: boolean;
}

export interface AdminStats {
  totalContacts: number;
  unreadContacts: number;
  todayContacts: number;
  totalFeedbacks: number;
  unreadFeedbacks: number;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: AdminUser;
}

// Services d'authentification
export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      console.log('🔐 Tentative de connexion...', {
        username,
        url: `${API_BASE_URL}/auth/login`,
        timestamp: new Date().toISOString()
      });
      
      const response = await adminApi.post<LoginResponse>('/auth/login', {
        username,
        password,
      });
      
      console.log('✅ Connexion réussie:', {
        status: response.status,
        hasToken: !!response.data.token,
        user: response.data.user?.username
      });
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur de connexion:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        baseURL: error.config?.baseURL
      });
      throw error;
    }
  },

  verify: async (): Promise<{ valid: boolean; user: AdminUser }> => {
    const response = await adminApi.get<{ valid: boolean; user: AdminUser }>('/auth/verify');
    return response.data;
  },
};

// Services pour les contacts
export const contactService = {
  getAll: async (): Promise<Contact[]> => {
    const response = await adminApi.get<Contact[]>('/admin/contacts');
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await adminApi.delete(`/admin/contacts/${id}`);
  },
};

// Services pour les feedbacks
export const feedbackService = {
  getAll: async (): Promise<Feedback[]> => {
    const response = await adminApi.get<Feedback[]>('/admin/feedbacks');
    return response.data;
  },
};

// Services pour les statistiques
export const statsService = {
  getAll: async (): Promise<AdminStats> => {
    const response = await adminApi.get<AdminStats>('/admin/stats');
    return response.data;
  },
};

export default adminApi;