import React from 'react';

const DebugAuth: React.FC = () => {
  const token = localStorage.getItem('adminToken');
  
  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="font-bold">Debug Auth</h3>
      <p>Token: {token ? 'Present' : 'Not found'}</p>
    </div>
  );
};

export default DebugAuth;
