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
                <div className="flex justify-between items-center p-4 border-b shrink-0">
                    <h2 className="text-lg font-semibold text-gray-800">Thông báo</h2>
                    <button onClick={onClose} aria-label="Đóng">
                        <X className="w-6 h-6 text-gray-600 hover:text-black" />
                    </button>
                </div>

                {/* Bộ lọc ngày */}
                <div className="p-4 space-y-2 shrink-0">
                    <label className="text-sm text-gray-700">Lọc theo ngày:</label>
                    <CustomDatePicker
                        value={selectedDateAsDate}
                        onChange={handleDateChange}
                        placeholder="Chọn ngày thông báo"
                    />

                    {selectedDate && (
                        <button
                            onClick={() => setSelectedDate("")}
                            className="text-xs text-blue-500 underline"
                        >
                            Xóa lọc ngày
                        </button>
                    )}
                </div>

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
                                            className="p-3 rounded-tl-3xl rounded-br-3xl bg-[#30d158]/30 hover:bg-[#30d158] cursor-pointer transition"
                                        >
                                            <p className="font-medium text-gray-800">{item.title}</p>
                                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                                <span>{item.date}</span>
                                                <span>{item.hour}</span>
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
                                            className="p-3 rounded-tl-3xl rounded-br-3xl bg-[#30d158]/30 hover:bg-[#30d158] cursor-pointer transition"
                                        >
                                            <p className="font-medium text-gray-800">{item.title}</p>
                                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                                <span>{item.date}</span>
                                                <span>{item.hour}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Nếu không có thông báo nào */}
                            {notifications.today.length === 0 &&
                                notifications.yesterday.length === 0 && (
                                    <p className="text-center text-gray-500 text-sm">
                                        Không có thông báo.
                                    </p>
                                )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsMobile;
