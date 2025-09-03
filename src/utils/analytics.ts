// src/utils/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Configuration Google Analytics
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Remplacez par votre ID

// Initialiser Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Charger le script Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialiser gtag
    window.gtag = window.gtag || function() {
      (window.gtag as any).q = (window.gtag as any).q || [];
      (window.gtag as any).q.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Suivre les pages vues
export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: path,
    });
  }
};

// Suivre les événements personnalisés
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Événements spécifiques au portfolio
export const trackProjectClick = (projectName: string) => {
  trackEvent('click', 'project', projectName);
};

export const trackContactForm = (action: 'submit' | 'error') => {
  trackEvent(action, 'contact_form');
};

export const trackCVDownload = () => {
  trackEvent('download', 'cv', 'CV_Tenena.pdf');
};

export const trackThemeToggle = (theme: 'dark' | 'light') => {
  trackEvent('toggle', 'theme', theme);
};
