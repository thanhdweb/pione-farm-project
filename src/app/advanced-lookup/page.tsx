"use client";

import Header from '@/components/header/Header'
import AdvancedSearch, { LocationRow, PriceRow } from '@/app/advanced-lookup/components/advanced-search/AdvancedSearch'
import Image from 'next/image'
import React, { useState } from 'react'

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Footer from '@/components/footer/Footer';
import RiceScopeBanner from '@/components/layout/rice-scope-banner/RiceScopeBanner';
import Breadcrumb from '@/components/layout/Breadcrumb/Breadcrumb';

const AdvancedLookup = () => {
    const [productData, setProductData] = useState<PriceRow[]>([]);
    const [locationData, setLocationData] = useState<LocationRow[]>([]);

    const handleExport = () => {
        if (productData.length === 0 && locationData.length === 0) {
            return alert("Không có dữ liệu để xuất!");
        }

        const productSheet = XLSX.utils.json_to_sheet(
            productData.map(item => ({
                "Ngày tháng": item.date,
                "Tên mặt hàng": item.item,
                "ĐVT": item.unit,
                "Giá tại chợ": item.marketPrice,
                "Giá tại Vườn": item.gardenPrice,
            }))
        );

        const locationSheet = XLSX.utils.json_to_sheet(
            locationData.map(row => ({
                "Ngày tháng": row.date,
                "Nơi thu thập": row.location,
                "Số lượng": row.quantity,
            }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, productSheet, "Danh sách mặt hàng");
        XLSX.utils.book_append_sheet(workbook, locationSheet, "Danh sách địa điểm");

        const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });

        saveAs(blob, "Du_lieu_nong_san.xlsx");
    };


    return (
        <div>
            <Header backgroundUrl="/images/BgAdvancedLookup.png">
                <p className="text-center text-sm sm:text-base text-[#00B032] font-bold mb-4 ms:mb-2">
                    Blockchain Và AI
                </p>
                <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C8000] leading-normal mb-6 ms:mb-4">
                    Dữ liệu minh bạch &ndash; <br />
                    Nông sản thông minh.
                </h1>
                <div className="mx-auto max-w-[680px] px-4">
                    <p className="text-center text-sm sm:text-base leading-loose font-normal text-[#666666]">
                        Dữ liệu minh bạch &ndash; Nông sản thông minh thể hiện sự kết hợp giữa công nghệ và nông nghiệp hiện đại. Nhờ blockchain và AI, mọi thông tin về sản xuất, phân phối và giá cả được công khai rõ ràng, giúp nâng cao giá trị và niềm tin vào nông sản.
                    </p>
                </div>
            </Header>

            <div className="pt-8 px-6 md:px-12 lg:px-24">
                <Breadcrumb />
            </div>

            <section className="relative w-full text-white pt-16 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
                {/* Hình nền 1 lớn */}
                <div className="absolute top-0 bottom-4 left-1/2 -translate-x-1/2 z-0 w-full pointer-events-none">
                    <Image
                        src="/images/Vector1.png"
                        alt="Vector background"
                        width={1400}
                        height={1200}
                        className="w-full h-auto max-h-[1400px] object-contain"
                    />
                </div>

                {/* Hình nền 2 nhỏ */}
                <div className="absolute top-10 left-2/5 -translate-x-1/2 z-0 w-full pointer-events-none">
                    <Image
                        src="/images/Vector2.png"
                        alt="Vector background 2"
                        width={800}
                        height={600}
                        className="w-full h-auto max-h-[600px] object-contain"
                    />
                </div>

                {/* content */}
                <div className="relative z-10">
                    <AdvancedSearch onExportData={(products, locations) => {
                        setProductData(products);
                        setLocationData(locations);
                    }} />
                </div>

                {/* Xuất file Excel */}
                <div className="relative flex justify-center mt-10 z-20">
                    <button
                        onClick={handleExport}
                        className="w-[302px] h-[54px] text-white font-semibold py-3 px-8 rounded-full shadow-md btn-hover-effect"
                    >
                        Xuất Excel
                    </button>
                </div>
            </section>

            <aside>
                <RiceScopeBanner />
            </aside>
            {/* Footer--------- */}
            <Footer />
        </div>
    )
}

export default AdvancedLookup