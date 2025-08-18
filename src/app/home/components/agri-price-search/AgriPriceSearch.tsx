"use client";

import { DropdownIcon, SearchIcon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

// 🔹 Mock data (sau này thay bằng API call)
const priceOptions = [
  { value: "asc", label: "Tăng dần" },
  { value: "desc", label: "Giảm dần" },
];

const provinceOptions = [
  { value: "long-an", label: "Long An" },
  { value: "ben-tre", label: "Bến Tre" },
  { value: "ca-mau", label: "Cà Mau" },
  { value: "kien-giang", label: "Kiên Giang" },
  { value: "tien-giang", label: "Tiền Giang" },
  { value: "binh-thuan", label: "Bình Thuận" },
];

const quantityOptions = [
  { value: "low", label: "Ít nhất" },
  { value: "high", label: "Nhiều nhất" },
];

const recommendedProvinces = [
  { id: "long-an", name: "Long An" },
  { id: "tien-giang", name: "Tiền giang" },
  { id: "ben-tre", name: "Bến Tre" },
  { id: "kien-giang", name: "Kiên Giang" },
  { id: "ca-mau", name: "Cà Mau" },
  { id: "binh-thuan", name: "Bình Thuận" },
];

export default function PriceFilterForm() {
  //  Có thể lưu state nếu bạn muốn lọc dữ liệu sau này
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [searchText, setSearchText] = useState("");

  return (
    <div
      className="bg-white/76 rounded-3xl px-6 pt-8 pb-10"
      style={{ boxShadow: "0 0 12px 0 rgba(4, 255, 0, 0.3)" }}
    >
      <h2 className="font-medium text-xl">GIÁ NÔNG SẢN</h2>

      <div className="flex flex-wrap gap-4 mt-4 items-center justify-between">
        {/* Ô tìm kiếm */}
        <div className="relative">
          <Input
            placeholder="..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-[297px] px-4 pr-10 py-2 text-sm rounded-full bg-[rgba(255,255,255,0.35)] font-medium text-black 
      border border-transparent shadow-xs custom-border-gradient 
      focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4">
            <SearchIcon fill="#C4C4C4" />
          </div>
        </div>

        {/* Dropdown Giá */}
        <Select value={selectedPrice} onValueChange={setSelectedPrice}>
          <SelectTrigger className="relative rounded-full px-2 pr-6 py-2 w-[135px] h-9 bg-[rgba(255,255,255,0.35)] text-sm font-medium text-black 
              border border-transparent shadow-xs custom-border-gradient flex justify-center items-center text-center [&>svg]:hidden
              focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 
              data-[state=open]:ring-0 data-[state=open]:outline-none">
            <SelectValue placeholder="GIÁ" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <DropdownIcon />
            </div>
          </SelectTrigger>
          {/* Nội dung dropdown */}
          <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-xs">
            <SelectGroup>
              {priceOptions.map((opt) => (
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

        {/* Dropdown Tỉnh */}
        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
          <SelectTrigger className="relative rounded-full px-2 pr-6 py-2 w-[135px] h-9 bg-[rgba(255,255,255,0.35)] text-sm font-medium text-black 
              border border-transparent shadow-xs custom-border-gradient flex justify-center items-center text-center [&>svg]:hidden
              focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 
              data-[state=open]:ring-0 data-[state=open]:outline-none">
            <SelectValue placeholder="Tỉnh" className="text-center" />
            {/* Custom SVG arrow thay thế arrow mặc định */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <DropdownIcon />
            </div>
          </SelectTrigger>
          {/* Nội dung dropdown */}
          <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-xs">
            <SelectGroup>
              {provinceOptions.map((opt) => (
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

        {/* Dropdown Số lượng */}
        <Select value={selectedQuantity} onValueChange={setSelectedQuantity}>
          <SelectTrigger className="relative rounded-full px-2 pr-6 py-2 w-[135px] h-9 bg-[rgba(255,255,255,0.35)] text-sm font-medium text-black 
              border border-transparent shadow-xs custom-border-gradient flex justify-center items-center text-center [&>svg]:hidden
              focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 
              data-[state=open]:ring-0 data-[state=open]:outline-none">
            <SelectValue placeholder="Số lượng" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <DropdownIcon />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-xs">
            <SelectGroup>
              {quantityOptions.map((opt) => (
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

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Đề xuất:</h2>

        <div className="border custom-border-gradient rounded-3xl px-8 py-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedProvinces.map((prov) => (
              <button
                key={prov.id}
                className="h-[50px] bg-gradient-to-r from-[#35EBB3] to-[#D7FFF3] text-center text-green-900 font-medium px-6 py-2 rounded-full transition hover:brightness-110"
              >
                {prov.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
