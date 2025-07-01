import React from 'react'
import HeaderTop from '@/components/header-top/HeaderTop';
import Navbar from '@/components/navbar/Navbar';

type BannerProps = {
    backgroundUrl: string;
    children: React.ReactNode;
}

const Header = ({ backgroundUrl, children }: BannerProps) => {
    return (
        <div>
            <section
                className="relative w-full h-[620px] bg-cover bg-center bg-no-repeat text-white px-4 md:px-12"
                style={{ backgroundImage: `url('${backgroundUrl}')` }}
            >
                {/* Header top (menu, logo, login...) */}
                <div className="absolute top-0 left-0 w-full z-50">
                    <HeaderTop />
                </div>

                {/* Nội dung giữa banner */}
                {/* <div className="container mx-auto w-full h-full flex flex-col justify-center items-center"> */}
                <div className="w-full h-full flex flex-col justify-center">
                    {children}
                </div>
            </section>
            {/* BannerNav */}
            <div className="w-full z-50">
                <Navbar />
            </div>
        </div>
    )
}

export default Header