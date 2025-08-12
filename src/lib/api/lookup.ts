import axios from "axios";
import axiosInstance from "@/lib/api/axiosInstance";

export interface Product {
    _id: string;
    name: string;
}

// Sửa lại interface Province
export interface Province {
    _id: string;
    name: string;
    products: Product[];
}

export interface GetAllProvincesResponse {
    success: boolean;
    message: string;
    data: Province[];
}

export const getAllProvinces = async (): Promise<Province[]> => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/province`, {
            headers: { Accept: "application/json" },
        });
        if (!data?.data) throw new Error("API không trả về data như mong đợi");
        return data.data;
    } catch (error) {
        console.error("Lỗi API /api/province:", error);
        throw error;
    }
};

// -------------------------------------------------------------------------

/** Payload & response lấy farm-market-price */
export interface GetFarmMarketPricePayload {
    provinceId: string;
    date: { start: string; end: string };
    productIds: string[]; // nhận array productId từ tỉnh để lọc
}

export interface FarmMarketPriceRecord {
    productId: string;
    marketPrice: number;
    farmPrice: number;
    date: string;
    provinceName: string;
    productName: string;
    marketUnit: string;
    provinceId: string;
}

export interface GetFarmMarketPriceResponse {
    success: boolean;
    message: string;
    data: FarmMarketPriceRecord[];
}

export const getFarmMarketPrices = async (
    payload: GetFarmMarketPricePayload
): Promise<FarmMarketPriceRecord[]> => {
    const res = await axiosInstance.post<GetFarmMarketPriceResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/statistical/farm-market-price`,
        payload
    );
    console.log("getProduct", res)
    return res.data.data;
};


// -------------------------------------------------------------------------
// API lấy dữ liệu  Danh sách địa điểm

// Thêm vào file api/general.ts
export interface HarvestSummary {
    provinceName: string;
    date: string;
    quantitySum: number;
}

export const getTodayHarvestSummary = async (): Promise<HarvestSummary[]> => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/statistical/today-harvest-sum`);
    console.log("getTodayHarvestSummary res", res.data);
    return res.data.data;
};
