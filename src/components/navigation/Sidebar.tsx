// src/components/navigation/Sidebar.tsx
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-white shadow-md p-4"> {/* Basic styling */}
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      {/* Placeholder for navigation links */}
      <ul>
        <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">Dashboard</a></li>
        <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">Campaigns/Tasks</a></li>
        <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">Rewards</a></li>
        <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">Community</a></li>
        <li className="mb-2"><a href="#" className="text-blue-600 hover:underline">Settings/Profile</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
