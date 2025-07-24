// components/Card.jsx
import React from 'react';

export default function Card({ label, value, avg, icon, chartType }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border hover:shadow-md transition w-full">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-3">
        <span className="bg-green-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium">
          Avg {avg}
        </span>
        <span className="text-lg sm:text-xl">{icon}</span>
      </div>

      {/* Label */}
      <div className="text-base sm:text-lg font-semibold text-gray-800">{label}</div>

      {/* Value */}
      <div className="text-xl sm:text-2xl font-bold text-gray-700">{value}</div>

      {/* Chart Placeholder */}
      <div className="mt-3 sm:mt-4 bg-gray-100 h-20 sm:h-24 rounded-md flex items-center justify-center text-gray-400 text-xs sm:text-sm">
        {chartType} chart
      </div>
    </div>
  );
}
