"use client";

import React, { useEffect, useRef, useState } from 'react'
import { BellIcon } from "@/components/ui/icon";
import { getNotifications, getFindNotifications } from '@/lib/api/notifications';
import { DotLoader } from '@/components/ui/spinner';
import CustomDatePicker from '@/components/ui/CustomDatePicker';
import { format, parse } from 'date-fns';
import {
    hasViewedNotifications,
    setViewedNotifications,
    resetViewedNotifications
} from "@/utils/notification-view";


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
    const [hasViewed, setHasViewed] = useState(true);
    const [notifications, setNotifications] = useState<{
        today: Notification[];
        yesterday: Notification[];
    } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [selectedDate, setSelectedDate] = useState(""); // yyyy-mm-dd
    const selectedDateAsDate = selectedDate ? parse(selectedDate, 'yyyy-MM-dd', new Date()) : undefined;
    // Handle when CustomDatePicker returns a Date
    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            const formatted = format(date, 'yyyy-MM-dd');
            setSelectedDate(formatted);
        } else {
            setSelectedDate('');
        }
    };

    // handle viewed notification
    useEffect(() => {
        setHasViewed(hasViewedNotifications());
    }, [])

    useEffect(() => {
        if (notifications && notifications.today.length > 0) {
            resetViewedNotifications();  // Coi như có thông báo mới
            setHasViewed(false);         // Hiện lại chấm đỏ
        }
    }, [notifications]);

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
            if (!isOpen || !accessToken) return;
            try {
                setLoading(true);

                // Nếu có ngày hoặc giờ được chọn => gọi API filter
                if (selectedDate) {
                    const data = await getFindNotifications({
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
                    const data = await getNotifications();
                    if (data.success) {
                        setNotifications(data.data);
                    } else {
                        setError(data.message);
                    }
                }
            } catch (error) {
                console.error("getFindNotifications failed, fallback to getNotifications", error);
                try {
                    const data = await getNotifications();
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

        // Đánh dấu đã xem
        setViewedNotifications();
        setHasViewed(true);

        fetchNotifications();
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
                {!hasViewed && hasNewNotifications && (
                    <span className="absolute top-2 right-2 block w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}

            </button>

            {isOpen && (

                <div className="absolute right-0 mt-2 w-90 h-[540px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 flex flex-col overflow-hidden">

                    {/* ==== KHÔNG CUỘN: Phần lọc + tiêu đề thông báo ==== */}
                    <div className=" space-y-2 shrink-0"> {/* shrink-0 giữ chiều cao cố định, không bị co khi cuộn */}
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-green-800 mb-1">Thông Báo</h3>
                            <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto"></div>
                        </div>

                        <h4 className="text-sm font-semibold text-green-700 mb-2">Lọc theo ngày</h4>
                        <CustomDatePicker
                            value={selectedDateAsDate}
                            variant="notification"
                            onChange={handleDateChange}
                            placeholder="Chọn ngày thông báo"
                        />
                        <button
                            onClick={() => setSelectedDate("")}
                            className="text-xs text-emerald-600 hover:text-emerald-800 underline mt-1 font-medium transition-colors"
                        >
                            Xóa bộ lọc
                        </button>

                     
                        {/* ===== Đây là tiêu đề giữ cố định ===== */}
                        <h3 className="text-center font-semibold text-gray-800 mt-1">Thông báo</h3>

                        {/* ===== Ngày hiển thị, cũng giữ cố định ===== */}
                        {displayDate && (
                            <p className="text-sm text-gray-400 mb-1">{displayDate}</p>
                        )}
                    </div>

                    {/* ==== CUỘN CHỈ PHẦN NÀY: Danh sách thông báo ==== */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1"> {/* flex-1 + overflow-y-auto để cuộn riêng */}
                        {loading && <DotLoader />}
                        {error && <p className="text-sm text-red-500">{error}</p>}

                        {notifications && (
                            <>
                                {/* ==== Thông báo hôm nay ==== */}
                                {notifications.today.length > 0 && (
                                    <div className="space-y-4">
                                        {notifications.today.map((item) => (
                                            <div
                                                key={item._id}
                                                className="bg-gradient-to-r from-green-100/80 to-emerald-100/80 hover:from-green-200 hover:to-emerald-200 
                                         rounded-2xl py-1 px-2 border-l-4 border-green-500 cursor-pointer transform hover:scale-[1.02] 
                                         transition-all duration-200 shadow-sm hover:shadow-md"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <p className="text-sm font-semibold text-green-800">{item.title}</p>
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="bg-green-200/60 text-green-700 px-2 py-1 rounded-full font-medium">{item.date}</span>
                                                    <span className="text-green-600 font-medium">{item.hour}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* ==== Thông báo hôm qua ==== */}
                                {notifications.yesterday.length > 0 && (
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-400">Hôm qua</p>
                                        {notifications.yesterday.map((item) => (
                                            <div
                                                key={item._id}
                                                className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 hover:from-emerald-100 hover:to-green-100 
                                         rounded-2xl py-1 px-2 border-l-4 border-emerald-400 cursor-pointer transform hover:scale-[1.02] 
                                         transition-all duration-200 shadow-sm hover:shadow-md"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                                    <p className="text-sm font-semibold text-emerald-800">{item.title}</p>
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="bg-emerald-200/60 text-emerald-700 px-2 py-1 rounded-full font-medium">{item.date}</span>
                                                    <span className="text-emerald-600 font-medium">{item.hour}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* ==== Không có thông báo ==== */}
                                {notifications.today.length === 0 &&
                                    notifications.yesterday.length === 0 && (
                                        <div className="flex flex-col items-center justify-center h-full py-8">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                                <div className="text-2xl">🌾</div>
                                            </div>
                                            <p className="text-sm text-gray-600 font-medium">Chưa có thông báo mới</p>
                                        </div>
                                    )}
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

export default Notifications;
