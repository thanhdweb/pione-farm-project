
import axiosInstance from "@/lib/api/axiosInstance";

// Kiểu dữ liệu thông báo
export interface Notification {
    _id: string;
    title: string;
    description: string;
    type: string;
    date: string; // 'YYYY-MM-DD'
    hour: string; // 'h:mm A'
}

// Response shape
interface GetNotificationsResponse {
    success: boolean;
    message: string;
    data: {
        today: Notification[];
        yesterday: Notification[];
    };
}

// Hàm gọi API lấy thông báo hôm nay + hôm qua
export const getNotifications = async (
): Promise<GetNotificationsResponse> => {
    const res = await axiosInstance.get<GetNotificationsResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notification`);

    console.log("data notification:", res.data);
    return res.data;
};

// -------------------------------------------------------------

interface NotificationFilter {
    date?: string; // 'YYYY-MM-DD'
    hour?: string; // 'h:mm A'
}

interface GetFindNotificationsResponse {
    success: boolean;
    message: string;
    data: Notification[];
}

export const getFindNotifications = async (

    filters: NotificationFilter = {}
): Promise<GetFindNotificationsResponse> => {
    const res = await axiosInstance.post<GetFindNotificationsResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notification`,
        filters
    );
    console.log("data find notification:", res.data);
    return res.data;
};
