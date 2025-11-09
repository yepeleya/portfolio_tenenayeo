import React from 'react';

const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mes Projets</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Système de Parrainage ISTC</h3>
            <p className="text-gray-600 mb-4">
              Application de gestion de parrainage développée en HTML/CSS/JavaScript avec génération PDF.
            </p>
            <a 
              href="https://github.com/yepeleya/projet-parrainage-aeistc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Voir sur GitHub →
            </a>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Plateforme JIG 2026</h3>
            <p className="text-gray-600 mb-4">
              Plateforme événementielle avec gestion multi-rôles, paiements et tableau de bord.
            </p>
            <a 
              href="https://github.com/yepeleya/jig2026" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Voir sur GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
