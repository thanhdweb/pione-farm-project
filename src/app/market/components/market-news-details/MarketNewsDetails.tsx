"use client";

import { DotLoader } from "@/components/ui/spinner";
import { fetchNewsDetails } from "@/lib/api/news";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NewsDetail {
    _id: string;
    title: string;
    summary: string;
    description: string;
    images: string[];
    createdAt: string;
}

interface Props {
    id: string;
    // THÊM prop callback để gửi title lên cha
    onTitleLoaded?: (title: string) => void;
}

const MarketNewsDetails = ({ id, onTitleLoaded }: Props) => {
    const [data, setData] = useState<NewsDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const getDetails = async () => {
            setLoading(true);
            const result = await fetchNewsDetails(id);
            setData(result);

            // NẾU có title thì gọi callback truyền lên page cha
            if (result?.title && onTitleLoaded) {
                onTitleLoaded(result.title);
            }

            setLoading(false);
        }

        getDetails();
    }, [id, onTitleLoaded]);

    if (loading) return <DotLoader />;
    if (!data) return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-green-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <p className="text-gray-600 font-medium">Không tìm thấy tin tức</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-16">

                    {/* Main Image */}
                    {data.images?.[0] && (
                        <div className="relative w-full h-[400px] mb-6">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload/${data.images[0]}`}
                                alt={data.title}
                                fill
                                className="w-full h-full object-cover rounded-3xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-700"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight">
                            {data.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                            <div className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(data.createdAt).toLocaleDateString("vi-VN", {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>

                        </div>

                        {/* Summary */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl mb-8 border-l-4 border-green-400">
                            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                Tóm tắt nội dung
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
                        </div>

                        {/* Main Content */}
                        <div className="prose prose-lg max-w-none">
                            <div
                                className="text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: data.description }}
                            />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MarketNewsDetails;