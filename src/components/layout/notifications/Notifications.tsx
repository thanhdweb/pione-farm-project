"use client";

import React, { useEffect, useRef, useState } from 'react'
import { BellIcon } from "@/components/ui/icon";
import { getNotifications, getFindNotifications } from '@/lib/api/notifications';
import { DotLoader } from '@/components/ui/spinner';

interface Notification {
    _id: string;
    title: string;
    description: string;
    type: string;
    date: string;
    hour: string;
}

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<{
        today: Notification[];
        yesterday: Notification[];
    } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [selectedDate, setSelectedDate] = useState(""); // yyyy-mm-dd


    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

    // Đóng khi click ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Gọi API lấy thông báo (có filter hoặc không)
    useEffect(() => {
        const fetchNotifications = async () => {
            if (!accessToken) return;
            try {
                setLoading(true);

                // Nếu có ngày hoặc giờ được chọn => gọi API filter
                if (selectedDate) {
                    const data = await getFindNotifications(accessToken, {
                        date: selectedDate || undefined,
                    });
                    if (data.success) {
                        const normalizedData = {
                            today: data.data,        // Lấy kết quả trả về gán vào today
                            yesterday: [],           // yesterday rỗng vì API lọc không trả về yesterday
                        };
                        setNotifications(normalizedData);
                    } else {
                        setError(data.message);
                    }
                } else {
                    // Nếu không chọn filter => gọi API mặc định
                    const data = await getNotifications(accessToken);
                    if (data.success) {
                        setNotifications(data.data);
                    } else {
                        setError(data.message);
                    }
                }
            } catch (error) {
                console.error("getFindNotifications failed, fallback to getNotifications", error);
                try {
                    const data = await getNotifications(accessToken);
                    if (data.success) {
                        setNotifications(data.data);
                    } else {
                        setError(data.message);
                    }
                } catch (e) {
                    console.error("Fallback getNotifications also failed", e);
                    setError("Không thể tải thông báo.");
                }
            } finally {
                setLoading(false);
            }
        };

        // Khi mở popup thì load API
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen, accessToken, selectedDate]); // dependencies

    const hasNewNotifications = notifications !== null && notifications.today.length > 0;

    // Hiển thị ngày đã chọn hoặc "Hôm nay" nếu không có ngày nào được chọn
    const displayDate = selectedDate
        ? new Date(selectedDate).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
        : "Hôm nay";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100"
            >
                <BellIcon />
                {hasNewNotifications && (
                    <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500 ring-2 ring-white animate-ping" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-90 max-h-[500px] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 space-y-2">

                    {/* ===== Bộ lọc ngày ===== */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-gray-800">Lọc thông báo</h3>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full border text-gray-800 border-gray-300 rounded p-1 text-sm"
                        />

                        <button
                            onClick={() => {
                                setSelectedDate("");
                            }}
                            className="text-xs text-blue-500 underline"
                        >
                            Xóa thông báo đã lọc
                        </button>
                    </div>

                    <h3 className="font-semibold text-gray-800 mt-2">Thông báo</h3>
                    {loading && <DotLoader />}
                    {error && <p className="text-sm text-red-500">{error}</p>}

                    {notifications && (
                        <div className="space-y-3">
                            {notifications.today.length > 0 && (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-400 mb-2">{displayDate}</p>
                                    {notifications.today.map((item) => (
                                        <div key={item._id} className="p-2 rounded-tl-2xl rounded-br-2xl bg-[#30d158]/30 hover:bg-[#30d158] cursor-pointer">
                                            <p className="text-sm font-medium text-gray-800">{item.title}</p>
                                            <p className="text-sm text-gray-600 line-clamp-2 mt-2">{item.description}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-xs text-gray-400">{item.date}</p>
                                                <p className="text-xs text-gray-400">{item.hour}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {notifications.yesterday.length > 0 && (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-400 mt-2 mb-1">Hôm qua</p>
                                    {notifications.yesterday.map((item) => (
                                        <div key={item._id} className="p-2 rounded-tl-2xl rounded-br-2xl bg-[#30d158]/30 hover:bg-[#30d158] cursor-pointer">
                                            <p className="text-sm font-medium text-gray-800">{item.title}</p>
                                            <p className="text-sm text-gray-600 line-clamp-2 mt-2">{item.description}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-xs text-gray-400">{item.date}</p>
                                                <p className="text-xs text-gray-400">{item.hour}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {notifications.today.length === 0 && notifications.yesterday.length === 0 && (
                                <p className="text-sm text-gray-500">Không có thông báo.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Notifications;
