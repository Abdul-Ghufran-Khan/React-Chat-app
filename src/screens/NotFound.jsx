import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-2xl mb-8">Oops! The page you are looking for does not exist.</p>
      <button 
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        onClick={goHome}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
