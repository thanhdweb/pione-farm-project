"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchNews } from "@/lib/api/news"; // Dùng lại logic fetch
import { DotLoader } from "@/components/ui/spinner";
import Link from "next/link";


interface MarketItem {
    _id: string;
    title: string;
    summary: string;
    images: string[];
    type: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

const ITEMS_PER_PAGE = 6;

interface MarketArticleListProps {
    type: string;
}

const MarketArticleList = ({ type }: MarketArticleListProps) => {
    const [data, setData] = useState<MarketItem[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentItems = data.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

    // Fetch data on client
    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem("accessToken") || "";
            if (!accessToken) return;

            setLoading(true); // Bắt đầu load

            try {
                const result = await fetchNews(type);
                setData(result);
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu:", error);
            } finally {
                setLoading(false); // Luôn chạy, kể cả khi lỗi
            }
        };

        fetchData();
    }, [type]);

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="w-full">
            <div className="grid md:grid-cols-2 gap-x-36 gap-y-12">
                {
                    loading ? <DotLoader /> : (
                        <>
                            {currentItems.map((item) => (
                                <div key={item._id} className="flex flex-col xl:flex-row gap-8">
                                    <div className="relative w-[290px] h-[194px] flex-shrink-0">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload/${item.images?.[0] || "default.png"}`}
                                            alt={item.title}
                                            fill
                                            className="object-cover w-[290px] h-[194px] rounded-2xl"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <Link href={`/market/${type}/${item._id}`}>
                                            <h3 className="font-bold text-xl md:text-lg mb-2">{item.title}</h3>
                                        </Link>

                                        <p className="text-[13px] font-medium">{item.summary}</p>
                                        <div className="flex justify-between items-center text-sm text-gray-500">
                                            <span className="text-sm font-semibold text-[#00B032]">{item.type || "Không có loại"}</span>
                                            <p className="text-sm text-gray-500">
                                                {`${new Date(item.createdAt).toLocaleDateString("vi-VN")} ${new Date(item.createdAt).toLocaleTimeString("vi-VN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )
                }

            </div>

            <div className="flex justify-center mt-16">
                <ReactPaginate
                    previousLabel={<div className="w-10 h-10 text-3xl">{'<'}</div>}
                    nextLabel={<div className="w-10 h-10 text-3xl">{'>'}</div>}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName="flex gap-2"
                    pageClassName="w-10 h-10 flex items-center justify-center cursor-pointer hover:text-green-500"
                    activeClassName="bg-green-500 text-white rounded"
                    previousClassName="w-10 h-10 flex items-center justify-center"
                    nextClassName="w-10 h-10 flex items-center justify-center"
                    disabledClassName="text-gray-400 cursor-default opacity-50"
                />
            </div>
        </div>
    );
};

export default MarketArticleList;
