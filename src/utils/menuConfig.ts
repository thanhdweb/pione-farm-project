// menuConfig.ts
export interface MenuItem {
    label: string;
    path: string | null;
    children?: MenuItem[];
}

export const menuConfig: MenuItem[] = [
    {
        label: "Trang chủ",
        path: "/",
    },
    {
        label: "Giá nông sản",
        path: null,
        children: [
            {
                label: "Tra cứu tổng hợp",
                path: "/general-lookup",
            },
            {
                label: "Tra cứu nâng cao",
                path: "/advanced-lookup",
            },
        ],
    },
    {
        label: "Giới thiệu",
        path: "/introduction",
    },
    {
        label: "Thị trường",
        path: null,
        children: [
            {
                label: "Thông tin trong nước",
                path: "/market/trongnuoc",
            },
            {
                label: "Thông tin ngoài nước",
                path: "/market/ngoainuoc",
            },
        ],
    },
    
];
