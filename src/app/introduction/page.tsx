"use client";

import Header from '@/components/header/Header'
import Introduction from '@/components/layout/introduction/Introduction'
import Image from 'next/image'
import React from 'react'

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { IntroductionItem } from "@/components/layout/introduction/Introduction";

export const introductionData: IntroductionItem[] = [
    {
        id: 1,
        title: 'Giới thiệu Trung tâm Khuyến nông Vĩnh Long',
        description:
            'Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, thủy sản và phát triển nông thôn trên địa bàn tỉnh; thu thập, xử lý, cung cấp, phổ biến thông tin và ứng dụng công nghệ thông tin phục vụ phát triển sản xuất nông nghiệp, công tác dự báo thị trường, xúc tiến thương mại nông sản, lâm sản và thủy sản.',
        image: '/images/imgIntroduction.png',
    },
    {
        id: 2,
        title: 'Giới thiệu Trung tâm Khuyến nông Vĩnh Long',
        description:
            'Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, thủy sản và phát triển nông thôn trên địa bàn tỉnh; thu thập, xử lý, cung cấp, phổ biến thông tin và ứng dụng công nghệ thông tin phục vụ phát triển sản xuất nông nghiệp, công tác dự báo thị trường, xúc tiến thương mại nông sản, lâm sản và thủy sản.',
        image: '/images/imgIntroduction.png',
    },
    {
        id: 3,
        title: 'Giới thiệu Trung tâm Khuyến nông Vĩnh Long',
        description:
            'Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, thủy sản và phát triển nông thôn trên địa bàn tỉnh; thu thập, xử lý, cung cấp, phổ biến thông tin và ứng dụng công nghệ thông tin phục vụ phát triển sản xuất nông nghiệp, công tác dự báo thị trường, xúc tiến thương mại nông sản, lâm sản và thủy sản.',
        image: '/images/imgIntroduction.png',
    },
    {
        id: 4,
        title: 'Giới thiệu Trung tâm Khuyến nông Vĩnh Long',
        description:
            'Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, thủy sản và phát triển nông thôn trên địa bàn tỉnh; thu thập, xử lý, cung cấp, phổ biến thông tin và ứng dụng công nghệ thông tin phục vụ phát triển sản xuất nông nghiệp, công tác dự báo thị trường, xúc tiến thương mại nông sản, lâm sản và thủy sản.',
        image: '/images/imgIntroduction.png',
    },
    {
        id: 5,
        title: 'Giới thiệu Trung tâm Khuyến nông Vĩnh Long',
        description:
            'Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, thủy sản và phát triển nông thôn trên địa bàn tỉnh; thu thập, xử lý, cung cấp, phổ biến thông tin và ứng dụng công nghệ thông tin phục vụ phát triển sản xuất nông nghiệp, công tác dự báo thị trường, xúc tiến thương mại nông sản, lâm sản và thủy sản.',
        image: '/images/imgIntroduction.png',
    },
    {
        id: 6,
        title: 'Giới thiệu Trung tâm Khuyến nông Vĩnh Long',
        description:
            'Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, thủy sản và phát triển nông thôn trên địa bàn tỉnh; thu thập, xử lý, cung cấp, phổ biến thông tin và ứng dụng công nghệ thông tin phục vụ phát triển sản xuất nông nghiệp, công tác dự báo thị trường, xúc tiến thương mại nông sản, lâm sản và thủy sản.',
        image: '/images/imgIntroduction.png',
    },
    {
        id: 7,
        title: 'Giới thiệu Trung tâm Khuyến nông Vĩnh Long',
        description:
            'Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, thủy sản và phát triển nông thôn trên địa bàn tỉnh; thu thập, xử lý, cung cấp, phổ biến thông tin và ứng dụng công nghệ thông tin phục vụ phát triển sản xuất nông nghiệp, công tác dự báo thị trường, xúc tiến thương mại nông sản, lâm sản và thủy sản.',
        image: '/images/imgIntroduction.png',
    },
    {
        id: 8,
        title: 'Giới thiệu Trung tâm Khuyến nông Vĩnh Long',
        description:
            'Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường, có chức năng triển khai các hoạt động khuyến nông, khuyến lâm, khuyến ngư, chế biến, bảo quản, nông, lâm, thủy sản và phát triển nông thôn trên địa bàn tỉnh; thu thập, xử lý, cung cấp, phổ biến thông tin và ứng dụng công nghệ thông tin phục vụ phát triển sản xuất nông nghiệp, công tác dự báo thị trường, xúc tiến thương mại nông sản, lâm sản và thủy sản.',
        image: '/images/imgIntroduction.png',
    },

];


const IntroductionPage = () => {
    const handleExport = () => {
        const dataToExport = introductionData.map((item) => ({
            ID: item.id,
            "Tiêu đề": item.title,
            "Mô tả": item.description,
            "Ảnh (URL)": item.image,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Giới thiệu");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const data = new Blob([excelBuffer], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
                    Phân tích sâu &ndash; Quyết định <br />
                    đúng &ndash; Tăng trưởng bền.
                </h1>
                <div className="mx-auto max-w-[680px] px-4">
                    <p className="text-center text-sm sm:text-base leading-loose font-normal text-[#666666]">
                        Quá trình ứng dụng dữ liệu và công nghệ để đưa ra các quyết định chính xác trong kinh doanh nông sản. Nhờ đó, doanh nghiệp và nông dân có thể phát triển ổn định, hiệu quả và thích ứng linh hoạt với biến động thị trường.
                    </p>
                </div>
            </Header>

            <section className="relative w-full h-auto text-white pt-16 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
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
                    <Introduction data={introductionData} />
                </div>

                {/* Xuất file Excel */}
                <div className="relative flex justify-center mt-20 z-20">
                    <button
                        onClick={handleExport}
                        className="w-[302px] text-white font-semibold py-3 px-8 rounded-full shadow-md btn-hover-effect"
                    >
                        Xuất Excel
                    </button>
                </div>
            </section>
        </div>
    )
}

export default IntroductionPage