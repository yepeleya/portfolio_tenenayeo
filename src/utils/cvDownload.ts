// Fonction utilitaire pour télécharger le CV
export const downloadCV = async () => {
  try {
    // Pour GitHub Pages, utiliser le chemin complet avec le nom du repo
    const baseUrl = window.location.hostname === 'localhost' 
      ? '' 
      : '/portfolio_tenenayeo';
    
    // Vérifier d'abord si le fichier existe
    const cvUrl = `${baseUrl}/CV_Tenena.pdf`;
    
    try {
      const response = await fetch(cvUrl, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Fichier CV non trouvé');
      }
    } catch (fetchError) {
      console.warn('Impossible de vérifier le fichier CV, tentative de téléchargement direct...');
    }
    
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV_Tenena.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('CV téléchargé avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors du téléchargement du CV:', error);
    
    // Fallback vers l'ouverture dans un nouvel onglet
    try {
      const baseUrl = window.location.hostname === 'localhost' 
        ? '' 
        : '/portfolio_tenenayeo';
      window.open(`${baseUrl}/CV_Tenena.pdf`, '_blank');
      return true;
    } catch (fallbackError) {
      console.error('Erreur lors du fallback:', fallbackError);
      alert('Désolé, le CV n\'est pas disponible en téléchargement pour le moment.');
      return false;
    }
  }
};

// Fonction avec gestion du chargement
export const downloadCVWithLoading = async (
  showLoading?: (loading: boolean, message?: string) => void
) => {
  try {
    if (showLoading) {
      showLoading(true, 'Préparation du téléchargement...');
    }
    
    // Simulation d'un petit délai pour montrer le chargement
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = await downloadCV();
    
    if (showLoading) {
      showLoading(false);
    }
    
    return result;
  } catch (error) {
    if (showLoading) {
      showLoading(false);
    }
    console.error('Erreur lors du téléchargement du CV:', error);
    return false;
  }
};
