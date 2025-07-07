import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Image
          src="/images/BgFooter2.png"
          alt=""
          fill
          className="object-cover object-bottom-right"
          priority
        />
      </div>

      <div className="absolute left-0 bottom-0 w-[500px]">
        <Image src={"/images/BgFooter.png"} alt="" width={800} height={400} className="w-full h-auto object-contain" />
      </div>


      {/* Nội dung chính của footer */}
      <div className="relative z-10 pt-24 md:pt-28 px-12 sm:px-18 md:px-24 grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-16 xl:gap-40">
        {/* Cột 1: Địa chỉ và thông tin */}
        <div className="relative">
          <div className="absolute -top-16 left-5 lg:left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <path
                d="M22.5333 16.4666C22.5333 20.511 21.8593 22.5332 16.4667 22.5332C11.0741 22.5332 10.4 20.511 10.4 16.4666C10.4 12.4221 11.1583 10.3999 16.4667 10.3999C21.775 10.3999 22.5333 12.4221 22.5333 16.4666Z"
                fill="#347AE2"
                stroke="#347AE2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.5333 35.5335C22.5333 39.5779 21.8593 41.6001 16.4667 41.6001C11.0741 41.6001 10.4 39.5779 10.4 35.5335C10.4 31.489 11.1583 29.4668 16.4667 29.4668C21.775 29.4668 22.5333 31.489 22.5333 35.5335Z"
                fill="#347AE2"
                stroke="#347AE2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M41.6 35.5335C41.6 39.5779 40.9259 41.6001 35.5333 41.6001C30.1407 41.6001 29.4667 39.5779 29.4667 35.5335C29.4667 31.489 30.225 29.4668 35.5333 29.4668C40.8417 29.4668 41.6 31.489 41.6 35.5335Z"
                fill="#347AE2"
                stroke="#347AE2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-xl lg:text-center font-medium pb-7">
            BlockchainFarm
          </h2>
          <p className="text-sm font-medium">
            1B Nguyễn Trung Trực, Khóm 2, Phường 8, TP. Vĩnh Long, tỉnh Vĩnh
            Long, Việt Nam. Điện thoại: 02703 880 191 <br />
            Email:{" "}
            <a
              href="mailto:banbientap.snn@vinhlong.gov.vn"
              className="underline lg:max-w-[200px]"
            >
              banbientap.snn@vinhlong.gov.vn
            </a>
          </p>
        </div>

        {/* Cột 2: Liên kết */}
        <div className="lg:w-[200px]">
          <h3 className="text-[#00165F] font-medium text-xl pb-6">Liên kết</h3>
          <ul className="leading-normal text-base font-medium">
            <li className="group">
              <Link href={"#"} className="block transition-transform duration-200 ease-in-out group-hover:translate-x-3">Trang chủ</Link>
            </li>
            <li className="group">
              <Link href={"#"} className="block transition-transform duration-200 ease-in-out group-hover:translate-x-3">Giới thiệu</Link>
            </li>
            <li className="group">
              <Link href={"#"} className="block transition-transform duration-200 ease-in-out group-hover:translate-x-3">Tải bảng giá</Link>
            </li>
            <li className="group">
              <Link href={"#"} className="block transition-transform duration-200 ease-in-out group-hover:translate-x-3">Hỏi đáp</Link>
            </li>
            <li className="group">
              <Link href={"#"} className="block transition-transform duration-200 ease-in-out group-hover:translate-x-3">Liên hệ</Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Thông tin */}
        <div className="lg:w-[200px]">
          <h3 className="text-[#00165F] font-medium text-xl pb-6">Thông tin</h3>
          <ul className="text-base font-medium">
            <li className="group"><Link href={"#"} className="block transition-transform duration-200 ease-in-out group-hover:translate-x-3">Tin tức - Sự kiện</Link></li>
            <li className="group"><Link href={"#"} className="block transition-transform duration-200 ease-in-out group-hover:translate-x-3">Thị trường</Link></li>
            <li className="group"><Link href={"#"} className="block transition-transform duration-200 ease-in-out group-hover:translate-x-3">Giá cả nông sản qua SMS</Link></li>
            <li className="group"><Link href={"#"} className="block transition-transform duration-200 ease-in-out group-hover:translate-x-3">Nông nghiệp</Link></li>
            <li className="group"><Link href={"#"} className="block transition-transform duration-200 ease-in-out group-hover:translate-x-3">Giá cả thị trường</Link></li>
          </ul>
        </div>

        {/* Cột 4: Mạng xã hội */}
        <div className="lg:w-[200px]">
          <h3 className="text-[#00165F] font-medium text-xl pb-6">
            Kết nối với chúng tôi
          </h3>
          <div className="flex space-x-4">
            {/* Các icon SVG giữ nguyên */}
            <svg
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.2771 15.0004C30.2771 23.285 23.4993 30.0008 15.1382 30.0008C6.77777 30 0 23.2843 0 15.0004C0 6.71574 6.77777 0 15.1389 0C23.5001 0 30.2778 6.71574 30.2778 15.0004H30.2771Z"
                fill="#121214"
              />
              <path
                d="M19.6239 13.836L19.3717 15.8428C19.329 16.178 19.0425 16.4302 18.7027 16.4302H15.4224V24.8205C15.0764 24.8515 14.7259 24.8673 14.3716 24.8673C13.5792 24.8673 12.8058 24.7888 12.0583 24.6393V16.4302H9.53536C9.30372 16.4302 9.11475 16.2422 9.11475 16.0119V13.5008C9.11475 13.2705 9.30372 13.0825 9.53536 13.0825H12.0583V9.31654C12.0583 7.00548 13.9411 5.13232 16.2644 5.13232H19.2079C19.4395 5.13232 19.6285 5.32032 19.6285 5.55059V8.06173C19.6285 8.29201 19.4395 8.48 19.2079 8.48H17.1048C16.176 8.48 15.4231 9.22896 15.4231 10.1538V13.0832H18.9557C19.361 13.0832 19.6742 13.4366 19.6247 13.8367L19.6239 13.836Z"
                fill="white"
              />
            </svg>
            <svg
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.8519 15.0004C30.8519 23.285 24.0741 30.0008 15.713 30.0008C7.3518 30.0008 0.574036 23.285 0.574036 15.0004C0.574036 6.71574 7.3518 0 15.713 0C24.0741 0 30.8519 6.71574 30.8519 15.0004Z"
                fill="#121214"
              />
              <path
                d="M17.8975 13.6223L24.0215 7.13232H21.696L16.8894 12.2271L13.2083 7.13232H6.84735L13.286 16.0444L6.84735 22.8688H9.1729L14.2949 17.4404L18.2168 22.8688H24.5778L17.8975 13.6231V13.6223ZM10.1246 8.80088H12.342L21.2997 21.1988H19.0824L10.1246 8.80088Z"
                fill="white"
              />
            </svg>
            <svg
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.4259 15.0004C30.4259 23.285 23.6482 30.0008 15.287 30.0008C6.92585 30.0008 0.148071 23.285 0.148071 15.0004C0.148071 6.71574 6.92585 0 15.287 0C23.6482 0 30.4259 6.71574 30.4259 15.0004Z"
                fill="#121214"
              />
              <path
                d="M19.3948 7.13184H11.1799C9.06317 7.13184 7.34644 8.83286 7.34644 10.9303V19.0699C7.34644 21.1673 9.06317 22.8683 11.1799 22.8683H19.3948C21.5116 22.8683 23.2283 21.1673 23.2283 19.0699V10.9303C23.2283 8.83286 21.5116 7.13184 19.3948 7.13184ZM21.859 18.7981C21.859 20.296 20.6322 21.5116 19.1205 21.5116H11.4535C9.94173 21.5116 8.71495 20.296 8.71495 18.7981V11.2013C8.71495 9.70337 9.94173 8.48782 11.4535 8.48782H19.1205C20.6322 8.48782 21.859 9.70337 21.859 11.2013V18.7981Z"
                fill="white"
              />
              <path
                d="M15.2946 10.9302C13.0277 10.9302 11.1876 12.7535 11.1876 14.9996C11.1876 17.2458 13.0277 19.0691 15.2946 19.0691C17.5615 19.0691 19.4017 17.2458 19.4017 14.9996C19.4017 12.7535 17.5615 10.9302 15.2946 10.9302ZM15.2946 17.7131C13.7859 17.7131 12.5561 16.4945 12.5561 14.9996C12.5561 13.5047 13.7859 12.2862 15.2946 12.2862C16.8033 12.2862 18.0331 13.5047 18.0331 14.9996C18.0331 16.4945 16.8033 17.7131 15.2946 17.7131Z"
                fill="white"
              />
              <path
                d="M19.676 11.473C20.1296 11.473 20.4974 11.1086 20.4974 10.6591C20.4974 10.2096 20.1296 9.84521 19.676 9.84521C19.2223 9.84521 18.8546 10.2096 18.8546 10.6591C18.8546 11.1086 19.2223 11.473 19.676 11.473Z"
                fill="white"
              />
            </svg>
            <svg
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31 15.0004C31 23.285 24.2223 30.0008 15.8611 30.0008C7.49994 30.0008 0.722168 23.285 0.722168 15.0004C0.722168 6.71574 7.49994 0 15.8611 0C24.2223 0 31 6.71574 31 15.0004Z"
                fill="#121214"
              />
              <path
                d="M22.3859 8.64404H9.33781C8.04854 8.64404 7.00311 9.67991 7.00311 10.9566V19.0427C7.00311 20.3201 8.04854 21.3553 9.33781 21.3553H22.3859C23.6744 21.3553 24.7198 20.3201 24.7198 19.0427V10.9566C24.7198 9.67991 23.6744 8.64404 22.3859 8.64404ZM17.9573 15.5576L14.3287 17.3545C13.9097 17.5621 13.4174 17.2609 13.4174 16.7973V13.2035C13.4174 12.7399 13.9104 12.4387 14.3287 12.6456L17.9573 14.4425C18.4206 14.672 18.4206 15.3281 17.9573 15.5576Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 text-xl font-medium pt-8 pb-8 md:pb-20 px-6 md:px-14">
        &copy; Bản quyền thuộc về Blockchain Farm
      </div>
    </footer>
  );
};

export default Footer;
