import axios from "axios";


// Kiểu dữ liệu trả về từ API
export interface FruitImportPriceRecord {
    productId: string;
    productName: string;
    marketPrice: number;
    farmPrice: number;
    date: string;
    provinceName: string;
    provinceId: string;
    marketUnit: string;
}

// Response shape
interface GetFruitImportPriceResponse {
    success: boolean;
    message: string;
    data: FruitImportPriceRecord[];
}

// Payload shape
interface GetFruitImportPricePayload {
    scope?: "abroad";
}

// Hàm gọi API lấy giá nhập khẩu
export const getFruitImportPrices = async (
    payload?: GetFruitImportPricePayload
): Promise<FruitImportPriceRecord[]> => {
    const res = await axios.post<GetFruitImportPriceResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/statistical/farm-market-price`,
        payload ?? {}
    );
    console.log("getFruitImportPrices response:", res.data);
    return res.data.data;
};


