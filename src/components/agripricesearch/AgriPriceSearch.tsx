"use client";

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
    // 👇 Có thể lưu state nếu bạn muốn lọc dữ liệu sau này
    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState("");
    const [searchText, setSearchText] = useState("");

    return (
        <div className="bg-white rounded-3xl px-6 pt-8 pb-10" style={{ boxShadow: "0 0 12px 0 rgba(4, 255, 0, 0.3)" }}>
            <h2 className="font-bold">GIÁ NÔNG SẢN</h2>
            <div className="flex flex-wrap gap-4 mt-4 items-center justify-between">
                {/* Ô tìm kiếm */}
                <div className="relative">
                    <Input
                        placeholder="..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-[297px] rounded-full border-gray-400 outline-none hover:border-gray-600 px-4 py-2 text-sm text-black"
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5873 14.5873C14.0371 15.1376 13.1452 15.1376 12.5949 14.5873L10.1087 12.1011C9.08655 12.7568 7.87832 13.1475 6.57376 13.1475C2.94343 13.1475 0 10.2045 0 6.57373C0 2.94299 2.94343 0 6.57376 0C10.2046 0 13.1475 2.94293 13.1475 6.57373C13.1475 7.87785 12.7563 9.08655 12.1011 10.1092L14.5873 12.5954C15.1376 13.1456 15.1376 14.0371 14.5873 14.5873ZM6.57376 1.8782C3.98066 1.8782 1.87822 3.98016 1.87822 6.5737C1.87822 9.16724 3.98069 11.2692 6.57376 11.2692C9.16726 11.2692 11.2693 9.16724 11.2693 6.5737C11.2693 3.98016 9.16726 1.8782 6.57376 1.8782Z" fill="gray" />
                    </svg>
                </div>

                {/* Dropdown Giá */}
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger className="relative rounded-full px-2 pr-5 py-2 w-[120px] bg-white text-sm text-black [&>svg]:hidden">
                        <SelectValue placeholder="GIÁ" />
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
                            {priceOptions.map((opt) => (
                                <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                    className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors">
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Dropdown Tỉnh */}
                <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                    <SelectTrigger className="relative rounded-full px-2 pr-5 py-2 w-[120px] bg-white text-sm text-black [&>svg]:hidden">
                        <SelectValue placeholder="Tỉnh" className="text-center" />

                        {/* Custom SVG arrow thay thế arrow mặc định */}
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

                    {/* Nội dung dropdown */}
                    <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-sm">
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
                    <SelectTrigger className="relative rounded-full px-2  py-2 w-[120px] bg-white text-sm text-black [&>svg]:hidden">
                        <SelectValue placeholder="Số lượng" />
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
                            {quantityOptions.map((opt) => (
                                <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                    className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors">
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Đề xuất:</h2>

                <div className="border border-gray-300 rounded-3xl px-8 py-6 mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendedProvinces.map((prov) => (
                            <button
                                key={prov.id}
                                className="bg-gradient-to-r from-[#35EBB3] to-[#D7FFF3] text-center text-green-900 font-medium px-6 py-2 rounded-full transition hover:brightness-110"
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
