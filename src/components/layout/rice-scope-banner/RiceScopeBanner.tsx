import { BlueDotIcon, FancyGemIcon, PurpleDotIcon, SmallGemIcon } from '@/components/ui/icon'
import Image from 'next/image'
import React from 'react'

const RiceScopeBanner = ({ withBg = false }) => {
    return (
        <div className='relative w-full h-[834px] lg:h-[634px] bg-cover bg-center bg-no-repeat px-4 py-4 md:py-12 md:px-12'
            style={{ backgroundImage: `url('/images/Vector.png')` }}
        >
            {/* 4 cái Image cho 4 cái hình nhỏ dùng absolute để style ui  */}
            <Image src="/images/dot1.png" alt="" width={600} height={200} className="hidden lg:block absolute text-blue-500 top-0 left-12 z-10 w-[600px] h-[190px]" />
            <Image src="/images/dot2.png" alt="" width={300} height={150} className="absolute top-0 right-0 lg:right-12 z-10 w-[180px] h-[100px] lg:w-[300px] lg:h-[150px]" />
            <Image src="/images/dot3.png" alt="" width={400} height={200} className="absolute bottom-0 left-0 z-10 w-[280px] h-[120px] lg:w-[400px] lg:h-[200px]" />
            <Image src="/images/dot4.png" alt="" width={500} height={150} className="hidden lg:block absolute bottom-0 right-40 z-10 w-[500px] h-[150px]" />



            <div className={`relative w-full h-full ${withBg ? 'bg-white/70 shadow-lg' : ''} backdrop-blur-md z-10 p-2 lg:p-6 rounded-2xl`}>
                {/* hình png absolute */}
                <Image src={"/images/AI.png"} alt='' width={77} height={41} className='hidden md:block md:absolute md:top-6 md:left-12 md:z-30' />

                {/* icon chấm */}
                <PurpleDotIcon className="absolute left-[66px] top-[160px] !w-3 !h-3" />

                <BlueDotIcon className="absolute left-[66px] top-[200px] !w-6 !h-6" />

                <BlueDotIcon className="hidden lg:block lg:absolute lg:left-[400px] lg:top-[130px] !w-3 !h-3" />

                <PurpleDotIcon className="hidden lg:block lg:absolute lg:left-[460px] lg:top-[135px] !w-6 !h-6" />

                <FancyGemIcon className="absolute left-[60px] top-[360px] w-10 h-10" />

                <SmallGemIcon className="hidden lg:block lg:absolute lg:left-[500px] lg:bottom-[320px] w-7 h-7" />

                <SmallGemIcon className="hidden lg:block lg:absolute lg:left-[500px] lg:bottom-[280px] w-5 h-5" />

                <div className='relative w-full h-full bg-cover bg-center bg-no-repeat z-10'>
                    <Image src={'/images/bannerAI2.png'} alt='' width={360} height={350} className='absolute z-20 w-[120px] h-[140px] top-10 left-6 md:w-[360px] md:h-[350px] md:left-24 md:top-2/3 md:-translate-y-2/3' />

                    {/* Content banner */}
                    <div className="float-right relative w-full h-[800px] lg:w-[980px] lg:h-[509px]">
                        {/* icon blue */}
                        <Image src={'/images/icon-blue.png'} alt='' width={100} height={92} className='hidden lg:block absolute z-0 bottom-3 left-22' />
                        <Image src={'/images/icon-blue-2.png'} alt='' width={102} height={96} className='hidden lg:block absolute z-0 bottom-3 right-8' />

                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url('/images/formtext.png')` }}
                        />

                        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-40">
                            <h2 className="text-[#1500FF] font-bold text-xl mb-3">
                                Phân tích thị trường gạo tại Đồng bằng sông Cửu Long
                            </h2>

                            <p className="text-base font-medium text-black leading-relaxed">
                                Một nền tảng tích hợp AI và dữ liệu thị trường thu thập thông tin từ nhiều nguồn:
                                giá gạo tại các chợ đầu mối, sản lượng mùa vụ, thời tiết, xuất khẩu và nhu cầu tiêu thụ nội địa.
                                AI phân tích thấy:
                            </p>

                            <ul className="text-base font-medium text-black list-disc ml-5 space-y-1">
                                <li>Nhu cầu xuất khẩu gạo sang Philippines tăng 15% trong 3 tháng tới.</li>
                                <li>Giá gạo IR50404 đang có xu hướng tăng nhẹ do nguồn cung giảm.</li>
                                <li>Thời tiết dự báo có mưa lớn kéo dài, ảnh hưởng đến tiến độ thu hoạch.</li>
                            </ul>

                            <p className="text-base font-medium text-black mt-1">
                                → <strong>Dự báo:</strong> Giá gạo sẽ tiếp tục tăng...
                            </p>

                            <p className="text-base text-[#1500FF] font-bold mt-2 pl-8 underline cursor-pointer">Xem thêm →</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default RiceScopeBanner