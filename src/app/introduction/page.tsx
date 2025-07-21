"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import Introduction from "@/components/layout/introduction/Introduction";
import Image from "next/image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IntroductionItem } from "@/components/layout/introduction/Introduction";
import { getIntroductionList } from "@/lib/api/introduction";
import RiceScopeBanner from "@/components/layout/rice-scope-banner/RiceScopeBanner";
import Footer from "@/components/footer/Footer";

const IntroductionPage = () => {
    const [introductionData, setIntroductionData] = useState<IntroductionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getIntroductionList();

            const transformedData: IntroductionItem[] = res.data.map((item) => ({
                id: item._id,
                title: item.title,
                description: item.summary,
                image: item.images?.[0]
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload/${item.images[0]}`
                    : "/images/fallback.jpg",
                type: item.type,
                date: new Date(item.createdAt).toLocaleDateString() // Chuyển đổi ngày nếu cần
            }));

            setIntroductionData(transformedData);
        } catch (error) {
            console.error("Lỗi khi fetch introduction:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleExport = () => {
        const dataToExport = introductionData.map((item) => ({
            ID: item.id,
            "Tiêu đề": item.title,
            "Mô tả": item.description,
            "Ảnh (URL)": item.image
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Giới thiệu");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        saveAs(data, "GioiThieu.xlsx");
    };

    return (
        <div>
            <Header backgroundUrl="/images/BgIntroduction.png">
                <p className="text-center text-sm sm:text-base text-[#00B032] font-bold mb-4 ms:mb-2">
                    Blockchain Và AI
                </p>
                <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C8000] leading-normal mb-6 ms:mb-4">
                    Phân tích sâu &ndash; Quyết định <br /> đúng &ndash; Tăng trưởng bền.
                </h1>
                <div className="mx-auto max-w-[680px] px-4">
                    <p className="text-center text-sm sm:text-base leading-loose font-normal text-[#666666]">
                        Quá trình ứng dụng dữ liệu và công nghệ để đưa ra các quyết định chính xác trong kinh doanh nông sản.
                    </p>
                </div>
            </Header>

            <section className="relative w-full h-auto text-white pt-16 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
                {/* Hình nền */}
                <div className="absolute top-0 bottom-4 left-1/2 -translate-x-1/2 z-0 w-full pointer-events-none">
                    <Image
                        src="/images/Vector1.png"
                        alt="Vector background"
                        width={1400}
                        height={1200}
                        className="w-full h-auto max-h-[1400px] object-contain"
                    />
                </div>
                <div className="absolute top-10 left-2/5 -translate-x-1/2 z-0 w-full pointer-events-none">
                    <Image
                        src="/images/Vector2.png"
                        alt="Vector background 2"
                        width={800}
                        height={600}
                        className="w-full h-auto max-h-[600px] object-contain"
                    />
                </div>

                {/* Nội dung */}
                <div className="relative z-10">
                    {loading ? (
                        <div className="text-center text-black">Đang tải dữ liệu...</div>
                    ) : (
                        <Introduction data={introductionData} />
                    )}
                </div>

                {/* Nút xuất Excel */}
                <div className="relative flex justify-center mt-20 z-20">
                    <button
                        onClick={handleExport}
                        className="w-[302px] text-white font-semibold py-3 px-8 rounded-full shadow-md btn-hover-effect"
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
    );
};

export default IntroductionPage;
