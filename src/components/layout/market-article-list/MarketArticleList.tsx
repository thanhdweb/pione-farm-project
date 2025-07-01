"use client";

import Image from 'next/image';
import React, { useState } from 'react'
import ReactPaginate from "react-paginate";

interface MarketItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

const mockData: MarketItem[] = [
    {
        id: 1,
        title: "Sầu riêng đông lạnh Việt Nam lần đầu vào Trung Quốc: Mở ra hướng xuất khẩu mới",
        description:
            "Một lô hàng sầu riêng đông lạnh từ Việt Nam vừa chính thức được thông quan qua cửa khẩu cầu Bắc Luân II (Đông Hưng, Quảng Tây),..............",
        image: "/images/image.png",
    },
    {
        id: 2,
        title: "Giới thiệu Trung tâm Khuyến nông Vĩnh Long",
        description:
            "Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, .........",
        image: "/images/image-1.png",
    },
    {
        id: 3,
        title: "Giới thiệu Trung tâm Khuyến nông Vĩnh Long",
        description:
            "Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, .........",
        image: "/images/image-2.png",
    },
    {
        id: 4,
        title: "Giới thiệu Trung tâm Khuyến nông Vĩnh Long",
        description:
            "Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, .........",
        image: "/images/image-3.png",
    },
    {
        id: 5,
        title: "Giới thiệu Trung tâm Khuyến nông Vĩnh Long",
        description:
            "Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, .........",
        image: "/images/image-4.png",
    },
    {
        id: 6,
        title: "Giới thiệu Trung tâm Khuyến nông Vĩnh Long",
        description:
            "Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, .........",
        image: "/images/image-5.png",
    },
];

const ITEMS_PER_PAGE = 6;

const MarketArticleList = () => {
    // State lưu trang hiện tại
    const [currentPage, setCurrentPage] = useState<number>(0);

    // Vị trí bắt đầu của item trên trang hiện tại
    const offset = currentPage * ITEMS_PER_PAGE;

    // Lấy danh sách item hiển thị trên trang hiện tại
    const currentItems = mockData.slice(offset, offset + ITEMS_PER_PAGE);

    // Tính tổng số trang (làm tròn lên)
    const pageCount = Math.ceil(mockData.length / ITEMS_PER_PAGE);

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };
    return (
        <div className="w-full">
            {/* Grid 2 cột */}
            <div className="grid md:grid-cols-2 gap-x-36 gap-y-12">
                {currentItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex gap-8"
                    >
                        <div className="relative w-[290px] h-[194px] flex-shrink-0">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover w-[290px] h-[194px]"
                            />
                        </div>

                        <div>
                            <h3 className="font-bold text-xl md:text-lg mb-2">
                                {item.title}
                            </h3>
                            <p className="text-[13px] font-medium">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-16">
                <ReactPaginate
                    previousLabel={"←"}
                    nextLabel={"→"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"flex gap-2"}
                    pageClassName={"px-3 py-1 border rounded cursor-pointer"}
                    activeClassName={"bg-green-500 text-white"}
                    previousClassName={"px-3 py-1 border rounded cursor-pointer"}
                    nextClassName={"px-3 py-1 border rounded cursor-pointer"}
                />
            </div>
        </div>
    )
}

export default MarketArticleList