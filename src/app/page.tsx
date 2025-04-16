
import React from 'react';

export default function Home() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome to the Social Media Marketing Agent platform.</p>

      {/* Placeholder for Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Widget 1 Placeholder</div>
        <div className="bg-white p-4 rounded shadow">Widget 2 Placeholder</div>
        <div className="bg-white p-4 rounded shadow">Widget 3 Placeholder</div>
        {/* Add more widget placeholders as needed */}
      </div>
    </div>
  );
}
