// Utilitaire pour gérer les tokens d'authentification
export const TokenManager = {
  // Taille maximale recommandée pour les en-têtes HTTP
  MAX_TOKEN_SIZE: 8000,
  
  // Obtenir le token en vérifiant sa validité
  getValidToken(): string | null {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        return null;
      }
      
      // Vérifier la taille du token
      if (token.length > this.MAX_TOKEN_SIZE) {
        console.warn('Token trop volumineux détecté, suppression...');
        this.clearToken();
        return null;
      }
      
      // Vérifier le format basique du token JWT
      if (!token.includes('.') || token.split('.').length !== 3) {
        console.warn('Format de token invalide détecté, suppression...');
        this.clearToken();
        return null;
      }
      
      return token;
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      this.clearToken();
      return null;
    }
  },
  
  // Stocker un token après validation
  setToken(token: string): boolean {
    try {
      if (token.length > this.MAX_TOKEN_SIZE) {
        console.error('Tentative de stockage d\'un token trop volumineux');
        return false;
      }
      
      localStorage.setItem('adminToken', token);
      return true;
    } catch (error) {
      console.error('Erreur lors du stockage du token:', error);
      return false;
    }
  },
  
  // Supprimer le token
  clearToken(): void {
    try {
      localStorage.removeItem('adminToken');
    } catch (error) {
      console.error('Erreur lors de la suppression du token:', error);
    }
  },
  
  // Nettoyer tout le localStorage si nécessaire
  clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erreur lors du nettoyage du localStorage:', error);
    }
  }
};
