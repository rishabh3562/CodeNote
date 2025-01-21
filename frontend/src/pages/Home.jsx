import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../utils/constant';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Home
      </h1>
      <div className="max-w-4xl mx-auto space-y-4">
        {Object.entries(FRONTEND_ROUTES).map(([key, path]) => (
          <div
            key={key}
            className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg"
          >
            <span className="text-lg font-medium text-gray-700">{key}</span>
            <button
              onClick={() => navigate(path)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Go to {path}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
