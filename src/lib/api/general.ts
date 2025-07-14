import axios from "axios";

/** Response từ API /api/province */
export interface Province {
    _id: string;
    name: string;
    productIds: string[];
}

export interface GetAllProvincesResponse {
    success: boolean;
    message: string;
    data: Province[];
}

export const getAllProvinces = async (): Promise<Province[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_TEST_URL}/api/province`;
    console.log("URL gọi API:", url);

    try {
        const res = await axios.get<GetAllProvincesResponse>(url);
        console.log("Full API Response:", res);
        console.log("res.data:", res.data);
        console.log("res.data.data:", res.data.data);

        return res.data.data;
    } catch (error) {
        console.error("Lỗi gọi API /api/province:", error);
        throw error;
    }
};


// -------------------------------------------------------------------------

/** Payload & response lấy farm-market-price */
export interface GetFarmMarketPricePayload {
    provinceId: string;
    date: { start: string; end: string };
    productIds: string[];
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
    const res = await axios.post<GetFarmMarketPriceResponse>(
        `${process.env.NEXT_PUBLIC_API_TEST_URL}/api/statistical/farm-market-price`,
        payload
    );
    return res.data.data;
};
