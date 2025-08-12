import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/components/ui/icon';

export type FruitPrice = {
    id: number;
    name: string;
    unit: string;
    price: number;
};

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
                            <th className='pb-4 sticky top-0 whitespace-nowrap bg-white'>Tên mặt hàng</th>
                            <th className='pb-4 sticky top-0 whitespace-nowrap bg-white'>ĐVT</th>
                            <th className='pb-4 sticky top-0 whitespace-nowrap bg-white'>Tại chợ</th>
                        </tr>
                    </thead>
                    <tbody className="table-mask-cut">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-[#F0FDF4] transition-colors text-gray-900 text-sm">
                                    <td className="py-1 whitespace-nowrap">{item.name}</td>
                                    <td className="py-1 whitespace-nowrap">{item.unit}</td>
                                    <td className="py-1 whitespace-nowrap">{item.price.toLocaleString()}</td>
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

