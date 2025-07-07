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



const provinceOptions = [
    { label: 'Cần Thơ', value: 'ct' },
    { label: 'An Giang', value: 'ag' },
    { label: 'Bến Tre', value: 'bt' },
    { label: 'Cà Mau', value: 'cm' },
    { label: 'Đồng Tháp', value: 'dt' },
    { label: 'Hậu Giang', value: 'hg' },
    { label: 'Kiên Giang', value: 'kg' },
    { label: 'Long An', value: 'la' },
    { label: 'Sóc Trăng', value: 'st' },
    { label: 'Tiền Giang', value: 'tg' },
    { label: 'Trà Vinh', value: 'tv' },
    { label: 'Vĩnh Long', value: 'vl' },
    { label: 'Bạc Liêu', value: 'bl' },
];

export type ItemOption = {
    id: number;       // ID duy nhất
    label: string;    // Tên hiển thị
    value: string;    // Giá trị để filter
};


const itemOptions: ItemOption[] = [
    { id: 1, label: 'Xoài cát Hòa Lộc loại 1', value: 'xoai cat hoa loc loai 1' },
    { id: 2, label: 'Chuối già Nam Mỹ loại 1', value: 'chuoi gia nam my loai 1' },
    { id: 3, label: 'Cam sành loại 1', value: 'cam sanh loai 1' },
    { id: 4, label: 'Cam sành loại 2', value: 'cam sanh loai 2' },
    { id: 5, label: 'Quýt đường loại 1', value: 'quyt duong loai 1' },
    { id: 6, label: 'Bưởi Năm Roi loại 1', value: 'buoi nam roi loai 1' },
    { id: 7, label: 'Bưởi Năm Roi loại 2', value: 'buoi nam roi loai 2' },
];


export type PriceRow = {
    id: number;           // ID mặt hàng 
    date: string;         // Ngày tháng
    province: string;
    item: string;         // Tên mặt hàng
    itemValue: string;
    unit: string;         // Đơn vị tính
    marketPrice: number;  // Giá tại chợ
    gardenPrice: number;  // Giá tại vườn
};

export const priceRows: PriceRow[] = [
    { id: 1, date: '2025-06-20', province: 'ct', item: 'Cam sành loại 1', itemValue: 'cam sanh loai 1', unit: 'đ/Kg', marketPrice: 5000, gardenPrice: 4000 },
    { id: 2, date: '2025-06-21', province: 'ct', item: 'Cam sành loại 2', itemValue: 'cam sanh loai 2', unit: 'đ/Kg', marketPrice: 3000, gardenPrice: 2500 },
    { id: 3, date: '2025-06-22', province: 'ag', item: 'Quýt đường loại 1', itemValue: 'quyt duong loai 1', unit: 'đ/Kg', marketPrice: 40000, gardenPrice: 35000 },
    { id: 4, date: '2025-06-23', province: 'ag', item: 'Bưởi Năm Roi loại 1', itemValue: 'buoi nam roi loai 1', unit: 'đ/Kg', marketPrice: 25000, gardenPrice: 22000 },
    { id: 5, date: '2025-06-24', province: 'bt', item: 'Bưởi Năm Roi loại 2', itemValue: 'buoi nam roi loai 2', unit: 'đ/Kg', marketPrice: 15000, gardenPrice: 12000 },
    { id: 6, date: '2025-06-25', province: 'bt', item: 'Xoài cát Hòa Lộc loại 1', itemValue: 'xoai cat hoa loc loai 1', unit: 'đ/Kg', marketPrice: 25000, gardenPrice: 20000 },
    { id: 7, date: '2025-06-26', province: 'cm', item: 'Chuối già Nam Mỹ loại 1', itemValue: 'chuoi gia nam my loai 1', unit: 'đ/Kg', marketPrice: 10000, gardenPrice: 8000 },
    { id: 8, date: '2025-06-27', province: 'cm', item: 'Cam sành loại 1', itemValue: 'cam sanh loai 1', unit: 'đ/Kg', marketPrice: 5200, gardenPrice: 4200 },
    { id: 9, date: '2025-06-28', province: 'dt', item: 'Cam sành loại 2', itemValue: 'cam sanh loai 2', unit: 'đ/Kg', marketPrice: 3100, gardenPrice: 2600 },
    { id: 10, date: '2025-06-29', province: 'dt', item: 'Quýt đường loại 1', itemValue: 'quyt duong loai 1', unit: 'đ/Kg', marketPrice: 40500, gardenPrice: 35500 },
    { id: 11, date: '2025-06-30', province: 'hg', item: 'Bưởi Năm Roi loại 1', itemValue: 'buoi nam roi loai 1', unit: 'đ/Kg', marketPrice: 25500, gardenPrice: 22500 },
    { id: 12, date: '2025-07-01', province: 'hg', item: 'Xoài cát Hòa Lộc loại 1', itemValue: 'xoai cat hoa loc loai 1', unit: 'đ/Kg', marketPrice: 26000, gardenPrice: 21000 },
];


