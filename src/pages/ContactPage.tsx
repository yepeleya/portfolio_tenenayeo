import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact</h1>
        <div className="bg-gray-50 rounded-lg p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input 
                type="text" 
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea 
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
