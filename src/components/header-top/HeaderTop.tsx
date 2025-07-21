"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import MobileNavbar from "@/components/mobile-navbar/MobileNavbar";
import Link from "next/link";
import { BellIcon, DropdownIcon, SearchIcon } from "@/components/ui/icon";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api/auth";

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


  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();

      if (res.success) {
        toast.success("Đăng xuất thành công!");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/auth/login");
      } else {
        toast.error(res.message || "Đăng xuất thất bại.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Có lỗi xảy ra khi đăng xuất.");
      } else {
        toast.error("Có lỗi xảy ra khi đăng xuất.");
      }
    }
  };


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
          <SearchIcon className="w-5 h-5" fill="gray" />
        </button>
        {/* Bell icon */}
        <button>
          <BellIcon />
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
            <DropdownIcon />
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
              <button
                onClick={handleLogout}
                className="w-full text-left block p-2 text-sm text-red-600 hover:bg-red-100"
              >
                Đăng xuất
              </button>
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
