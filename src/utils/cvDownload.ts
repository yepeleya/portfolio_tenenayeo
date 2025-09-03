// Fonction utilitaire pour télécharger le CV
export const downloadCV = async () => {
  try {
    // Créer un lien vers le fichier CV dans le dossier public
    const link = document.createElement('a');
    link.href = '/CV_Tenena.pdf';
    link.download = 'CV_Tenena.pdf';
    link.target = '_blank';
    
    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('CV téléchargé avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors du téléchargement du CV:', error);
    return false;
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
