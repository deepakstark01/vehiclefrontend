import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#074839] to-[#121212] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Vehicle Check</h1>
        <Link 
          to="/auth" 
          className="px-6 py-3 bg-[#1DB954] text-black rounded-lg hover:bg-[#1DB954]/90 transition-all"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;