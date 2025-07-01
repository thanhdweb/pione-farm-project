"use client";

import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DropdownIcon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import CustomDatePicker from '@/components/ui/CustomDatePicker';

const sampleData = [
    {
        date: '2025-10-12',
        item: 'Xoài',
        unit: '10K/KG',
        marketPrice: '15K/KG',
        gardenPrice: '10K/KG',
    },
    {
        date: '2025-10-12',
        item: 'Xoài',
        unit: '10K/KG',
        marketPrice: '15K/KG',
        gardenPrice: '10K/KG',
    },
    {
        date: '2025-10-12',
        item: 'Xoài',
        unit: '10K/KG',
        marketPrice: '15K/KG',
        gardenPrice: '10K/KG',
    },
    {
        date: '2025-10-12',
        item: 'Xoài',
        unit: '10K/KG',
        marketPrice: '15K/KG',
        gardenPrice: '10K/KG',
    },
    {
        date: '2025-10-12',
        item: 'Xoài',
        unit: '10K/KG',
        marketPrice: '15K/KG',
        gardenPrice: '10K/KG',
    },
    {
        date: '2025-10-12',
        item: 'Xoài',
        unit: '10K/KG',
        marketPrice: '15K/KG',
        gardenPrice: '10K/KG',
    },
    {
        date: '2025-10-12',
        item: 'Xoài',
        unit: '10K/KG',
        marketPrice: '15K/KG',
        gardenPrice: '10K/KG',
    },
];

// data mãu nó ở đây
const sampleLocationData: LocationRow[] = [
    { date: '2025-10-12', location: 'Bến Tre', quantity: '10T' },
    { date: '2025-10-12', location: 'Xoài', quantity: '34T' },
    { date: '2025-10-12', location: 'Long An', quantity: '4T' },
    { date: '2025-10-12', location: 'Trà Vinh', quantity: '10T' },
    { date: '2025-10-12', location: 'Phan Thiết', quantity: '43T' },
];


const provinceOptions = [
    { label: 'TP.HCM', value: 'hcm' },
    { label: 'Hà Nội', value: 'hn' },
];

const itemOptions = [
    { label: 'Xoài', value: 'xoai' },
    { label: 'Chuối', value: 'chuoi' },
];

// Định nghĩa cấu trúc một dòng dữ liệu giá sản phẩm
export type PriceRow = {
    date: string;
    item: string;
    unit: string;
    marketPrice: string;
    gardenPrice: string;
};

// Định nghĩa cấu trúc một dòng dữ liệu địa điểm và sản lượng
export type LocationRow = {
    date: string;
    location: string;
    quantity: string;
};

// Props của component AdvancedSearch: hàm xuất dữ liệu ra ngoài
type AdvancedSearchProps = {
    onExportData: (products: PriceRow[], locations: LocationRow[]) => void;
};

