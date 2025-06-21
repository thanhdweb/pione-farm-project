"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface MobileNavbarProps {
    onClose: () => void;
    isOpen: boolean;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ onClose, isOpen }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <>
            <div
                ref={menuRef}
                className={`
    fixed top-0 left-0 z-50 h-full w-64 bg-white text-black shadow-lg
    transition-all duration-300 ease-in-out
    ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}
  `}
            >
                {/* Nút đóng */}
                <div className="flex justify-end p-4">
                    <button onClick={onClose}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Danh sách menu */}
                <ul className="flex flex-col gap-4 px-6">
                    <li><Link href="/home">Trang chủ</Link></li>
                    <li><Link href="#">Giá nông sản</Link></li>
                    <li><Link href="#">Thị trường</Link></li>
                    <li><Link href="#">Giới thiệu</Link></li>
                    <li><Link href="#">Liên hệ</Link></li>
                </ul>
            </div>
        </>
    );
};

export default MobileNavbar;
