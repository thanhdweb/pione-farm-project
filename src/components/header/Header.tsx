"use client";

import React, { useEffect, useRef, useState } from 'react'
import HeaderTop from '@/components/header-top/HeaderTop';
import Navbar from '@/components/navbar/Navbar';

type BannerProps = {
    backgroundUrl: string;
    children: React.ReactNode;
}

const Header = ({ backgroundUrl, children }: BannerProps) => {
    const navbarRef = useRef<HTMLDivElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    // Kiểm tra khi banner xuất hiện
    useEffect(() => {
        const element = bannerRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);


    return (
        <div>
            {/* ======== Banner + HeaderTop ======== */}
            <section
                ref={bannerRef}
                className="relative w-full h-screen md:h-[620px] bg-cover bg-center bg-no-repeat text-white px-4 md:px-12"
                style={{ backgroundImage: `url('${backgroundUrl}')` }}
            >
                {/* Header top (menu, logo, login...) */}
                <div className="absolute top-0 left-0 w-full z-50">
                    <HeaderTop />
                </div>

                {/* Nội dung giữa banner */}
                <div className="w-full h-full flex flex-col justify-center">
                    {children}
                </div>
            </section>

            {isSticky && (
                <div className="h-[60px] md:h-[64px]"></div>
            )}

            {/* ======== Navbar ======== */}
            <div
                ref={navbarRef}
                className={`${isSticky ? 'fixed top-0 left-0 w-full z-50 shadow-md bg-white' : 'relative w-full z-50'} transition-all duration-300 ease-in-out`}>
                <Navbar />
            </div>
        </div>
    )
}

export default Header