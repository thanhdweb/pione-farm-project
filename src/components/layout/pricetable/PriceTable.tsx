import React from 'react'
import { Input } from '@/components/ui/input'

const fruitPrices = [

    { name: "Cam sành loại 1", unit: "đ/Kg", price: 5000 },
    { name: "Cam sành loại 2", unit: "đ/Kg", price: 3000 },
    { name: "Quýt đường loại 1", unit: "đ/Kg", price: 40000 },
    { name: "Bưởi Năm Roi loại 1", unit: "đ/Kg", price: 25000 },
    { name: "Bưởi Năm Roi loại 2", unit: "đ/Kg", price: 15000 },
    { name: "Xoài cát Hòa Lộc loại 1", unit: "đ/Kg", price: 25000 },
    { name: "Xoài Cát Chu loại 1", unit: "đ/Kg", price: 20000 },
    { name: "Dưa hấu loại 1", unit: "đ/Kg", price: 10000 },
    { name: "Thanh Long ruột trắng loại 1", unit: "đ/Kg", price: 8000 },
    { name: "Chôm chôm Java loại 1", unit: "đ/Kg", price: 28000 },
    { name: "Chôm chôm Thái loại 1", unit: "đ/Kg", price: 45000 },
    { name: "Chôm chôm đường", unit: "đ/Kg", price: 50000 },
    { name: "Nhãn tiêu da bò loại 1", unit: "đ/Kg", price: 25000 },
    { name: "Sầu riêng cơm vàng hạt lép", unit: "đ/Kg", price: 50000 },


];

const PriceTable = () => {
    return (
        <div
            className='py-5 px-8 rounded-3xl bg-white grid grid-cols-1 gap-6'
            style={{ boxShadow: "0 0 12px 0 rgba(4, 255, 0, 0.3)" }}>
            <h2 className='text-2xl font-bold'>Bảng giá mặt hàng trái cây</h2>
            <div className='relative'>
                <Input
                    type='text'
                    placeholder='Tên trái cây'
                    className="rounded-full bg-[#00A10B] py-5 px-6 text-white shadow-md border-none focus:outline-none focus:ring-0 focus:border-none focus:shadow-none"

                />
                <svg className='absolute top-1/2 right-4 transform -translate-y-1/2'
                    width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5873 14.5873C14.0371 15.1376 13.1452 15.1376 12.5949 14.5873L10.1087 12.1011C9.08655 12.7568 7.87832 13.1475 6.57376 13.1475C2.94343 13.1475 0 10.2045 0 6.57373C0 2.94299 2.94343 0 6.57376 0C10.2046 0 13.1475 2.94293 13.1475 6.57373C13.1475 7.87785 12.7563 9.08655 12.1011 10.1092L14.5873 12.5954C15.1376 13.1456 15.1376 14.0371 14.5873 14.5873ZM6.57376 1.8782C3.98066 1.8782 1.87822 3.98016 1.87822 6.5737C1.87822 9.16724 3.98069 11.2692 6.57376 11.2692C9.16726 11.2692 11.2693 9.16724 11.2693 6.5737C11.2693 3.98016 9.16726 1.8782 6.57376 1.8782Z" fill="white" />
                </svg>
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
                    {fruitPrices.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#F0FDF4] transition-colors text-gray-900">
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

export default PriceTable