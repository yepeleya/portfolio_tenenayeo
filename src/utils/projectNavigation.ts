import { useLoading } from '../context/LoadingContext';

// Types pour les projets
export interface ProjectLink {
  type: 'live' | 'demo' | 'unavailable';
  url: string;
  hosting?: 'github-pages' | 'netlify' | 'vercel' | 'other';
}

// Hook pour gérer les liens de projets
export const useProjectNavigation = () => {
  const { showLoadingFor } = useLoading();

  const navigateToProject = async (external: string, title: string) => {
    // Si le lien est "#", montrer un message informatif
    if (external === '#' || !external) {
      showLoadingFor(1000, 'Préparation de la démo...');
      setTimeout(() => {
        alert(`🚀 Le projet "${title}" sera bientôt disponible en ligne !\n\n` +
              `En attendant, vous pouvez consulter le code source sur GitHub.`);
      }, 1000);
      return;
    }

    // Si c'est un vrai lien, montrer un chargement et rediriger
    showLoadingFor(800, 'Ouverture du projet...');
    setTimeout(() => {
      window.open(external, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  return { navigateToProject };
};

// Fonction pour générer des URLs GitHub Pages automatiquement
export const generateGitHubPagesURL = (githubUrl: string): string => {
  try {
    // Extraire username et repo depuis l'URL GitHub
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (match) {
      const [, username, repo] = match;
      return `https://${username}.github.io/${repo}`;
    }
    return '#';
  } catch (error) {
    console.error('Erreur lors de la génération de l\'URL GitHub Pages:', error);
    return '#';
  }
};

// Fonction pour vérifier si une URL est accessible
export const checkProjectAvailability = async (url: string): Promise<boolean> => {
  if (url === '#' || !url) return false;
  
  try {
    await fetch(url, { 
      method: 'HEAD', 
      mode: 'no-cors' // Pour éviter les problèmes CORS
    });
    return true; // Si on arrive ici, l'URL répond
  } catch (error) {
    return false; // L'URL n'est pas accessible
  }
};

export default useProjectNavigation;
