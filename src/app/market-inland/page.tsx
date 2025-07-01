import Header from '@/components/header/Header'
import MarketArticleList from '@/components/layout/market-article-list/MarketArticleList'
import MarketPriceBoard from '@/components/layout/market-price-board/MarketPriceBoard'
import Image from 'next/image'
import React from 'react'

const MarketInlandPage = () => {
    return (
        <div>
            <Header backgroundUrl="/images/BgMarketInland.png">
                <p className="text-center text-sm sm:text-base text-[#00B032] font-bold mb-2">
                    Blockchain Và AI
                </p>
                <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C8000] leading-normal mb-4">
                    Công nghệ đồng hành, <br />
                    nông sản vững mạnh.
                </h1>
                <div className="mx-auto max-w-[680px] px-4">
                    <p className="text-center text-sm sm:text-base leading-loose font-normal text-[#666666]">
                        sự gắn kết giữa đổi mới số và phát triển nông nghiệp. Khi ứng dụng AI và blockchain, chuỗi giá trị nông sản trở nên minh bạch, hiệu quả và bền vững hơn.
                    </p>
                </div>
            </Header>

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

                <aside className="relative z-10">
                    <MarketArticleList />
                </aside>

                {/* tạo component và gọi 2 bảng đó */}
                <article className="relative z-10 mt-24">
                    <MarketPriceBoard />
                </article>

            </section>


        </div>
    )
}

export default MarketInlandPage