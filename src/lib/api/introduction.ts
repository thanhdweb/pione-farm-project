import axios from "axios";
import { refreshAccessToken } from "@/lib/api/auth";
import { isTokenExpiringSoon } from "@/utils/token";

export interface NewsIntroResponse {
    success: boolean;
    message: string;
    data: NewsIntroItem[];
}

export interface NewsIntroItem {
    _id: string;
    title: string;
    summary: string;
    images: string[];
    type: string;
    provinceId: string;
    createdAt: string;
    updatedAt: string;
}

export const getIntroductionList = async (): Promise<NewsIntroResponse> => {
    try {
        let accessToken = localStorage.getItem("accessToken");

        // Kiểm tra accessToken sắp hết hạn thì refresh trước
        if (!accessToken || isTokenExpiringSoon(accessToken, 60)) {
            console.log("accessToken sắp hết hạn, đang refresh...");
            const newToken = await refreshAccessToken();
            if (newToken) {
                accessToken = newToken;
            } else {
                throw new Error("Không thể refresh accessToken.");
            }
        }

        // Gọi API với accessToken hợp lệ
        const { data } = await axios.get<NewsIntroResponse>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/intro`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        console.log("Dữ liệu giới thiệu:", data);
        return data;
    } catch (error) {
        console.error("Lỗi lấy danh sách giới thiệu:", error);
        throw error;
    }
};
