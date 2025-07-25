"use client";

import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import GeneralSearch, { PriceRow } from '@/app/general-lookup/components/general-search/GeneralSearch'
import Image from 'next/image'
import React, { useState } from 'react'

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import RiceScopeBanner from '@/components/layout/rice-scope-banner/RiceScopeBanner';

const GeneralLookup = () => {
    const [exportData, setExportData] = useState<PriceRow[]>([]);

    //xử lý xuất file
    const handleExport = () => {
        if (exportData.length === 0) return alert("Không có dữ liệu để xuất!");

        const sheetData = exportData.map(item => ({
            "Ngày tháng": item.date,
            "Tên mặt hàng": item.item,
            "ĐVT": item.unit,
            "Giá tại chợ": item.marketPrice,
            "Giá tại Vườn": item.gardenPrice,
        }));

        const worksheet = XLSX.utils.json_to_sheet(sheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng Giá");

        const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([buffer], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });

        saveAs(blob, "Bang_Gia.xlsx");
    };

    return (
        <div>
            <Header backgroundUrl="/images/bggenerallookup.png">
                <p className="text-sm sm:text-base text-[#00B032] font-bold mb-4 ms:mb-2">
                    Blockchain Và AI
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C8000] leading-normal mb-6 ms:mb-4">
                    Dữ liệu minh bạch &ndash; <br />
                    Nông sản thông minh.
                </h1>
                <p className="text-sm sm:text-base leading-loose font-normal text-[#666666] max-w-[100%] md:max-w-[80%] lg:max-w-[40%] xl:max-w-[40%]">
                    Dữ liệu minh bạch &ndash; Nông sản thông minh thể hiện sự kết hợp giữa công nghệ và nông nghiệp hiện đại. Nhờ blockchain và AI, mọi thông tin về sản xuất, phân phối và giá cả được công khai rõ ràng, giúp nâng cao giá trị và niềm tin vào nông sản.
                </p>
            </Header>

            <section className="relative w-full h-auto text-white pt-16 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
                {/* Vector đặt lớn và xa top */}
                <div className="absolute top-0 bottom-4 left-1/2 -translate-x-1/2 z-0 w-full pointer-events-none">
                    <Image
                        src="/images/Vector1.png"
                        alt="Vector background"
                        width={1400}
                        height={1200}
                        className="w-full h-auto max-h-[1400px] object-contain"
                    />
                </div>

                {/* Nội dung chính */}
                <div className="relative z-10">
                    <GeneralSearch onExportData={setExportData} />
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

            <Footer />
        </div>
    )
}

export default GeneralLookup   