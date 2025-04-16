
import React from 'react';

const BottomNavBar = () => {
  return (
    <nav className="w-full bg-white shadow-md p-2 flex justify-around items-center"> {/* Basic styling */}
      {/* Placeholder for navigation icons/links */}
      <a href="#" className="text-blue-600 text-center">
        <div>Icon</div>
        <div className="text-xs">Dashboard</div>
      </a>
      <a href="#" className="text-blue-600 text-center">
        <div>Icon</div>
        <div className="text-xs">Tasks</div>
      </a>
      <a href="#" className="text-blue-600 text-center">
        <div>Icon</div>
        <div className="text-xs">Rewards</div>
      </a>
      <a href="#" className="text-blue-600 text-center">
        <div>Icon</div>
        <div className="text-xs">Community</div>
      </a>
      <a href="#" className="text-blue-600 text-center">
        <div>Icon</div>
        <div className="text-xs">Profile</div>
      </a>
    </nav>
  );
};

export default BottomNavBar;
