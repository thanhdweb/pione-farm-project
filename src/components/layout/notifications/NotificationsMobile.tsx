"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getNotifications, getFindNotifications } from "@/lib/api/notifications";
import { DotLoader } from "@/components/ui/spinner";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { format, parse } from "date-fns";

// Props nhận từ NavMobile để đóng modal
interface NotificationsMobileProps {
    onClose: () => void;
}

// Interface kiểu dữ liệu 1 thông báo
interface Notification {
    _id: string;
    title: string;
    description: string;
    type: string;
    date: string;
    hour: string;
}

const NotificationsMobile: React.FC<NotificationsMobileProps> = ({ onClose }) => {
    // State lưu thông báo đã fetch
    const [notifications, setNotifications] = useState<{
        today: Notification[];
        yesterday: Notification[];
    } | null>(null);

    const [loading, setLoading] = useState(false); // loading khi fetch
    const [error, setError] = useState(""); // lỗi nếu có
    const [selectedDate, setSelectedDate] = useState(""); // ngày lọc yyyy-mm-dd
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


    // Lấy accessToken từ localStorage
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!accessToken) return;
            try {
                setLoading(true);

                if (selectedDate) {
                    const data = await getFindNotifications({
                        date: selectedDate || undefined,
                    });
                    if (data.success) {
                        setNotifications({
                            today: data.data,
                            yesterday: [],
                        });
                    } else {
                        setError(data.message);
                    }
                } else {
                    const data = await getNotifications();
                    if (data.success) {
                        setNotifications(data.data);
                    } else {
                        setError(data.message);
                    }
                }
            } catch (error) {
                console.error("Lỗi khi tải thông báo:", error);
                setError("Không thể tải thông báo.");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [selectedDate, accessToken]); // thêm accessToken nếu cần


    // Hiển thị ngày lọc hoặc "Hôm nay" nếu không có
    const displayDate = selectedDate
        ? new Date(selectedDate).toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        : "Hôm nay";

    return (
        <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex justify-center items-center px-4 lg:hidden">
            {/* Modal container */}
            <div className="relative bg-white rounded-2xl shadow-lg max-w-md w-full h-[80vh] flex flex-col overflow-hidden">

                {/* Header modal */}
                <div className="flex justify-between items-center px-4 pt-4 pb-2 border-b shrink-0">
                    <h2 className="text-lg font-semibold text-green-800">Thông báo</h2>
                    <button onClick={onClose} aria-label="Đóng">
                        <X className="w-6 h-6 text-gray-600 hover:text-black" />
                    </button>
                </div>

                <div className="text-center">
                    <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto"></div>
                </div>


                {/* Bộ lọc ngày */}
                <div className="p-4 space-y-2 shrink-0">
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
                </div>

                {/* ===== Đây là tiêu đề giữ cố định ===== */}
                <h3 className="text-center font-semibold text-gray-800 mt-2 px-4">Thông báo</h3>

                {/* Nội dung thông báo */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {loading && <DotLoader />} {/* loading khi fetch */}
                    {error && <p className="text-sm text-red-500">{error}</p>} {/* báo lỗi */}

                    {notifications && (
                        <>
                            {/* Hiển thị thông báo hôm nay nếu có */}
                            {notifications.today.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-400">{displayDate}</p>
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

                            {/* Hiển thị thông báo hôm qua nếu có */}
                            {notifications.yesterday.length > 0 && (
                                <div className="space-y-3">
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

                            {/* Nếu không có thông báo nào */}
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
        </div>
    );
};

export default NotificationsMobile;
