import React from 'react'
import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/components/ui/icon';


export type FruitPrice = {
    id: number;          // Mã định danh
    name: string;        // Tên mặt hàng
    unit: string;        // Đơn vị tính
    price: number;       // Giá tại chợ
};

export const fruitPricesImport: FruitPrice[] = [
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
];

export const fruitPricesExport: FruitPrice[] = [...fruitPricesImport];

interface FruitPriceTableProps {
    title: string;
    highlight: string;
    data: FruitPrice[];
}


const FruitPriceTable = ({ title, highlight, data }: FruitPriceTableProps) => {

    return (
        <div
            className='py-5 px-8 rounded-3xl bg-white grid grid-cols-1 gap-6'
            style={{ boxShadow: "0 0 12px 0 rgba(4, 255, 0, 0.3)" }}
        >
            <h2 className="text-xl font-medium">
                {title}{" "}
                <span className="text-2xl">{highlight}</span>
            </h2>
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Tên trái cây"
                    className=" w-full py-5 pr-12 pl-6 shadow focus:ring-0 focus:outline-none bg-gradient-to-r from-white to-green-50 text-gray-700 placeholder-gray-400 rounded-full border border-green-500"
                />
                <SearchIcon
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
                />
            </div>


            <table className="min-w-full text-sm text-left">
                <thead className="text-gray-900 border-gray-200">
                    <tr className='text-xl'>
                        <th className='pb-4'>Tên mặt hàng</th>
                        <th className='pb-4'>ĐVT</th>
                        <th className='pb-4'>Tại chợ</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-[#F0FDF4] transition-colors text-gray-900">
                            <td className="py-1">{item.name}</td>
                            <td className="py-1">{item.unit}</td>
                            <td className="py-1">{item.price.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FruitPriceTable