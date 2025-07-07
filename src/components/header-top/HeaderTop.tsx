"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import MobileNavbar from "@/components/mobile-navbar/MobileNavbar";
import Link from "next/link";

const HeaderTop = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Bắt sự kiện click ngoài dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      {/* logo left */}
      <div className="py-5 pl-4 md:pl-12 float-left">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/Icon.svg"
            alt="Logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="font-bold text-xl md:text-2xl text-gray-900">
            BlockchainFarm
          </span>
        </Link>
      </div>

      {/* khi desktop show right */}
      <div className="hidden lg:flex items-center gap-6 pt-6 pb-4 px-4 md:px-12 float-right bg-white rounded-bl-full shadow-md">
        {/* Search icon */}
        <button>
          <svg
            className="w-6 h-6 text-gray-900"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.8499 10C3.8499 6.60345 6.60335 3.85 9.9999 3.85C13.3965 3.85 16.1499 6.60345 16.1499 10C16.1499 13.3966 13.3965 16.15 9.9999 16.15C6.60335 16.15 3.8499 13.3966 3.8499 10ZM9.9999 2.15C5.66447 2.15 2.1499 5.66457 2.1499 10C2.1499 14.3354 5.66447 17.85 9.9999 17.85C11.8614 17.85 13.5716 17.2021 14.9172 16.1194L20.3989 21.601C20.7308 21.933 21.269 21.933 21.6009 21.601C21.9329 21.2691 21.9329 20.7309 21.6009 20.399L16.1193 14.9173C17.202 13.5717 17.8499 11.8615 17.8499 10C17.8499 5.66457 14.3353 2.15 9.9999 2.15Z"
              fill="currentColor"
            />
          </svg>
        </button>
        {/* Bell icon */}
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.85002 9C6.85002 7.68111 7.29061 6.39001 8.13533 5.43971C8.96613 4.50505 10.2307 3.85 12 3.85C13.7694 3.85 15.0339 4.50505 15.8647 5.43971C16.7094 6.39001 17.15 7.68111 17.15 9C17.15 10.2596 17.7766 11.1982 18.2542 11.9137L18.2928 11.9715C18.8111 12.7489 19.15 13.2938 19.15 14C19.15 14.9743 18.4563 15.7578 17.0165 16.3363C15.599 16.9058 13.7185 17.15 12 17.15C10.2816 17.15 8.40102 16.9058 6.98359 16.3363C5.54375 15.7578 4.85002 14.9743 4.85002 14C4.85002 13.3065 5.17424 12.8297 5.69813 12.0754C6.20176 11.3504 6.85002 10.4078 6.85002 9ZM12 2.15C9.76938 2.15 8.03393 2.99495 6.86473 4.31029C5.70944 5.60999 5.15002 7.31889 5.15002 9C5.15002 9.83353 4.79829 10.391 4.30191 11.1056L4.23218 11.2057C3.76258 11.8785 3.15002 12.7561 3.15002 14C3.15002 16.0257 4.67852 17.2422 6.3498 17.9137C8.04348 18.5942 10.1629 18.85 12 18.85C13.8371 18.85 15.9566 18.5942 17.6503 17.9137C19.3215 17.2422 20.85 16.0257 20.85 14C20.85 12.7404 20.2235 11.8018 19.7458 11.0863L19.7073 11.0285C19.189 10.2511 18.85 9.70622 18.85 9C18.85 7.31889 18.2906 5.60999 17.1353 4.31029C15.9661 2.99495 14.2307 2.15 12 2.15ZM9.52853 19.2928C9.91605 19.0344 10.4386 19.1363 10.7011 19.5193L10.7074 19.5278C10.7165 19.5397 10.7342 19.5621 10.7603 19.5915C10.8132 19.6511 10.897 19.7352 11.01 19.82C11.2336 19.9877 11.559 20.15 12 20.15C12.441 20.15 12.7665 19.9877 12.99 19.82C13.1031 19.7352 13.1868 19.6511 13.2397 19.5915C13.2659 19.5621 13.2836 19.5397 13.2927 19.5278L13.299 19.5193C13.5615 19.1363 14.084 19.0344 14.4715 19.2928C14.8621 19.5532 14.9677 20.0809 14.7073 20.4715L14 20C14.7073 20.4715 14.7071 20.4718 14.7068 20.4721L14.7064 20.4728L14.7054 20.4742L14.7033 20.4774L14.6983 20.4847L14.6849 20.5038C14.6746 20.5184 14.6612 20.5367 14.6449 20.5581C14.6123 20.6009 14.5675 20.6566 14.5103 20.721C14.3966 20.8489 14.2303 21.0148 14.01 21.18C13.5669 21.5123 12.8924 21.85 12 21.85C11.1077 21.85 10.4332 21.5123 9.99002 21.18C9.76974 21.0148 9.60348 20.8489 9.48973 20.721C9.43256 20.6566 9.38775 20.6009 9.35516 20.5581C9.33884 20.5367 9.3255 20.5184 9.31512 20.5038L9.30176 20.4847L9.29673 20.4774L9.29462 20.4742L9.29367 20.4728L9.29322 20.4721C9.293 20.4718 9.29278 20.4715 10 20L9.29278 20.4715C9.03238 20.0809 9.13793 19.5532 9.52853 19.2928Z"
              fill="black"
            />
          </svg>
        </button>

        {/* Avatar và tên */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Image
              src="/images/avatar.png"
              alt="User"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-gray-900">
              Marci Fumons
            </span>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                fill="gray"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.399 9.399a.85.85 0 0 1 1.202 0L12 13.798l4.399-4.399a.85.85 0 0 1 1.202 1.202l-5 5a.85.85 0 0 1-1.202 0l-5-5a.85.85 0 0 1 0-1.202"
              />
            </svg>
          </div>

          {showDropdown && (
            <ul className="absolute right-0 mt-2 w-38 bg-white border border-gray-200 rounded-lg shadow-md z-50">
              <li>
                <Link
                  href="#"
                  className="block p-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Thông tin cá nhân
                </Link>
              </li>
              <li>
                <Link
                  href="/logout"
                  className="block p-2 text-sm text-red-600 hover:bg-red-100"
                >
                  Đăng xuất
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/*ẩn hiện icon menu và show nav  */}
      <div className="lg:hidden float-right p-4 bg-white/70 rounded-bl-full shadow-md">
        <button
          className="flex items-center justify-center w-10 h-10"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile menu (nav trượt từ trái) */}
      {isMobileOpen && (
        <MobileNavbar
          isOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default HeaderTop;
