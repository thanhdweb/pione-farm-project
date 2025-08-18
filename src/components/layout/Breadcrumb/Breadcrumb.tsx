"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findBreadcrumbsByPath } from "@/utils/findMenuItem";

interface BreadcrumbProps {
  customLastItem?: string; // Thêm prop để nhận tiêu đề tin tức
}

const Breadcrumb = ({ customLastItem }: BreadcrumbProps) => {
  const pathname = usePathname();

  // Lấy mảng breadcrumb theo path hiện tại
  const breadcrumbs = findBreadcrumbsByPath(pathname) || [];

  // Nếu không tìm được breadcrumb nào thì không render gì
  if (breadcrumbs.length === 0 && !customLastItem) return null;

  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-600">
      <ol className="flex space-x-2">
        {breadcrumbs.map((item) => (
          <li key={item.label} className="flex items-center">
            <Link href={item.path || "#"} className="hover:underline">
              {item.label}
            </Link>
            <span className="mx-2">{">"}</span>
          </li>
        ))}

        {customLastItem && (
          <li className="flex items-center font-semibold text-gray-900">
            {customLastItem}
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
