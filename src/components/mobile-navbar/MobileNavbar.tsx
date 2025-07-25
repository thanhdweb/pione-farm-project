"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api/auth";
import NotificationsMobile from "../layout/notifications/NotificationsMobile";

interface MobileNavbarProps {
  onClose: () => void;
  isOpen: boolean;
  onOpenNotifications: () => void;
}

const MobileNavbar = ({ onClose, isOpen, onOpenNotifications }: MobileNavbarProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // State quản lý modal thông báo
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);


  // Dropdown mobile
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );

  // Hàm toggle dropdown
  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown((prev) => (prev === name ? null : name));
  };

  // Đóng menu khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Nếu đang mở modal thông báo thì không đóng menu
      if (isNotificationsModalOpen) return;

      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, isNotificationsModalOpen]);


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
    <>
      {/* Overlay mờ nền khi menu mở */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Modal NotificationsMobile (NEW) */}
      {isNotificationsModalOpen && (
        <NotificationsMobile onClose={() => setIsNotificationsModalOpen(false)} />
      )}

      <div
        ref={menuRef}
        className={`
    fixed top-0 left-0 z-50 h-full w-[75%] max-w-xs 
    bg-gradient-to-b from-green-600 via-lime-500 to-emerald-300 
    text-white shadow-xl rounded-tr-2xl rounded-br-2xl
    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        {/* Nút đóng */}
        <div className="flex justify-end p-4">
          <button onClick={onClose} aria-label="Đóng menu">
            <X className="w-6 h-6 text-white hover:text-gray-300" />
          </button>
        </div>

        {/* Danh sách menu */}
        <ul className="flex flex-col gap-3 px-6 text-base font-medium">
          <li>
            <Link href="/" className="block py-2 hover:text-black/80">
              Trang chủ
            </Link>
          </li>

          {/* Dropdown item: Giá nông sản */}
          <li>
            <button
              onClick={() => toggleMobileDropdown("giaNongSan")}
              className="flex justify-between items-center w-full py-2 hover:text-black/80"
            >
              Giá nông sản
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${openMobileDropdown === "giaNongSan" ? "rotate-180" : ""
                  }`}
              />
            </button>
            {openMobileDropdown === "giaNongSan" && (
              <ul className="ml-4 mt-2 space-y-1 text-sm text-white/90">
                <li className="group">
                  <Link href="/general-lookup" className="block py-1 hover:text-black transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3">
                    Tra cứu tổng hợp
                  </Link>
                </li>
                <li className="group">
                  <Link href="/advanced-lookup" className="block py-1 hover:text-black transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3">
                    Tra cứu nâng cao
                  </Link>
                </li>
                <li className="group">
                  <Link href="#" className="block py-1 hover:text-black transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3">
                    Biểu đồ giá
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Item không dropdown */}
          <li>
            <Link href="/introduction" className="block py-2 hover:text-black/80">
              Giới thiệu
            </Link>
          </li>

          {/* Dropdown item: Thị trường */}
          <li>
            <button
              onClick={() => toggleMobileDropdown("thiTruong")}
              className="flex justify-between items-center w-full py-2 hover:text-black/80"
            >
              Thị trường
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${openMobileDropdown === "thiTruong" ? "rotate-180" : ""
                  }`}
              />
            </button>
            {openMobileDropdown === "thiTruong" && (
              <ul className="ml-4 mt-2 space-y-1 text-sm text-white/90">
                <li className="group">
                  <Link href="#" className="block py-1 hover:text-black transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3">
                    Thông tin thị trường
                  </Link>
                </li>
                <li className="group">
                  <Link href="/market-inland" className="block py-1 hover:text-black transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3">
                    Trong nước
                  </Link>
                </li>
                <li className="group">
                  <Link href="#" className="block py-1 hover:text-black transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3">
                    Ngoài nước
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Dropdown item: Giá cả thị trường */}
          <li>
            <button
              onClick={() => toggleMobileDropdown("giaCa")}
              className="flex justify-between items-center w-full py-2 hover:text-black/80"
            >
              Giá cả thị trường
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${openMobileDropdown === "giaCa" ? "rotate-180" : ""
                  }`}
              />
            </button>
            {openMobileDropdown === "giaCa" && (
              <ul className="ml-4 mt-2 space-y-1 text-sm text-white/90">
                <li className="group">
                  <Link href="#" className="block py-1 hover:text-black transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3">
                    Thông tin thị trường
                  </Link>
                </li>
                <li className="group">
                  <Link href="#" className="block py-1 hover:text-black transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3">
                    Trong nước
                  </Link>
                </li>
                <li className="group">
                  <Link href="#" className="block py-1 hover:text-black transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3">
                    Ngoài nước
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={onOpenNotifications}
              className="block w-full text-left py-2 hover:text-black/80"
            >
              Thông báo
            </button>
          </li>

          <li>
            <Link href="#" className="block py-2 hover:text-black/80">
              Liên hệ
            </Link>
          </li>
        </ul>
        <hr className="mx-12 mt-12" />
        <div>
          <p className="px-6 mt-6 group text-base font-medium">
            <Link
              href="/user"
              className="block text-sm text-gray-700 transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3"
            >
              Thông tin cá nhân
            </Link>
          </p>
          <p className="px-6 mt-3 group text-base font-medium">
            <button
              onClick={handleLogout}
              className="block text-left text-sm text-red-600 transition-transform duration-200 ease-in-out group-hover:translate-x-3 active:translate-x-3 w-full"
            >
              Đăng xuất
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
