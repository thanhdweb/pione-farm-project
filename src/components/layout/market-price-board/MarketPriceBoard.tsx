"use client";

import React from "react";
import FruitPriceTable, { fruitPricesExport, fruitPricesImport } from "@/components/layout/market-price-board/FruitPriceTable";
import { exportFruitPricesToExcel } from "@/utils/exportExcel";

const MarketPriceBoard = () => {
    const handleExportImport = () => {
        exportFruitPricesToExcel(fruitPricesImport, "BangGia_NhapKhau.xlsx");
    };

    const handleExportExport = () => {
        exportFruitPricesToExcel(fruitPricesExport, "BangGia_XuatKhau.xlsx");
    };


    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-24">
            <div>
                <FruitPriceTable
                    title="Bảng giá trái cây"
                    highlight="Nhập khẩu"
                    data={fruitPricesImport}
                />
                {/* Xuất file nhập khẩu */}
                <div className="relative flex justify-self-start mt-12 z-20">
                    <button
                        onClick={handleExportImport}
                        className="w-[302px] h-[54px] text-white font-semibold py-3 px-8 rounded-full shadow-md btn-hover-effect"
                    >
                        Xuất Excel
                    </button>
                </div>
            </div>

            <div>
                <FruitPriceTable
                    title="Bảng giá trái cây"
                    highlight="Xuất khẩu"
                    data={fruitPricesExport}
                />
                {/* Xuất file xuất khẩu */}
                <div className="relative flex mt-12 z-20">
                    <button
                        onClick={handleExportExport}
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
