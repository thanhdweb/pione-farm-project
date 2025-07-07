"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dữ liệu mẫu
const data = [
  { month: "Jan", xoai: 20, man: 30 },
  { month: "Feb", xoai: 35, man: 45 },
  { month: "Mar", xoai: 60, man: 55 },
  { month: "Apr", xoai: 50, man: 70 },
  { month: "May", xoai: 45, man: 65 },
  { month: "Jun", xoai: 50, man: 60 },
  { month: "Jul", xoai: 70, man: 55 },
];

const provinces = ["Ben Tre", "Long An", "Tien Giang", "Can Tho"];

const weekOptions = [
  { value: "week1", label: "Tuần 1" },
  { value: "week2", label: "Tuần 2" },
  { value: "week3", label: "Tuần 3" },
  { value: "week4", label: "Tuần 4" },
];

const StatisticsChart = () => {
  const [province1, setProvince1] = useState("");
  const [province2, setProvince2] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(""); // Tuần được chọn

  return (
    <div className="w-full h-auto bg-white rounded-xl p-6 shadow-lg">
      <div className="grid grid-cols-1 gap-4 md:flex md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-medium">Thống kê</h2>

        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          {/* Dropdown Tỉnh 1 */}
          <Select value={province1} onValueChange={setProvince1}>
            <SelectTrigger className="relative rounded-full px-4 pr-6 py-1 w-[130px] bg-white text-sm border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-300 [&>svg]:hidden">
              <SelectValue placeholder="Chọn tỉnh 1" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    fill="gray"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.399 9.399a.85.85 0 0 1 1.202 0L12 13.798l4.399-4.399a.85.85 0 0 1 1.202 1.202l-5 5a.85.85 0 0 1-1.202 0l-5-5a.85.85 0 0 1 0-1.202"
                  />
                </svg>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-sm">
              <SelectGroup>
                {provinces.map((p) => (
                  <SelectItem
                    key={p}
                    value={p}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors"
                  >
                    {p}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <span className="text-gray-500 font-medium text-sm">VS</span>

          {/* Dropdown Tỉnh 2 */}
          <Select value={province2} onValueChange={setProvince2}>
            <SelectTrigger className="relative rounded-full px-4 pr-6 py-1 w-[130px] bg-white text-sm border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-300 [&>svg]:hidden">
              <SelectValue placeholder="Chọn tỉnh 2" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    fill="gray"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.399 9.399a.85.85 0 0 1 1.202 0L12 13.798l4.399-4.399a.85.85 0 0 1 1.202 1.202l-5 5a.85.85 0 0 1-1.202 0l-5-5a.85.85 0 0 1 0-1.202"
                  />
                </svg>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-sm">
              <SelectGroup>
                {provinces.map((p) => (
                  <SelectItem
                    key={p}
                    value={p}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors"
                  >
                    {p}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Dropdown Tuần */}
        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger className="relative rounded-lg px-2 pr-5 py-1 w-[80px] bg-white text-sm border-none shadow-md [&>svg]:hidden">
            <SelectValue placeholder="Tuần" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="!w-3 !h-3"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.248959 0.248959C0.580905 -0.0829864 1.1191 -0.0829864 1.45104 0.248959L5.85 4.64792L10.249 0.248959C10.5809 -0.0829864 11.1191 -0.0829864 11.451 0.248959C11.783 0.580905 11.783 1.1191 11.451 1.45104L6.45104 6.45104C6.11909 6.78299 5.5809 6.78299 5.24896 6.45104L0.248959 1.45104C-0.0829864 1.1191 -0.0829864 0.580905 0.248959 0.248959Z"
                  fill="#7C8DB5"
                />
              </svg>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-sm">
            <SelectGroup>
              {weekOptions.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
            <Line
              type="monotone"
              dataKey="xoai"
              name="Xoài"
              stroke="#3B82F6"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="man"
              name="Mận"
              stroke="#F59E0B"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsChart;
