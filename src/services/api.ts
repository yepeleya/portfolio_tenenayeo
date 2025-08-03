import axios from 'axios';
import { Project, Contact, Feedback, Stats, Visitor } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects
export const projectService = {
  getAll: () => api.get<Project[]>('/projects'),
  getById: (id: number) => api.get<Project>(`/projects/${id}`),
  getFeatured: () => api.get<Project[]>('/projects/featured'),
  incrementClicks: (id: number) => api.post(`/projects/${id}/click`),
  create: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'clicks'>) => 
    api.post<Project>('/projects', project),
  update: (id: number, project: Partial<Project>) => 
    api.put<Project>(`/projects/${id}`, project),
  delete: (id: number) => api.delete(`/projects/${id}`),
};

// Contacts
export const contactService = {
  create: (contact: Omit<Contact, 'id' | 'createdAt' | 'read'>) => 
    api.post<Contact>('/contacts', contact),
  getAll: () => api.get<Contact[]>('/contacts'),
  markAsRead: (id: number) => api.patch(`/contacts/${id}/read`),
  delete: (id: number) => api.delete(`/contacts/${id}`),
};

// Feedbacks
export const feedbackService = {
  create: (feedback: Omit<Feedback, 'id' | 'createdAt' | 'read'>) => 
    api.post<Feedback>('/feedbacks', feedback),
  getAll: () => api.get<Feedback[]>('/feedbacks'),
  markAsRead: (id: number) => api.patch(`/feedbacks/${id}/read`),
  delete: (id: number) => api.delete(`/feedbacks/${id}`),
};

// Stats
export const statsService = {
  get: () => api.get<Stats>('/stats'),
  incrementVisitor: (visitor: Omit<Visitor, 'id'>) => 
    api.post('/stats/visitor', visitor),
  incrementCVDownload: () => api.post('/stats/cv-download'),
};

// CV Download
export const cvService = {
  download: () => api.get('/cv/download', { responseType: 'blob' }),
  getStats: () => api.get('/cv/stats'),
};

export default api;
