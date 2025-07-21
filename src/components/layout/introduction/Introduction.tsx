"use client";

import React from 'react';
import IntroCard from './IntroCard';



// types.ts hoặc ngay trong file cũng được
export type IntroductionItem = {
    id: string;
    title: string;
    description: string;
    image: string; // URL hoặc base64 sau này từ REST API
    type: string; // Loại 
    date: string; // Ngày tạo oặc cập nhật
};

type Props = {
    data: IntroductionItem[];
};


const Introduction = ({ data }: Props) => {


    return (
        <div
            className="w-full bg-white/24 rounded-3xl px-2 md:px-6 lg:px-10 py-6"
            style={{ boxShadow: '0 0 12px 0 rgba(4, 255, 0, 0.3)' }}
        >
            <div className="grid grid-cols-1 gap-12 px-4 max-h-[1526px] overflow-y-auto hide-scrollbar">
                {data.map((item) => (
                    <IntroCard key={item.id} item={item} />
                ))}
            </div>

        </div>
    );
};

export default Introduction;



