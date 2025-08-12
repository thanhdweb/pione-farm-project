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
import { Spinner } from "@/components/ui/spinner";

import {
    getAllProvinces,
    getFarmMarketPrices,
    getTodayHarvestSummary,
    Province,
    Product,
    HarvestSummary,
} from "@/lib/api/lookup";

export type PriceRow = {
    date: string;
    item: string;
    unit: string;
    marketPrice: number;
    gardenPrice: number;
};

export type LocationRow = {
    date: string;
    location: string;
    quantity: number;
};

type AdvancedSearchProps = {
    onExportData: (products: PriceRow[], locations: LocationRow[]) => void;
};

const AdvancedSearch = ({ onExportData }: AdvancedSearchProps) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");

    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [productData, setProductData] = useState<PriceRow[]>([]);
    const [locationData, setLocationData] = useState<LocationRow[]>([]);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const data = await getAllProvinces();
                setProvinces(data);
            } catch (err) {
                console.error(err);
                setError("Lỗi tải danh sách tỉnh.");
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const found = provinces.find(p => p._id === selectedProvince);
            if (found) setProducts(found.products);
        } else {
            setProducts([]);
        }
        setSelectedProduct("");
    }, [selectedProvince, provinces]);

    const handleSearch = async () => {
        setError("");
        if (!selectedProvince || !fromDate || !toDate) {
            setError("Vui lòng chọn tỉnh và khoảng ngày.");
            return;
        }

        setLoading(true);
        try {
            // === Gọi API danh sách mặt hàng ===
            const farmMarketRes = await getFarmMarketPrices({
                provinceId: selectedProvince,
                date: {
                    start: fromDate.toISOString().split("T")[0],
                    end: toDate.toISOString().split("T")[0],
                },
                productIds: selectedProduct
                    ? [selectedProduct]
                    : products.map(p => p._id),
            });

            // console.log("==> API trả về:", farmMarketRes);
            // console.log("==> productIds gửi lên:", selectedProduct ? [selectedProduct] : products.map(p => p._id));

            // Nếu đã chọn mặt hàng => lọc lại kết quả (đảm bảo chỉ lấy đúng mặt hàng đã chọn)
            const filtered = selectedProduct
                ? farmMarketRes.filter(item => item.productId === selectedProduct)
                : farmMarketRes;

            // console.log("==> Sau khi lọc:", filtered);

            const formattedProductData: PriceRow[] = filtered.map(item => ({
                date: item.date.split("T")[0],
                item: item.productName,
                unit: item.marketUnit,
                marketPrice: item.marketPrice,
                gardenPrice: item.farmPrice,
            }));
            setProductData(formattedProductData);

            // === Gọi API danh sách địa điểm ===
            const harvestRes: HarvestSummary[] = await getTodayHarvestSummary();
            const formattedLocationData: LocationRow[] = harvestRes.map(item => ({
                date: item.date.split("T")[0],
                location: item.provinceName,
                quantity: item.quantitySum,
            }));
            setLocationData(formattedLocationData);

            // Truyền kết quả lên component cha để export Excel
            onExportData(formattedProductData, formattedLocationData);
        } catch (err) {
            console.error(err);
            setError("Lỗi khi tra cứu dữ liệu.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full bg-white/75 rounded-3xl grid grid-cols-1 gap-20 px-6 md:px-10 lg:px-14 py-6"
            style={{ boxShadow: '0 0 12px 0 rgba(4, 255, 0, 0.3)' }}>

            {/* === Bộ lọc === */}
            <div className="grid grid-cols-1 gap-12">
                <h3 className='text-xl font-medium text-black'>Tra cứu tổng hợp:</h3>

                <div className="grid grid-col gap-8 xl:flex xl:justify-between xl:items-center">
                    <div className='grid grid-rows-2 gap-2 sm:flex sm:items-center sm:justify-between xl:gap-14'>
                        <div className='w-full sm:w-[200px] lg:w-[288px] text-xl font-medium'>
                            <CustomDatePicker placeholder="00:00:00" value={fromDate} onChange={setFromDate} />
                        </div>
                        <p className="place-self-center text-sm text-black">Đến</p>
                        <div className='w-full sm:w-[200px] lg:w-[288px] text-xl font-medium'>
                            <CustomDatePicker placeholder="00:00:00" value={toDate} onChange={setToDate} />
                        </div>
                    </div>

                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                        <SelectTrigger className="relative rounded-full px-4 pr-10 w-full sm:w-[288px] !h-[54px] bg-white text-base font-medium border border-gray-300 text-black custom-border-gradient [&>svg]:hidden">
                            <SelectValue placeholder="Chọn tỉnh" />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                <DropdownIcon className="w-4 h-4" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-sm">
                            <SelectGroup>
                                {provinces.map(p => (
                                    <SelectItem key={p._id} value={p._id} className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors">{p.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Chọn mặt hàng + nút tra cứu */}
                <div className="grid grid-rows-2 gap-12 md:flex md:items-center md:justify-between">
                    <Select value={selectedProduct} onValueChange={setSelectedProduct} disabled={products.length === 0}>
                        <SelectTrigger className="relative rounded-full px-4 pr-8 py-2 w-full md:w-[710px] !h-[54px] bg-white border-gray-400 text-gray-400 custom-border-gradient [&>svg]:hidden">
                            <SelectValue placeholder={products.length === 0 ? "Chọn tỉnh trước" : "Chọn mặt hàng"} />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                <DropdownIcon className="w-4 h-4" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-sm max-h-60 overflow-auto">
                            <SelectGroup>
                                {products.map(p => (
                                    <SelectItem key={p._id} value={p._id} className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors">{p.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button onClick={handleSearch} disabled={loading}
                        className='text-white w-full md:max-w-[160px] lg:max-w-[302px] h-[54px] text-base py-2 rounded-full cursor-pointer btn-hover-effect'>
                        {loading ? <Spinner /> : "Tra cứu"}
                    </Button>
                </div>

                {error && <p className="text-red-500">{error}</p>}
            </div>

            {/* === Bảng địa điểm === */}
            <div className="grid grid-cols-1 gap-12">
                <h3 className="text-xl font-medium text-black">Danh sách địa điểm:</h3>
                <div className="rounded-3xl border border-gray-200 shadow-sm bg-white/35 py-5 px-4 md:px-14">
                    <div className="max-h-[456px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
                        <table className="min-w-full text-sm text-left text-black">
                            <thead className="font-medium text-sx md:text-base bg-white/70">
                                <tr className="border-b border-[#D5D5D5] bg-white">
                                    <th className="w-1/5 py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Ngày tháng</th>
                                    <th className="w-3/5 py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Nơi thu thập</th>
                                    <th className="w-1/5 py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locationData.map((row, idx) => (
                                    <tr key={idx} className="border-b border-[#D5D5D5] font-medium text-sx md:text-base">
                                        <td className="w-1/5 py-4 px-4 whitespace-nowrap">{row.date}</td>
                                        <td className="w-3/5 py-4 px-4 whitespace-nowrap">{row.location}</td>
                                        <td className="w-1/5 py-4 px-4 whitespace-nowrap">{row.quantity.toLocaleString()} T</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* === Bảng mặt hàng === */}
            <div className="grid grid-cols-1 gap-12">
                <h3 className="text-xl font-medium text-black">Danh sách mặt hàng:</h3>
                <div className="rounded-3xl border border-gray-200 shadow-sm bg-white/35 py-5 px-4 md:px-14">
                    <div className="max-h-[456px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
                        <table className="min-w-full text-sm text-left text-black">
                            <thead className="font-medium text-sx md:text-base bg-white/70">
                                <tr className='border-b border-[#D5D5D5]'>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Ngày tháng</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Tên mặt hàng</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">ĐVT</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Giá tại chợ</th>
                                    <th className="py-3 px-4 sticky top-0 bg-white whitespace-nowrap">Giá tại vườn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData.map((item, idx) => (
                                    <tr key={idx} className="border-b border-[#D5D5D5] font-medium text-sx md:text-base">
                                        <td className="py-4 px-4 whitespace-nowrap">{item.date}</td>
                                        <td className="py-4 px-4 whitespace-nowrap">{item.item}</td>
                                        <td className="py-4 px-4 whitespace-nowrap">{item.unit}</td>
                                        <td className="py-4 px-4 whitespace-nowrap">{item.marketPrice.toLocaleString()}</td>
                                        <td className="py-4 px-4 whitespace-nowrap">{item.gardenPrice.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedSearch;