type GeneralSearchProps = {
    onExportData: (data: PriceRow[]) => void;
};

const GeneralSearch = ({ onExportData }: GeneralSearchProps) => {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [data] = useState(priceRows);
    //  const [data, setData] = useState<PriceRow[]>(priceRows);

    // tạo để lưu data result
    const [filteredData, setFilteredData] = useState<PriceRow[]>(data);

    const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
    const [toDate, setToDate] = useState<Date | undefined>(undefined);

    // Hàm xử lý khi bấm nút "Tra cứu"
    const handleSearch = () => {
        // Chuyển đổi fromDate thành timestamp (miliseconds) ở mốc 00:00:00 để so sánh chính xác theo ngày.
        // Nếu không chọn ngày bắt đầu -> gán null (nghĩa là không giới hạn ngày bắt đầu)
        const fromTime = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
        const toTime = toDate ? new Date(toDate).setHours(0, 0, 0, 0) : null;

        // Log ra để kiểm tra các giá trị đầu vào
        console.log('fromTime:', fromTime ? new Date(fromTime) : 'Không chọn');
        console.log('toTime:', toTime ? new Date(toTime) : 'Không chọn');
        console.log('selectedProvince:', selectedProvince);
        console.log('selectedItem:', selectedItem);

        // Thực hiện lọc dữ liệu từ priceRows theo 4 điều kiện
        const result = priceRows.filter((item) => {
            // Chuyển ngày của item trong mảng thành timestamp ở mốc 00:00:00
            const itemDate = new Date(item.date);
            const itemTime = itemDate.setHours(0, 0, 0, 0);

            const isAfterStart = fromTime ? itemTime >= fromTime : true;
            const isBeforeEnd = toTime ? itemTime <= toTime : true;
            const isProvinceMatch = selectedProvince ? item.province === selectedProvince : true;
            const isItemMatch = selectedItem ? item.itemValue === selectedItem : true;

            return isAfterStart && isBeforeEnd && isProvinceMatch && isItemMatch;
        });

        console.log('Kết quả:', result);

        setFilteredData(result);
    };



    useEffect(() => {
        onExportData(filteredData);
    }, [filteredData, onExportData]);

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
                        <SelectTrigger className="relative flex items-center justify-center rounded-full px-4 pr-10 w-full sm:w-[288px] !h-[54px] bg-white text-xl font-medium text-black border border-gray-300 custom-border-gradient [&>svg]:hidden">
                            <SelectValue placeholder="Tỉnh" />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                <DropdownIcon className="w-4 h-4" />
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
                        <SelectTrigger className="relative rounded-full px-4 pr-8 py-2 w-full md:w-[710px] !h-[54px] bg-white text-base border-gray-400 text-gray-400 custom-border-gradient [&>svg]:hidden">
                            <SelectValue placeholder="Mặt hàng" />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
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

                    {/* tra cứu kết quả */}
                    <Button
                        onClick={handleSearch}
                        className='text-white w-full md:max-w-[160px] lg:max-w-[302px] h-[54px] text-base py-2 rounded-full cursor-pointer btn-hover-effect'
                        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
                    >
                        Tra cứu
                    </Button>
                </div>
            </div>

            {/* Kết quả */}
            <div className="grid grid-cols-1 gap-12">
                <h3 className="text-xl font-medium text-black">Kết quả:</h3>
                <div className="rounded-3xl shadow-sm border border-gray-200 bg-white/35 py-5 px-4 md:px-14">
                    <div className="max-h-[456px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
                        <table className="min-w-full text-sm text-left text-black">
                            <thead className="font-medium text-sx md:text-base bg-white/70">
                                <tr className='border-b border-[#D5D5D5]'>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Ngày tháng</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Tên mặt hàng</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">ĐVT</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Giá tại chợ</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Giá tại Vườn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <tr key={item.id} className="border-b border-[#D5D5D5] font-medium text-sx md:text-base">
                                            <td className="py-4 px-4 whitespace-nowrap">{item.date}</td>
                                            <td className="py-4 px-4 whitespace-nowrap">{item.item}</td>
                                            <td className="py-4 px-4 whitespace-nowrap">{item.unit}</td>
                                            <td className="py-4 px-4 whitespace-nowrap">{item.marketPrice}</td>
                                            <td className="py-4 px-4 whitespace-nowrap">{item.gardenPrice}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                                            Không tìm thấy kết quả
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GeneralSearch;
