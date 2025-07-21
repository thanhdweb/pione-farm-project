import axios from "axios";

/**
 * Interface định nghĩa cấu trúc dữ liệu sản phẩm theo tỉnh trả về từ API
 */
export interface ProvinceProduct {
    provinceName: string; // Tên tỉnh
    productId: string;    // ID sản phẩm
    productName: string;  // Tên sản phẩm
    typeName: string;     // Loại sản phẩm
    images: string[];     // Danh sách URL hình ảnh sản phẩm
    provinceId: string;   // ID tỉnh
    marketPrice: number;  // Giá thị trường của sản phẩm
}

/**
 * Interface định nghĩa cấu trúc dữ liệu giá sản phẩm trả về từ API
 */
export interface ProductPriceResponse {
    productId: string;    // ID sản phẩm
    productName: string;  // Tên sản phẩm
    quantity: number;     // Số lượng sản phẩm
    priceTrend: number[]; // Dữ liệu xu hướng giá (mảng giá theo từng mốc thời gian)
    priceChange: number;  // Phần trăm thay đổi giá (hoặc số tiền thay đổi)
}

/**
 * Gọi API lấy danh sách sản phẩm theo từng tỉnh
 * API: POST /api/statistical/province-product
 * Không truyền body
 * Trả về: mảng ProvinceProduct
 */
export const getProvinceProducts = async (): Promise<ProvinceProduct[]> => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/statistical/province-product`
    );
    return res.data.data;
};

/**
 * Gọi API lấy dữ liệu giá sản phẩm theo danh sách productIds và provinceId
 * API: POST /api/statistical/product-price
 * Body: { productIds: string[], provinceId: string }
 * Trả về: mảng ProductPriceResponse
 */
export const getProductPriceData = async (
    productIds: string[],
    provinceId: string
): Promise<ProductPriceResponse[]> => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/statistical/product-price`,
        { productIds, provinceId }
    );
    return res.data.data;
};
