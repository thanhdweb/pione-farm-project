"use client";

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DropdownIcon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { getAllProvinces, getFarmMarketPrices, Province, FarmMarketPriceRecord, Product } from "@/lib/api/lookup";
import { Spinner } from "@/components/ui/spinner";

export type PriceRow = {
    date: string;
    item: string;
    unit: string;
    marketPrice: number;
    gardenPrice: number;
};


// Props nhận hàm export data từ component cha để export Excel nếu cần
type GeneralSearchProps = {
    onExportData: (data: PriceRow[]) => void;
};

const GeneralSearch = ({ onExportData }: GeneralSearchProps) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [fromDate, setFromDate] = useState<Date | undefined>();
    const [toDate, setToDate] = useState<Date | undefined>();

    // Lưu mảng kết quả tra cứu sau khi call API
    const [filteredData, setFilteredData] = useState<FarmMarketPriceRecord[]>([]);


    const [loading, setLoading] = useState(false);



    // Lưu thông báo lỗi (nếu có) để hiện ra giao diện
    const [error, setError] = useState<string>("");
    // useEffect chạy 1 lần khi component mount để lấy danh sách tỉnh

    // Gọi API lấy danh sách tỉnh
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const data = await getAllProvinces();
                console.log("Dữ liệu tỉnh nhận được:", data);
                setProvinces(data);
            } catch (err) {
                console.error(err);
                setError("Lỗi tải danh sách tỉnh.");
            }
        };
        fetchProvinces();
    }, []);

    /**
     * useEffect theo dõi khi chọn tỉnh:
     * Tìm trong mảng provinces, lấy mảng productIds của tỉnh đang chọn để fill vào dropdown mặt hàng
     * Reset selectedProduct khi đổi tỉnh
     */
    useEffect(() => {
        if (selectedProvince) {
            const province = provinces.find((p) => p._id === selectedProvince);
            if (province) {
                setProducts(province.products);
            }
        } else {
            setProducts([]);
        }
        setSelectedProduct(""); // reset mặt hàng khi đổi tỉnh
    }, [selectedProvince, provinces]);

    /**
     * Xử lý khi bấm nút "Tra cứu":
     * - Kiểm tra đã chọn tỉnh, ngày bắt đầu, ngày kết thúc, mặt hàng chưa
     * - Gửi payload call API /api/statistical/farm-market-price
     * - Lưu kết quả vào state filteredData và gọi onExportData để truyền data ra ngoài
     */
    const handleSearch = async () => {
        setError("");
        if (!selectedProvince || !fromDate || !toDate) {
            setError("Vui lòng chọn tỉnh và khoảng ngày trước khi tra cứu.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                provinceId: selectedProvince,
                date: {
                    start: fromDate.toISOString().split("T")[0],
                    end: toDate.toISOString().split("T")[0],
                },
                productIds: selectedProduct
                    ? [selectedProduct]
                    : products.map((p) => p._id), // nếu chưa chọn mặt hàng thì gửi hết
            };

            const data = await getFarmMarketPrices(payload);

            // Nếu đã chọn mặt hàng, lọc data theo tên mặt hàng
            const finalData = selectedProduct
                ? data.filter((item) =>
                    item.productId === selectedProduct
                )
                : data;


            setFilteredData(finalData);
            onExportData(
                finalData.map((item) => ({
                    date: item.date.split("T")[0],
                    item: item.productName,
                    unit: item.marketUnit,
                    marketPrice: item.marketPrice,
                    gardenPrice: item.farmPrice,
                }))
            );

        } catch (err) {
            console.error(err);
            setError("Lỗi khi tra cứu dữ liệu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="w-full bg-white/75 rounded-3xl grid grid-cols-1 gap-20 px-6 md:px-10 lg:px-14 py-6"
            style={{ boxShadow: '0 0 12px 0 rgba(4, 255, 0, 0.3)' }}
        >
            {/* Tiêu đề */}
            <div className="grid grid-cols-1 gap-12">
                <h3 className='text-xl font-medium text-black'>Tra cứu tổng hợp:</h3>

                {/* Bộ lọc chọn ngày + tỉnh */}
                <div className="grid grid-col gap-8 xl:flex xl:justify-between xl:items-center">
                    {/* Chọn ngày bắt đầu và kết thúc */}
                    <div className='grid grid-rows-2 gap-2 sm:flex sm:items-center sm:justify-between xl:gap-14'>
                        <div className='w-full sm:w-[200px] lg:w-[288px] text-xl font-medium'>
                            <CustomDatePicker
                                placeholder="00:00:00"
                                value={fromDate}
                                onChange={setFromDate}
                            />
                        </div>

                        <p className="place-self-center text-center text-sm font-medium text-black leading-none">
                            Đến
                        </p>

                        <div className='w-full sm:w-[200px] lg:w-[288px] text-xl font-medium'>
                            <CustomDatePicker
                                placeholder="00:00:00"
                                value={toDate}
                                onChange={setToDate}
                            />
                        </div>
                    </div>

                    {/* Chọn tỉnh */}
                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                        <SelectTrigger className="relative flex items-center justify-center rounded-full px-4 pr-10 w-full sm:w-[288px] !h-[54px] bg-white text-xl font-medium text-black border border-gray-300 custom-border-gradient [&>svg]:hidden">
                            <SelectValue placeholder="Chọn tỉnh" />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                <DropdownIcon className="w-4 h-4" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-sm">
                            <SelectGroup>
                                {/* select tỉnh */}
                                {(provinces ?? []).map((province) => (
                                    <SelectItem key={province._id} value={province._id} className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors">
                                        {province.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Chọn mặt hàng + nút tra cứu */}
                <div className='grid grid-rows-2 gap-12 md:flex md:items-center md:justify-between'>
                    {/* Chọn mặt hàng */}
                    <Select
                        value={selectedProduct}
                        onValueChange={setSelectedProduct}
                        disabled={products.length === 0}
                    >
                        <SelectTrigger className="relative rounded-full px-4 pr-8 py-2 w-full md:w-[710px] !h-[54px] bg-white text-base border-gray-400 text-gray-400 custom-border-gradient [&>svg]:hidden">
                            <SelectValue placeholder={products.length === 0 ? "Chọn tỉnh trước" : "Chọn mặt hàng"} />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                <DropdownIcon />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-sm max-h-60 overflow-auto">
                            <SelectGroup>
                                {products.map((product) => (
                                    <SelectItem key={product._id} value={product._id} className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors">
                                        {product.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Nút tra cứu */}
                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        className='text-white w-full md:max-w-[160px] lg:max-w-[302px] h-[54px] text-base py-2 rounded-full cursor-pointer btn-hover-effect'
                        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
                    >
                        {loading ? <Spinner /> : "Tra cứu"}
                    </Button>
                </div>

                {/* Thông báo lỗi */}
                {error && <p className="text-red-500 font-medium">{error}</p>}
            </div>

            {/* Kết quả tra cứu */}
            <div className="grid grid-cols-1 gap-12">
                <h3 className="text-xl font-medium text-black">Kết quả:</h3>
                <div className="rounded-3xl shadow-sm border border-gray-200 bg-white/35 py-5 px-4 md:px-14">
                    <div className="max-h-[456px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
                        <table className="min-w-full text-sm text-left text-black">
                            <thead className="font-medium text-sx md:text-base bg-white/70">
                                <tr className='border-b border-[#D5D5D5]'>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Ngày</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Tên mặt hàng</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">ĐVT</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Giá chợ</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Giá vườn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <tr key={item.productId + item.date} className="border-b border-[#D5D5D5] font-medium text-sx md:text-base">
                                            <td className="py-4 px-4 whitespace-nowrap">{item.date.split("T")[0]}</td>
                                            <td className="py-4 px-4 whitespace-nowrap">{item.productName}</td>
                                            <td className="py-4 px-4 whitespace-nowrap">{item.marketUnit}</td>
                                            <td className="py-4 px-4 whitespace-nowrap">{item.marketPrice.toLocaleString()}</td>
                                            <td className="py-4 px-4 whitespace-nowrap">{item.farmPrice.toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                                            Không tìm thấy kết quả
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralSearch;
