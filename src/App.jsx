// App.jsx
import React from 'react';
import Card from './components/Card';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F6F9F6] p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-green-700">
              Greya Smart Composter
            </h1>
            <p className="text-gray-500 text-sm">
              A Smart IoT-Enabled Device for On-Site Wet Waste Processing
            </p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
            <i className="fas fa-user"></i>
          </div>
        </div>

        {/* Date Range + Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Date Inputs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center text-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="text-gray-700 font-medium">Start Date:</label>
              <input
                type="date"
                className="border px-2 py-1 rounded-md"
                defaultValue="2025-05-28"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label className="text-gray-700 font-medium">End Date:</label>
              <input
                type="date"
                className="border px-2 py-1 rounded-md"
              />
            </div>
          </div>

          {/* Report Button */}
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
            Generate Report
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card label="Humidity" value="50%" avg="3.33" icon="🌿" chartType="line" />
          <Card label="Temperature" value="30,4°C" avg="2.03" icon="🌡️" chartType="bar" />
          <Card label="pH" value="5,4" avg="0.36" icon="🌡️" chartType="pie" />
          <Card label="H₂S" value="--" avg="NaN" icon="🧪" chartType="line" />
          <Card label="PH" value="--" avg="35.13" icon="🧪" chartType="line" />
          <Card label="Methane" value="--" avg="435.13" icon="🌡️" chartType="line" />
        </div>
      </div>
    </div>
  );
}
