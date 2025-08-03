export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  year: number;
  status: 'completed' | 'in-progress' | 'planned';
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface Feedback {
  id: number;
  name: string;
  email?: string;
  feedback: string;
  type: 'suggestion' | 'bug' | 'compliment' | 'other';
  createdAt: string;
  read: boolean;
}

export interface Stats {
  totalVisitors: number;
  uniqueVisitors: number;
  projectClicks: number;
  cvDownloads: number;
  contactMessages: number;
  feedbacks: number;
}

export interface Visitor {
  id: number;
  ip: string;
  userAgent: string;
  visitDate: string;
  pages: string[];
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  logo?: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  field: string;
  duration: string;
  description?: string;
  logo?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'design' | 'other';
  level: number; // 1-5
  icon?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface ProjectFilter {
  category: string;
  technology: string;
  year: number | null;
  status: string;
}
