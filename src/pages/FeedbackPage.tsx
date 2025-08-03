import React from 'react';

const FeedbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Retours & Témoignages</h1>
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600 italic mb-4">
              "Travail de qualité, très professionnel dans ses approches."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <p className="font-semibold">Client Anonyme</p>
                <p className="text-sm text-gray-500">Projet Web</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
