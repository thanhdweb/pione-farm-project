"use client";

import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import MarketPriceBoard from '@/app/market/components/market-price-board/MarketPriceBoard'
import RiceScopeBanner from '@/components/layout/rice-scope-banner/RiceScopeBanner'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { useState } from 'react'
import Breadcrumb from '@/components/layout/breadcrumb/Breadcrumb'
import MarketNewsDetails from '@/app/market/components/market-news-details/MarketNewsDetails'
import RelatedNews from '@/app/market/components/related-news/RelatedNews'
// import { fetchNewsDetails } from '@/lib/api/news'

interface Props {
    params: { type: string, id: string };
}

const MarketPageDetails = ({ params }: Props) => {
    const { type, id } = params;

    const [title, setTitle] = useState("");

    if (type !== "trongnuoc" && type !== "ngoainuoc") {
        notFound();
    }

    // // Lấy chi tiết tin tức để lấy title
    // const newsData = await fetchNewsDetails(id);
    // const title = newsData?.title || "";

    return (
        <div>
            <Header backgroundUrl="/images/BgMarketInland.png">
                <p className="text-center text-sm sm:text-base text-[#00B032] font-bold mb-4 ms:mb-2">
                    Blockchain Và AI
                </p>
                <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C8000] leading-normal mb-6 ms:mb-4">
                    Công nghệ đồng hành, <br />
                    nông sản vững mạnh.
                </h1>
                <div className="mx-auto max-w-[680px] px-4">
                    <p className="text-center text-sm sm:text-base leading-loose font-normal text-[#666666]">
                        sự gắn kết giữa đổi mới số và phát triển nông nghiệp. Khi ứng dụng AI và blockchain, chuỗi giá trị nông sản trở nên minh bạch, hiệu quả và bền vững hơn.
                    </p>
                </div>
            </Header>

            <div className="pt-8 px-6 md:px-12">
                <Breadcrumb customLastItem={title} />
            </div>

            <section className="relative w-full py-16 pb-24 md:pb-32 px-4 md:px-12 overflow-hidden">
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

                {/* List các tin tức thị trường */}
                <aside className="relative z-10">
                    <MarketNewsDetails id={id} onTitleLoaded={setTitle} />
                </aside>

                {/* carousel tin tức liên quan */}
                <aside className="relative z-10">
                    <RelatedNews type={type} excludeId={id} />
                </aside>

                {/* tạo component và gọi 2 table price đó */}
                <article className="relative z-10 mt-24">
                    <MarketPriceBoard />
                </article>

            </section>
            <aside>
                <RiceScopeBanner />
            </aside>
            {/* Footer--------- */}
            <Footer />


        </div>
    )
}

export default MarketPageDetails