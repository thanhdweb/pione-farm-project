import React from 'react'

const Footer = () => {
    return (
        <footer
            className="relative overflow-hidden text-sm text-black"
            style={{
                backgroundImage: `url('/images/Vectorft2.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom right',
            }}
        >
            {/* Vector trang trí phụ (nếu muốn dùng thêm 1 vector bên trái) */}
            <div
                className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-no-repeat bg-contain z-0"
                style={{
                    backgroundImage: `url('/images/Vectorft.png')`,
                }}
            />

            {/* Nội dung chính */}
            <div className="relative z-10 px-20 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Cột 1 */}
                <div>
                    <div className="mb-4">
                        {/* Logo SVG */}
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                            <path d="M22.5333 16.4666C22.5333 20.511 21.8593 22.5332 16.4667 22.5332C11.0741 22.5332 10.4 20.511 10.4 16.4666C10.4 12.4221 11.1583 10.3999 16.4667 10.3999C21.775 10.3999 22.5333 12.4221 22.5333 16.4666Z" fill="#347AE2" stroke="#347AE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22.5333 35.5335C22.5333 39.5779 21.8593 41.6001 16.4667 41.6001C11.0741 41.6001 10.4 39.5779 10.4 35.5335C10.4 31.489 11.1583 29.4668 16.4667 29.4668C21.775 29.4668 22.5333 31.489 22.5333 35.5335Z" fill="#347AE2" stroke="#347AE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M41.6 35.5335C41.6 39.5779 40.9259 41.6001 35.5333 41.6001C30.1407 41.6001 29.4667 39.5779 29.4667 35.5335C29.4667 31.489 30.225 29.4668 35.5333 29.4668C40.8417 29.4668 41.6 31.489 41.6 35.5335Z" fill="#347AE2" stroke="#347AE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold mb-2">BlockchainFarm</h2>
                    <p className="leading-6 text-gray-700">
                        1B Nguyễn Trung Trực, Khóm 2, Phường 8,<br />
                        TP. Vĩnh Long, tỉnh Vĩnh Long, Việt Nam. <br />
                        Điện thoại: 02703 880 191<br />
                        Email: <a href="mailto:banbientap.snn@vinhlong.gov.vn" className="underline">banbientap.snn@vinhlong.gov.vn</a>
                    </p>
                </div>

                {/* Cột 2 */}
                <div>
                    <h3 className="text-blue-700 font-semibold mb-3">Liên kết</h3>
                    <ul className="space-y-2">
                        <li>Trang chủ</li>
                        <li>Giới thiệu</li>
                        <li>Tải bảng giá</li>
                        <li>Hỏi đáp</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>

                {/* Cột 3 */}
                <div>
                    <h3 className="text-blue-700 font-semibold mb-3">Thông tin</h3>
                    <ul className="space-y-2">
                        <li>Tin tức - Sự kiện</li>
                        <li>Thị trường</li>
                        <li>Giá cả nông sản qua SMS</li>
                        <li>Nông nghiệp</li>
                        <li>Giá cả thị trường</li>
                    </ul>
                </div>

                {/* Cột 4 */}
                <div>
                    <h3 className="text-blue-700 font-semibold mb-3">Kết nối với chúng tôi</h3>
                    <div className="flex space-x-4">
                        <a href="#"><img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" /></a>
                        <a href="#"><img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" /></a>
                        <a href="#"><img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5" /></a>
                        <a href="#"><img src="/icons/youtube.svg" alt="YouTube" className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm py-4 text-black border-t border-green-300 relative z-10 bg-white/50 backdrop-blur-sm">
                © Bản quyền thuộc về Blockchain Farm
            </div>
        </footer>
    )
}

export default Footer
