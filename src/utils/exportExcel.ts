import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FruitPrice } from "@/app/market/components/market-price-board/FruitPriceTable";

export function exportFruitPricesToExcel(data: FruitPrice[], filename: string) {
    // Chuyển dữ liệu thành định dạng array of objects
    const exportData = data.map((item) => ({
        "Tên mặt hàng": item.name,
        "Đơn vị tính": item.unit,
        "Giá tại chợ": item.price,
    }));

    // Tạo worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Tạo workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng giá");

    // Ghi workbook ra blob
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    // Tải file
    saveAs(blob, filename);
}