const AdvancedSearch = ({ onExportData }: AdvancedSearchProps) => {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [productData] = useState(sampleData);
    //  const [productData, setProductData] = useState<PriceRow[]>(sampleData);
    const [locationData] = useState(sampleLocationData);
    // const [locationData, setLocationData] = useState<LocationRow[]>(sampleLocationData);


    const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
    const [toDate, setToDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        onExportData(productData, locationData);
    }, [productData, locationData, onExportData]);


    return (
        <div
            className="w-full bg-white/75 rounded-3xl grid grid-cols-1 gap-20 px-6 md:px-10 lg:px-14 py-6"
            style={{ boxShadow: '0 0 12px 0 rgba(4, 255, 0, 0.3)' }}
        >

            <div className="grid grid-cols-1 gap-12">
                <h3 className='text-xl font-medium text-black'>Tra cứu tổng hợp:</h3>

                {/* Filters */}
                <div className="grid grid-col gap-8 xl:flex xl:justify-between xl:items-center">
                    {/* ----1 */}
                    <div className='grid grid-rows-2 gap-2 sm:flex sm:items-center sm:justify-between xl:gap-14'>
                        <div className='w-full sm:w-[200px] lg:w-[288px] text-xl font-medium'>
                            <CustomDatePicker
                                placeholder="00:00:00"
                                value={fromDate} // Truyền giá trị từ cha xuống
                                onChange={(date) => setFromDate(date)} // Cập nhật khi chọn ngày
                            />
                        </div>

                        <p className="place-self-center text-center text-sm font-medium text-black leading-none">
                            Đến
                        </p>


                        <div className='w-full sm:w-[200px] lg:w-[288px] text-xl font-medium'>
                            <CustomDatePicker
                                placeholder="00:00:00"
                                value={toDate} // Truyền giá trị từ cha xuống
                                onChange={(date) => setToDate(date)} // Cập nhật khi chọn ngày
                            />
                        </div>
                    </div>

                    {/* Province Select */}
                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                        <SelectTrigger className="relative flex items-center justify-center rounded-full px-4 pr-10 w-full sm:w-[288px] !h-[54px] bg-white text-base font-medium text-black border border-gray-300 [&>svg]:hidden">
                            <SelectValue placeholder="Tỉnh" />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <DropdownIcon />
                            </div>

                        </SelectTrigger>
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
                </div>

                <div className='grid grid-rows-2 gap-12 md:flex md:items-center md:justify-between'>
                    {/* Item Select */}
                    <Select value={selectedItem} onValueChange={setSelectedItem}>
                        <SelectTrigger className="relative rounded-full px-4 pr-8 py-2 w-full md:w-[710px] !h-[54px] bg-white text-base border-gray-400 text-gray-400 [&>svg]:hidden">
                            <SelectValue placeholder="Mặt hàng" />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <DropdownIcon />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-sm">
                            <SelectGroup>
                                {itemOptions.map((opt) => (
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
                    <Button
                        className='text-white w-full md:max-w-[160px] lg:max-w-[302px] h-[54px] text-base py-2 bg-[#00A10B] rounded-full'
                        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
                    >
                        Tra cứu
                    </Button>
                </div>
            </div>

            {/* Danh sách địa điểm */}
            <div className='grid grid-cols-1 gap-12'>
                <h3 className="text-xl font-medium text-black">Dánh sách địa điểm:</h3>

                <div className="rounded-3xl border border-gray-200 shadow-sm bg-white/35 py-5 px-4 md:px-14">
                    <div className="max-h-[456px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
                        <table className="min-w-full text-sm text-left text-black">
                            <thead className="font-medium text-sx md:text-base">
                                <tr className="border-b border-[#D5D5D5]">
                                    <th className="w-1/5 py-3 px-4">Ngày tháng</th>
                                    <th className="w-3/5 py-3 px-4">Nơi thu thập</th>
                                    <th className="w-1/5 py-3 px-4">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locationData.map((row, idx) => (
                                    <tr key={idx} className="border-b border-[#D5D5D5] font-medium text-sx md:text-base">
                                        <td className="w-1/5 py-4 px-4">{row.date}</td>
                                        <td className="w-3/5 py-4 px-4">{row.location}</td>
                                        <td className="w-1/5 py-4 px-4">{row.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Dánh sách mặt hàng */}
            <div className="grid grid-cols-1 gap-12">
                <h3 className="text-xl font-medium text-black">Dánh sách mặt hàng:</h3>
                <div className="rounded-3xl border border-gray-200 shadow-sm bg-white/35 py-5 px-4 md:px-14">
                    <div className="max-h-[456px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
                        <table className="min-w-full text-sm text-left text-black">
                            <thead className="font-medium text-sx md:text-base">
                                <tr className='border-b border-[#D5D5D5]'>
                                    <th className="py-3 px-4">Ngày tháng</th>
                                    <th className="py-3 px-4">Tên mặt hàng</th>
                                    <th className="py-3 px-4">ĐVT</th>
                                    <th className="py-3 px-4">Giá tại chợ</th>
                                    <th className="py-3 px-4">Giá tại Vườn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData.map((item, idx) => (
                                    <tr key={idx} className="border-b border-[#D5D5D5] font-medium text-sx md:text-base">
                                        <td className="py-4 px-4">{item.date}</td>
                                        <td className="py-4 px-4">{item.item}</td>
                                        <td className="py-4 px-4">{item.unit}</td>
                                        <td className="py-4 px-4">{item.marketPrice}</td>
                                        <td className="py-4 px-4">{item.gardenPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdvancedSearch;
