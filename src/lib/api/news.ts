import axios from "axios";

export async function fetchNews(type: string, accessToken: string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news`, {
            params: { type },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("Dữ liệu tin tức:", response.data);
        return response.data.data || [];
    } catch (error) {
        console.error("Lỗi khi fetch news:", error);
        return []; // fallback nếu lỗi
    }
}
