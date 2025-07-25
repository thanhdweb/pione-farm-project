import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/components/ui/icon';

export type FruitPrice = {
    id: number;
    name: string;
    unit: string;
    price: number;
};

export const fruitPricesExport: FruitPrice[] = [
    { id: 1, name: "Cam sành loại 1", unit: "đ/Kg", price: 5000 },
    { id: 2, name: "Cam sành loại 2", unit: "đ/Kg", price: 3000 },
    { id: 3, name: "Quýt đường loại 1", unit: "đ/Kg", price: 40000 },
    { id: 4, name: "Bưởi Năm Roi loại 1", unit: "đ/Kg", price: 25000 },
    { id: 5, name: "Bưởi Năm Roi loại 2", unit: "đ/Kg", price: 15000 },
    { id: 6, name: "Xoài cát Hòa Lộc loại 1", unit: "đ/Kg", price: 25000 },
    { id: 7, name: "Xoài Cát Chu loại 1", unit: "đ/Kg", price: 20000 },
    { id: 8, name: "Dưa hấu loại 1", unit: "đ/Kg", price: 10000 },
    { id: 9, name: "Thanh Long ruột trắng loại 1", unit: "đ/Kg", price: 8000 },
    { id: 10, name: "Chôm chôm Java loại 1", unit: "đ/Kg", price: 28000 },
    { id: 11, name: "Chôm chôm Thái loại 1", unit: "đ/Kg", price: 45000 },
    { id: 12, name: "Chôm chôm đường", unit: "đ/Kg", price: 50000 },
    { id: 13, name: "Nhãn tiêu da bò loại 1", unit: "đ/Kg", price: 25000 },
    { id: 14, name: "Sầu riêng cơm vàng hạt lép", unit: "đ/Kg", price: 50000 },
    { id: 15, name: "Măng cụt loại 1", unit: "đ/Kg", price: 55000 },
    { id: 16, name: "Mít Thái loại 1", unit: "đ/Kg", price: 20000 },
    { id: 17, name: "Ổi nữ hoàng loại 1", unit: "đ/Kg", price: 18000 },
    { id: 18, name: "Táo Mỹ loại 1", unit: "đ/Kg", price: 60000 },
    { id: 19, name: "Nho đen không hạt loại 1", unit: "đ/Kg", price: 75000 },
    { id: 20, name: "Lê Hàn Quốc loại 1", unit: "đ/Kg", price: 70000 },
    { id: 21, name: "Dâu tây Đà Lạt loại 1", unit: "đ/Kg", price: 120000 },
    { id: 22, name: "Chuối già loại 1", unit: "đ/Kg", price: 15000 },
    { id: 23, name: "Mãng cầu Xiêm loại 1", unit: "đ/Kg", price: 35000 },
    { id: 24, name: "Vú sữa Lò Rèn loại 1", unit: "đ/Kg", price: 40000 },
];

interface FruitPriceTableProps {
    title: string;
    highlight: string;
    data: FruitPrice[];
}

const FruitPriceTable = ({ title, highlight, data }: FruitPriceTableProps) => {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div
            className='py-8 px-4 md:px-12 lg:px-16 h-[736px] rounded-3xl bg-white/61 flex flex-col gap-6'
            style={{ boxShadow: "0 0 12px 0 rgba(4, 255, 0, 0.3)" }}
        >
            <h2 className="text-xl font-medium">
                {title}{" "}
                <span className="text-2xl">{highlight}</span>
            </h2>
            <div className="relative">
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tên trái cây"
                    className="w-full bg-transparent border-[#00A10B] text-gray-500 placeholder-gray-500 rounded-full py-5 pr-12 pl-6 border focus:outline-none focus:ring-0"
                    style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
                />
                <SearchIcon
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
                />
            </div>
            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 h-full">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-gray-900 border-gray-200">
                        <tr className='text-xl'>
                            <th className='pb-4 sticky top-0 bg-white'>Tên mặt hàng</th>
                            <th className='pb-4 sticky top-0 bg-white'>ĐVT</th>
                            <th className='pb-4 sticky top-0 bg-white'>Tại chợ</th>
                        </tr>
                    </thead>
                    <tbody className="table-mask-cut">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-[#F0FDF4] transition-colors text-gray-900 text-sm">
                                    <td className="py-1">{item.name}</td>
                                    <td className="py-1">{item.unit}</td>
                                    <td className="py-1">{item.price.toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center py-4 text-gray-500">Không tìm thấy mặt hàng</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FruitPriceTable

