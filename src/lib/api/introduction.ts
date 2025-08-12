
import axiosInstance from "@/lib/api/axiosInstance";

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
        // Gọi API với accessToken hợp lệ
        const { data } = await axiosInstance.get<NewsIntroResponse>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/intro`);

        console.log("Dữ liệu giới thiệu:", data);
        return data;
    } catch (error) {
        console.error("Lỗi lấy danh sách giới thiệu:", error);
        throw error;
    }
};
