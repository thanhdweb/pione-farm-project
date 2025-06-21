import Header from '@/components/header/Header'
import React from 'react'
import Image from 'next/image';
import LocationSelector from '@/components/locationselector/LocationSelector';
import StatisticsChart from '@/components/statisticschart/StatisticsChart';
import AgriPriceSearch from '@/components/agripricesearch/AgriPriceSearch';
import PriceTable from '@/components/pricetable/PriceTable';
import AuthButtons from '@/components/authbuttons/AuthButtons';

const HomePage = () => {
    return (
        <div>
            <Header backgroundUrl="/images/image 10.png" >
                <p className="text-sm sm:text-sm text-[var(--green)] font-semibold mb-2">Blockchain Và AI</p>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-green-600 leading-tight mb-4">
                    Kết nối công nghệ, <br />
                    nâng tầm nông nghiệp.
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 sm:max-w-[40%]">
                    &quot;Kết nối công nghệ, nâng tầm nông nghiệp&quot; là bước chuyển mình của ngành nông sản trong thời đại số.
                    Tích hợp AI và blockchain giúp quản lý minh bạch, nâng cao giá trị và hiệu quả toàn chuỗi cung ứng.
                </p>
            </Header>
            <section className="relative w-full px-4 md:px-12 pt-12 pb-24 bg-white overflow-hidden">
                {/* background hình xanh nhòe */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] blur-3xl opacity-50">
                        <Image
                            src="/images/Vector 1.png"
                            alt="background-left"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] blur-3xl opacity-50">
                        <Image
                            src="/images/Vector 2.png"
                            alt="background-right"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* nội dung 2 cột */}
                <div className="flex flex-col md:flex-row gap-12">
                    {/* bên trái chiếm 65% */}
                    <div className="w-full md:w-[62%]">
                        <div className="grid grid-cols-1 gap-10">
                            <LocationSelector />
                            <StatisticsChart />
                            <AgriPriceSearch />
                        </div>
                    </div>

                    {/* bên phải chiếm 35% */}
                    <div className="w-full md:w-[38%]">
                        <div className='grid grid-cols-1 gap-10'>
                            <PriceTable />
                            <AuthButtons />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage