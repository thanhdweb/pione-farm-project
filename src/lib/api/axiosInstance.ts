import axios from "axios";
import { isTokenExpiringSoon } from "@/utils/token";
import { refreshAccessToken } from "@/lib/api/auth";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

axiosInstance.interceptors.request.use(async (config) => {

   
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken || isTokenExpiringSoon(accessToken)) {
        console.log("accessToken sắp hết hạn, đang refresh...");
        const newToken = await refreshAccessToken();
        if (newToken) {
            accessToken = newToken;
        } else {
            throw new Error("Không thể refresh accessToken");
        }
    }

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
})

export default axiosInstance;