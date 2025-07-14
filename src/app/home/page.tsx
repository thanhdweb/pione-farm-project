import React from "react";
import Image from "next/image";
import Header from "@/components/header/Header";
import LocationSelector from "@/components/layout/location-selector/LocationSelector";
import StatisticsChart from "@/components/layout/statistics-chart/StatisticsChart";
import AgriPriceSearch from "@/components/layout/agri-price-search/AgriPriceSearch";
import PriceTable from "@/components/layout/price-table/PriceTable";
import AuthButtons from "@/components/layout/auth-buttons/AuthButtons";
import Footer from "@/components/footer/Footer";
import RiceScopeBanner from "@/components/layout/rice-scope-banner/RiceScopeBanner";

const HomePage = () => {
  return (
    <div>
      <Header backgroundUrl="/images/image 10.png">
        <p className="text-sm sm:text-base text-[#00B032] font-bold mb-4 ms:mb-2">
          Blockchain Và AI
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C8000] leading-normal mb-6 ms:mb-4">
          Kết nối công nghệ, <br />
          nâng tầm nông nghiệp.
        </h1>
        <p className="text-sm sm:text-base leading-loose font-normal text-[#666666] max-w-[60%] md:max-w-[40%]">
          &quot;Kết nối công nghệ, nâng tầm nông nghiệp&quot; là bước chuyển
          mình của ngành nông sản trong thời đại số. Tích hợp AI và blockchain
          giúp quản lý minh bạch, nâng cao giá trị và hiệu quả toàn chuỗi cung
          ứng.
        </p>
      </Header>
      <section className="relative w-full h-auto px-4 md:px-12 pt-12 pb-24 overflow-hidden">
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

        {/* nội dung 2 cột */}
        <div className="relative z-20 flex flex-col lg:flex-row gap-12 lg:gap-8 xl:gap-10">
          {/* bên trái chiếm 65% */}
          <div className="w-full lg:w-[62%]">
            <div className="grid grid-cols-1 gap-10">
              <LocationSelector />
              <StatisticsChart />
              <AgriPriceSearch />
            </div>
          </div>

          {/* bên phải chiếm 35% */}
          <div className="w-full lg:w-[38%]">
            <div className="grid grid-cols-1 gap-10">
              <PriceTable />
              <AuthButtons />
            </div>
          </div>
        </div>
      </section>
      <aside>
        <RiceScopeBanner />
      </aside>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
