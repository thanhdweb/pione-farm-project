"use client";

import React, { useEffect, useState } from 'react';
import IntroCard from './IntroCard';
import { DotLoader } from '@/components/ui/spinner';

// types.ts hoặc ngay trong file cũng được
export type IntroductionItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  date: string;
};

type Props = {
  fetchData?: () => Promise<IntroductionItem[]>; // optional API fetch
  data?: IntroductionItem[]; // hoặc truyền sẵn
};

const Introduction = ({ data: initialData = [], fetchData }: Props) => {
  const [data, setData] = useState<IntroductionItem[]>(initialData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      if (fetchData) {
        setLoading(true);
        try {
          const result = await fetchData();
          setData(result);
        } catch (error) {
          console.error("Lỗi khi tải dữ liệu Introduction:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // nếu data được truyền sẵn qua props
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData]);

  return (
    <div
      className="w-full bg-white/24 rounded-3xl px-2 md:px-6 lg:px-10 py-6"
      style={{ boxShadow: '0 0 12px 0 rgba(4, 255, 0, 0.3)' }}
    >
      <div className="grid grid-cols-1 gap-12 px-4 max-h-[1526px] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <DotLoader />
          </div>
        ) : (
          data.map((item) => <IntroCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Introduction;
