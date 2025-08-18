"use client";

import { DotLoader } from "@/components/ui/spinner";
import { fetchNews } from "@/lib/api/news";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


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

interface RelatedNewsProps {
  type: string;
  excludeId: string; // để loại tin đang xem
}

const RelatedNews = ({ type, excludeId }: RelatedNewsProps) => {
  const [data, setData] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data on client
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken") || "";
      if (!accessToken) return;

      setLoading(true); // Bắt đầu load

      try {
        const result = await fetchNews(type);
        // loại bỏ tin hiện tại
        const filtered = result.filter((item: MarketItem) => item._id !== excludeId);
        setData(filtered);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      } finally {
        setLoading(false); // Luôn chạy, kể cả khi lỗi
      }
    };

    fetchData();
  }, [type, excludeId]);

  if (loading) return <DotLoader />;

  if (!data.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-center text-[#00a10b] text-base md:text-2xl font-bold mb-4">Tin tức liên quan</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
        modules={[Navigation]}
        className="custom-swiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <div>
              <div className="flex flex-col gap-4 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <div className="relative w-full h-[194px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload/${item.images?.[0] || "default.png"}`}
                    alt={item.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <Link href={`/market/${type}/${item._id}`} className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                  </Link>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="text-[#00B032] font-semibold">{item.type || "Không có loại"}</span>
                    <p>
                      {`${new Date(item.createdAt).toLocaleDateString("vi-VN")}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RelatedNews