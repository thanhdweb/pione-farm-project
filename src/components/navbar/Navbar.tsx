"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { DropdownIconNav } from "@/components/ui/icon";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<
    null | "giaCa" | "thiTruong" | "giaNongSan"
  >(null);

  const giaCaRef = useRef<HTMLLIElement | null>(null);
  const thiTruongRef = useRef<HTMLLIElement | null>(null);
  const giaNongSanRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        giaCaRef.current &&
        !giaCaRef.current.contains(event.target as Node) &&
        thiTruongRef.current &&
        !thiTruongRef.current.contains(event.target as Node) &&
        giaNongSanRef.current &&
        !giaNongSanRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name: "giaCa" | "thiTruong" | "giaNongSan") => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div className="hidden lg:block bg-gradient-to-r from-[#008909] to-[#62f77d] px-4 md:px-12 py-4">
      <div className="flex items-center justify-between">
        <ul className="flex items-center gap-4 xl:gap-10 text-white lg:text-sm lg:whitespace-nowrap 2xl:text-base font-medium">
          <li>
            <Link href="/" className="relative inline-flex items-center group">Trang chủ
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:animate-pulse"></span>
            </Link>

          </li>

          {/* Giá nông sản */}
          <li className="relative" ref={giaNongSanRef}>
            <button
              onClick={() => toggleDropdown("giaNongSan")}
              className="flex items-center gap-2 cursor-pointer relative group"
            >
              Giá nông sản
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:animate-pulse"></span>
              <DropdownIconNav />
            </button>
            {isClient && openDropdown === "giaNongSan" && (
              <ul className="absolute left-0 top-full w-44 mt-2 bg-white text-black rounded-md shadow-lg z-50">
                <li>
                  <Link
                    href="/general-lookup"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Tra cứu tổng hợp
                  </Link>
                </li>
                <li>
                  <Link
                    href="/advanced-lookup"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Tra cứu nâng cao
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Biểu đồ giá
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/introduction" className="relative inline-flex items-center group">Giới Thiệu
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:animate-pulse"></span></Link>
          </li>

          {/* Thị trường */}
          <li className="relative" ref={thiTruongRef}>
            <button
              onClick={() => toggleDropdown("thiTruong")}
              className="flex items-center gap-2 cursor-pointer relative group"
            >
              Thị trường
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:animate-pulse"></span>
              <DropdownIconNav />
            </button>
            {isClient && openDropdown === "thiTruong" && (
              <ul className="absolute left-0 top-full mt-2 w-44 bg-white text-black rounded-md shadow-lg z-50">
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Thông tin thị trường
                  </Link>
                </li>
                <li>
                  <Link
                    href="/market-inland"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Trong nước
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Ngoài nước
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="#" className="relative inline-flex items-center group">Giá cả nông sản
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:animate-pulse"></span></Link>
          </li>

          {/* Giá cả thị trường */}
          <li className="relative" ref={giaCaRef}>
            <button
              onClick={() => toggleDropdown("giaCa")}
              className="flex items-center gap-2 cursor-pointer relative group"
            >
              Giá cả thị trường
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:animate-pulse"></span>
              <DropdownIconNav />
            </button>
            {isClient && openDropdown === "giaCa" && (
              <ul className="absolute left-0 top-full mt-2 w-44 bg-white text-black rounded-md shadow-lg z-50">
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Thông tin thị trường
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Trong nước
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 hover:bg-gray-100"
                  >
                    Ngoài nước
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="#" className="relative inline-flex items-center group">Bảng giá
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:animate-pulse"></span></Link>
          </li>
        </ul>

        {/* Search box */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            className="lg:w-[210px] xl:w-[290px] rounded-full  border-white px-4 pr-10 py-2 text-sm text-white  focus:ring-2 focus-visible:ring-0"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.8499 10C3.8499 6.60345 6.60335 3.85 9.9999 3.85C13.3965 3.85 16.1499 6.60345 16.1499 10C16.1499 13.3966 13.3965 16.15 9.9999 16.15C6.60335 16.15 3.8499 13.3966 3.8499 10ZM9.9999 2.15C5.66447 2.15 2.1499 5.66457 2.1499 10C2.1499 14.3354 5.66447 17.85 9.9999 17.85C11.8614 17.85 13.5716 17.2021 14.9172 16.1194L20.3989 21.601C20.7308 21.933 21.269 21.933 21.6009 21.601C21.9329 21.2691 21.9329 20.7309 21.6009 20.399L16.1193 14.9173C17.202 13.5717 17.8499 11.8615 17.8499 10C17.8499 5.66457 14.3353 2.15 9.9999 2.15Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
