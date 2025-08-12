"use client";

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/components/ui/icon';
import { FruitImportPriceRecord, getFruitImportPrices } from '@/lib/api/fruitprice';
import { DotLoader } from '@/components/ui/spinner';


export type FruitPrice = {
    id: number;
    name: string;
    unit: string;
    price: number;
};


const PriceTable = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [priceTable, setPriceTable] = useState<FruitPrice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // search items
    const filteredFruits = priceTable.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchPriceTable = async () => {
            try {
                const data: FruitImportPriceRecord[] = await getFruitImportPrices();
                const mapped: FruitPrice[] = data.map((item, index) => ({
                    id: index + 1,
                    name: item.productName,
                    unit: item.marketUnit,
                    price: item.marketPrice,
                }))
                setPriceTable(mapped);
            } catch (error) {
                console.log("Lỗi khi fetch bảng giá mặt hàng:", error)
            } finally {
                setLoading(false);
            }
        }
        fetchPriceTable()
    })

    return (
        <div
            className='py-5 px-8 rounded-3xl bg-white/61 grid grid-cols-1 gap-6'
            style={{ boxShadow: "0 0 12px 0 rgba(4, 255, 0, 0.3)" }}
        >
            <h2 className='text-2xl font-bold'>Bảng giá mặt hàng trái cây</h2>
            <div className="relative">
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tên trái cây"
                    className="w-full bg-[#00A10B] text-white placeholder-white rounded-full py-5 pr-12 pl-6 border-none focus:outline-none focus:ring-0"
                    style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
                />
                <SearchIcon
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white"
                />
            </div>

            <div className='max-h-[440px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 h-full'>
                <table className="min-w-full text-sm text-left">
                    <thead className="text-gray-900 border-gray-200">
                        <tr className='text-xl'>
                            <th className='pb-4 sticky top-0 bg-white/61'>Tên mặt hàng</th>
                            <th className='pb-4 sticky top-0 bg-white/61'>ĐVT</th>
                            <th className='pb-4 sticky top-0 bg-white/61'>Tại chợ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={3} className="text-center py-4">
                                    <DotLoader />
                                </td>
                            </tr>
                        ) : (
                            <>
                                {filteredFruits.length > 0 ? (
                                    filteredFruits.map((item) => (
                                        <tr key={item.id} className="hover:bg-[#F0FDF4] transition-colors text-gray-900">
                                            <td className="py-1">{item.name}</td>
                                            <td className="py-1">{item.unit}</td>
                                            <td className="py-1">{item.price.toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center py-4 text-gray-500">
                                            Không tìm thấy mặt hàng
                                        </td>
                                    </tr>
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PriceTable