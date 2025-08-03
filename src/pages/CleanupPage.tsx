import React from 'react';
import { TokenManager } from '../utils/tokenManager';

const CleanupPage: React.FC = () => {
  const handleClearTokens = () => {
    TokenManager.clearToken();
    alert('Token supprimé avec succès!');
    window.location.reload();
  };

  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les données locales ?')) {
      TokenManager.clearAll();
      alert('Toutes les données locales ont été supprimées!');
      window.location.reload();
    }
  };

  const checkTokenStatus = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Aucun token trouvé');
      return;
    }
    
    alert(`Token trouvé - Taille: ${token.length} caractères\nValide: ${TokenManager.getValidToken() ? 'Oui' : 'Non'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Nettoyage des données
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={checkTokenStatus}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Vérifier le statut du token
          </button>
          
          <button
            onClick={handleClearTokens}
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
          >
            Supprimer le token seulement
          </button>
          
          <button
            onClick={handleClearAll}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            Supprimer toutes les données locales
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-600 text-center">
          <p>Utilisez cette page si vous rencontrez des erreurs liées aux tokens d'authentification.</p>
        </div>
      </div>
    </div>
  );
};

export default CleanupPage;
