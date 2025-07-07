"use client";

import { useEffect, useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
} from "@/components/ui/select"; // đường dẫn tuỳ setup project

type Location = {
    id: string;
    name: string;
};

const LocationSelector = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        // Data cứng tạm thời (sau thay bằng REST API)
        const mockData: Location[] = [
            { id: "location1", name: "Điểm 1" },
            { id: "location2", name: "Điểm 2" },
            { id: "location3", name: "Điểm 3" },
        ];
        setLocations(mockData);
    }, []);

    return (
        <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="relative w-full px-6 py-6 md:min-h-[89px] flex items-center pr-20 rounded-3xl border-none bg-white text-gray-800 text-base md:text-xl lg:text-2xl font-medium [&>svg]:hidden"
                style={{ boxShadow: "0 0 12px 0 rgba(4, 255, 0, 0.3)" }}>
                <SelectValue placeholder="Danh sách điểm thu thập giá nông sản" />
                <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                        className="w-4 h-4 lg:!w-6 lh:!h-6"
                        viewBox="0 0 27 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.5 24L0.0766088 0.749997L26.9234 0.75L13.5 24Z"
                            fill="#1C8000"
                        />
                    </svg>
                </div>
            </SelectTrigger>

            <SelectContent className="bg-white border border-gray-300 rounded-xl shadow-md">
                <SelectGroup>
                    {locations.map((loc) => (
                        <SelectItem
                            key={loc.id}
                            value={loc.id}
                            className="cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors"
                        >
                            {loc.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default LocationSelector;
