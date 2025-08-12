import axiosInstance from "@/lib/api/axiosInstance";

export async function fetchNews(type: string) {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news`, {
            params: { type },
                   });
        console.log("Dữ liệu tin tức:", response.data);
        return response.data.data || [];
    } catch (error) {
        console.error("Lỗi khi fetch news:", error);
        return []; // fallback nếu lỗi
    }
}
