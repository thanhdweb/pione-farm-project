'use client';

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dữ liệu mẫu
const data = [
  { month: 'Jan', xoai: 20, man: 30 },
  { month: 'Feb', xoai: 35, man: 45 },
  { month: 'Mar', xoai: 60, man: 55 },
  { month: 'Apr', xoai: 50, man: 70 },
  { month: 'May', xoai: 45, man: 65 },
  { month: 'Jun', xoai: 50, man: 60 },
  { month: 'Jul', xoai: 70, man: 55 },
];

const provinces = ['Ben Tre', 'Long An', 'Tien Giang', 'Can Tho'];

const StatisticsChart = () => {
  const [province1, setProvince1] = useState('Ben Tre');
  const [province2, setProvince2] = useState('Long An');

  return (
    <div className="w-full h-auto bg-white rounded-xl p-6 shadow-lg">
      <div className='flex items-center justify-between mb-6'>
        <h2 className="text-xl font-semibold text-gray-800">Thống kê</h2>

        <div className="flex items-center space-x-2">
          {/* Dropdown 1 */}
          <div className="relative">
            <select
              value={province1}
              onChange={(e) => setProvince1(e.target.value)}
              className="appearance-none rounded-full border border-blue-200 text-gray-900 px-4 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  fill="gray"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.399 9.399a.85.85 0 0 1 1.202 0L12 13.798l4.399-4.399a.85.85 0 0 1 1.202 1.202l-5 5a.85.85 0 0 1-1.202 0l-5-5a.85.85 0 0 1 0-1.202"
                />
              </svg>
            </div>
          </div>

          <span className="text-gray-500 font-medium text-sm">VS</span>

          {/* Dropdown 2 */}
          <div className="relative">
            <select
              value={province2}
              onChange={(e) => setProvince2(e.target.value)}
              className="appearance-none rounded-full border border-blue-200 text-gray-900 px-4 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  fill="gray"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.399 9.399a.85.85 0 0 1 1.202 0L12 13.798l4.399-4.399a.85.85 0 0 1 1.202 1.202l-5 5a.85.85 0 0 1-1.202 0l-5-5a.85.85 0 0 1 0-1.202"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>



      {/* Biểu đồ */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="xoai" name="Xoài" stroke="#3B82F6" strokeWidth={3} />
            <Line type="monotone" dataKey="man" name="Mận" stroke="#F59E0B" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsChart;
