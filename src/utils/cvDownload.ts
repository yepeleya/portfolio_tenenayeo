// Fonction utilitaire pour télécharger le CV avec tracking
export const downloadCV = async () => {
  try {
    // Appeler l'API de téléchargement qui track automatiquement
    const response = await fetch('http://localhost:3002/api/download/cv');
    
    if (response.ok) {
      // Créer un blob à partir de la réponse
      const blob = await response.blob();
      
      // Créer un lien de téléchargement temporaire
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CV_Tenena_Yeo.pdf';
      
      // Déclencher le téléchargement
      document.body.appendChild(link);
      link.click();
      
      // Nettoyer
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('CV téléchargé avec succès');
      return true;
    } else {
      throw new Error('Erreur lors du téléchargement');
    }
  } catch (error) {
    console.error('Erreur téléchargement CV:', error);
    // Fallback vers l'ancien système si l'API ne fonctionne pas
    fallbackDownload();
    return false;
  }
};

// Système de fallback (ancien système)
const fallbackDownload = () => {
  const link = document.createElement('a');
  link.href = '/CV_Tenena.pdf'; // Chemin vers le fichier statique  
  link.download = 'CV_Tenena_Yeo.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
