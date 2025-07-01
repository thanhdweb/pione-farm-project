import Image from 'next/image'
import React from 'react'

const RiceScopeBanner = () => {
    return (
        <div className='relative w-full h-[834px] lg:h-[634px] bg-cover bg-center bg-no-repeat px-4 py-4 md:py-12 md:px-12'
            style={{ backgroundImage: `url('/images/Vector.png')` }}
        >
            {/* 4 cái Image cho 4 cái hình nhỏ dùng absolute để style ui  */}
            <Image src="/images/dot1.png" alt="" width={600} height={200} className="hidden lg:block absolute text-blue-500 top-0 left-12 z-20 w-[600px] h-[190px]" />
            <Image src="/images/dot2.png" alt="" width={300} height={150} className="absolute top-0 right-0 lg:right-12 z-20 w-[180px] h-[100px] lg:w-[300px] lg:h-[150px]" />
            <Image src="/images/dot3.png" alt="" width={400} height={200} className="absolute bottom-0 left-0 z-20 w-[280px] h-[120px] lg:w-[400px] lg:h-[200px]" />
            <Image src="/images/dot4.png" alt="" width={500} height={150} className="hidden lg:block absolute bottom-0 right-40 z-20 w-[500px] h-[150px]" />


            <div className='relative w-full h-full bg-white/70 backdrop-blur-md z-10 p-2 lg:p-6 rounded-2xl shadow-lg'>
                {/* hình png absolute */}
                <Image src={"/images/AI.png"} alt='' width={77} height={41} className='absolute top-6 left-6 z-30' />

                <div className='relative w-full h-full bg-cover bg-center bg-no-repeat'>
                    <Image src={'/images/bannerAI.png'} alt='' width={311} height={310} className='absolute left-10 top-1/2 -translate-y-1/2' />

                    <div className='absolute w-full h-[800px] lg:w-[978px] lg:h-[509px] bg-cover bg-center bg-no-repeat top-1/2 -right-4 -translate-y-1/2 pt-4 pr-4 pb-4 pl-4 lg:pt-28 lg:pr-32 lg:pb-24 lg:pl-44'
                        style={{ backgroundImage: `url('/images/formtext.png')` }}
                    >
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
                            → <strong>Dự báo:</strong> Giá gạo sẽ tiếp tục tăng trong 2 tuần tới. <br />
                            → <strong>Khuyến nghị:</strong> Nông dân nên cân nhắc giữ hàng thêm thời gian ngắn để bán được giá cao hơn; doanh nghiệp cần chuẩn bị nguồn cung sớm để kịp hợp đồng xuất khẩu.
                        </p>

                        <p className="text-base text-[#1500FF] font-bold mt-2 pl-8 underline cursor-pointer">Xem thêm →</p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default RiceScopeBanner