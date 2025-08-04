import Header from '@/components/header/Header'
// import Image from 'next/image'
import React from 'react'
import FormInformationUser from '@/app/user/components/FormInformationUser'
import Footer from '@/components/footer/Footer'
import Image from 'next/image'
import ChangePasswordForm from '@/app/user/components/ChangePasswordForm'
import ConnectWallet from '@/app/user/components/ConnectWallet'

const InformationUser = () => {
    return (
        <div>
            <Header backgroundUrl="/images/BgIntroduction.png">
                <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C8000] leading-snug">
                    Thông tin tài khoản
                </h1>
                <p className="text-center text-sm sm:text-base text-gray-700 mt-2 max-w-xl mx-auto">
                    Quản lý và chỉnh sửa thông tin cá nhân của bạn.
                </p>
            </Header>
            <section className='relative w-full h-auto text-white pt-16 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden'>
                {/* Hình nền */}
                <div className="absolute top-0 bottom-4 left-1/2 -translate-x-1/2 z-0 w-full pointer-events-none">
                    <Image
                        src="/images/Vector1.png"
                        alt="Vector background"
                        width={1400}
                        height={1200}
                        className="w-full h-auto max-h-[1400px] object-contain"
                    />
                </div>
                <div className="absolute top-10 left-2/5 -translate-x-1/2 z-0 w-full pointer-events-none">
                    <Image
                        src="/images/Vector2.png"
                        alt="Vector background 2"
                        width={800}
                        height={600}
                        className="w-full h-auto max-h-[600px] object-contain"
                    />
                </div>

                {/* Content information user */}
                <article className="relative z-10">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className="grid grid-cols-1 gap-8">
                            <FormInformationUser />
                            <ChangePasswordForm />
                        </div>
                        <div className=''>
                            {/* ví diện tử */}
                           <ConnectWallet/>
                        </div>
                    </div>
                </article>

            </section>
            <Footer />
        </div>
    )
}

export default InformationUser