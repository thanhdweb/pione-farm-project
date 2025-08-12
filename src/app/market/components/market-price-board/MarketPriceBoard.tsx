"use client";

import React, { useEffect, useState } from "react";
import FruitPriceTable from "@/app/market/components/market-price-board/FruitPriceTable";
import { exportFruitPricesToExcel } from "@/utils/exportExcel";
import { getFruitImportPrices, FruitImportPriceRecord } from "@/lib/api/fruitprice";
import { DotLoader } from "@/components/ui/spinner";

export type FruitPrice = {
    id: number;
    name: string;
    unit: string;
    price: number;
};

const MarketPriceBoard = () => {
    const [importPrices, setImportPrices] = useState<FruitPrice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImportPrices = async () => {
            try {
                const data: FruitImportPriceRecord[] = await getFruitImportPrices({ scope: "abroad" });
                const mapped: FruitPrice[] = data.map((item, index) => ({
                    id: index + 1,
                    name: item.productName,
                    unit: item.marketUnit,
                    price: item.marketPrice,
                }));
                setImportPrices(mapped);
            } catch (error) {
                console.error("Lỗi khi fetch bảng giá nhập khẩu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImportPrices();
    }, []);

    const handleExportImport = () => {
        exportFruitPricesToExcel(importPrices, "BangGia_NhapKhau.xlsx");
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-24">
            <div>
                {loading ? <DotLoader/> : (
                    <>
                        <FruitPriceTable
                            title="Bảng giá trái cây"
                            highlight="Nhập khẩu"
                            data={importPrices}
                        />
                        <div className="relative flex justify-self-start mt-12 z-20">
                            <button
                                onClick={handleExportImport}
                                className="w-[302px] h-[54px] text-white font-semibold py-3 px-8 rounded-full shadow-md btn-hover-effect"
                            >
                                Xuất Excel
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div>
                <FruitPriceTable
                    title="Bảng giá trái cây"
                    highlight="Xuất khẩu"
                    data={importPrices}
                />
                <div className="relative flex mt-12 z-20">
                    <button
                        onClick={() => exportFruitPricesToExcel([], "BangGia_XuatKhau.xlsx")}
                        className="w-[302px] h-[54px] text-white font-semibold py-3 px-8 rounded-full shadow-md btn-hover-effect"
                    >
                        Xuất Excel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketPriceBoard;
