"use client";

import { DropdownIcon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
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
import {
  getProvinceProducts,
  getProductPriceData,
  ProvinceProduct,
  ProductPriceResponse,
} from "@/lib/api/statistics";
import { toast } from "react-toastify";

interface ChartData {
  day: string; //  'day' cho rõ ràng
  [key: string]: number | string;
}

const weekOptions = [
  { value: "all", label: "Tất cả" },
  { value: "week1", label: "Tuần 1" },
  { value: "week2", label: "Tuần 2" },
  { value: "week3", label: "Tuần 3" },
  { value: "week4", label: "Tuần 4" },
];

/**
 * Mảng tên ngày trong tuần tiếng Anh để hiển thị trên biểu đồ
 */
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const StatisticsChart = () => {
  const [provinceProducts, setProvinceProducts] = useState<ProvinceProduct[]>([]);
  const [province1, setProvince1] = useState("");
  const [province2, setProvince2] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  /**
   * Fetch danh sách sản phẩm theo tỉnh ngay khi component mount
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProvinceProducts();
        setProvinceProducts(data);
      } catch (error) {
        toast.error("Không thể tải danh sách tỉnh.");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  /**
  * Fetch dữ liệu biểu đồ khi:
  * - province1, province2 thay đổi
  * - provinceProducts thay đổi (lần đầu load)
  * - selectedWeek thay đổi
  */
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const provincesToFetch = [province1, province2].filter(Boolean);
        if (provincesToFetch.length === 0) {
          setChartData([]);
          return;
        }

        const datasets: {
          [province: string]: { data: ProductPriceResponse[]; productName: string };
        } = {};

        // Lấy dữ liệu giá sản phẩm từ API cho từng tỉnh đã chọn
        for (const provinceName of provincesToFetch) {
          const provinceData = provinceProducts.find(
            (p) => p.provinceName === provinceName
          );
          if (!provinceData) continue;

          const productIds = [provinceData.productId];
          const data = await getProductPriceData(productIds, provinceData.provinceId);
          datasets[provinceName] = {
            data,
            productName: data[0].productName, // tên sản phẩm từ API
          };
        }

        const totalLength = datasets[provincesToFetch[0]].data[0].priceTrend.length;

        let start = 0;
        let end = totalLength;

        // Xác định range hiển thị dựa theo tuần được chọn
        if (selectedWeek && selectedWeek !== "all") {
          const weekIndex = parseInt(selectedWeek.replace("week", ""));
          const perWeek = 6; // 5 ngày mỗi tuần
          start = (weekIndex - 1) * perWeek;
          end = weekIndex * perWeek;
        }

        const newChartData: ChartData[] = [];

        // Build dữ liệu hiển thị cho chart
        for (let i = start; i < end; i++) {
          const point: ChartData = { day: weekDays[i % 6] };

          for (const provinceName of provincesToFetch) {
            const dataset = datasets[provinceName];
            const priceTrend = dataset.data[0].priceTrend;
            const productName = dataset.productName;

            // sử dụng productName làm key để hiển thị tên sản phẩm trên chart
            point[productName] = priceTrend[i];
          }
          newChartData.push(point);
        }

        setChartData(newChartData);
      } catch (error) {
        toast.error("Không thể tải dữ liệu biểu đồ.");
        console.error(error);
      }
    };

    fetchChartData();
  }, [province1, province2, provinceProducts, selectedWeek]);

  return (
    <div className="w-full h-auto bg-white rounded-xl p-6 shadow-lg">
      <div className="grid grid-cols-1 gap-4 md:flex md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-medium whitespace-nowrap">Thống kê</h2>

        {/* Province Select */}
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          {/* Province 1 */}
          <Select value={province1} onValueChange={setProvince1}>
            <SelectTrigger className="relative rounded-full px-4 pr-6 py-1 w-[120px] bg-white text-sm border-gray-200 shadow-sm [&>svg]:hidden">
              <SelectValue placeholder="Chọn tỉnh 1" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <DropdownIcon className="!w-2 !h-2" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-xs">
              <SelectGroup>
                {provinceProducts.map((p) => (
                  <SelectItem
                    key={p.provinceId}
                    value={p.provinceName}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors"
                  >
                    {p.provinceName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <span className="text-gray-500 font-medium text-sm">VS</span>

          {/* Province 2 */}
          <Select value={province2} onValueChange={setProvince2}>
            <SelectTrigger className="relative rounded-full px-4 pr-6 py-1 w-[120px] bg-white text-sm border-gray-200 shadow-sm [&>svg]:hidden">
              <SelectValue placeholder="Chọn tỉnh 2" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <DropdownIcon className="!w-2 !h-2" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-xs">
              <SelectGroup>
                {provinceProducts.map((p) => (
                  <SelectItem
                    key={p.provinceId}
                    value={p.provinceName}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors"
                  >
                    {p.provinceName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          {/* Week Select */}
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="relative rounded-full px-4 pr-6 py-1 w-[100px] bg-white text-sm border-gray-200 shadow-sm [&>svg]:hidden">
              <SelectValue placeholder="Tuần" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <DropdownIcon className="!w-2 !h-2" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-xs">
              <SelectGroup>
                {weekOptions.map((w) => (
                  <SelectItem
                    key={w.value}
                    value={w.value}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors"
                  >
                    {w.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => `${Number(value).toLocaleString()} đ`} />
            <Legend />
            {province1 &&
              chartData.length > 0 &&
              (() => {
                const productName = Object.keys(chartData[0]).find(
                  (key) => key !== "day"
                );
                return (
                  <Line
                    type="monotone"
                    dataKey={productName ?? ""}
                    name={productName ?? ""}
                    stroke="#3B82F6"
                    strokeWidth={3}
                  />
                );
              })()}
            {province2 &&
              chartData.length > 0 &&
              (() => {
                const productNames = Object.keys(chartData[0]).filter(
                  (key) => key !== "day"
                );
                if (productNames.length > 1) {
                  return (
                    <Line
                      type="monotone"
                      dataKey={productNames[1]}
                      name={productNames[1]}
                      stroke="#F59E0B"
                      strokeWidth={3}
                    />
                  );
                }
                return null;
              })()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsChart;
