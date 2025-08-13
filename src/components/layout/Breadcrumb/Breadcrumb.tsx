"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findBreadcrumbsByPath } from "@/utils/findMenuItem";

const Breadcrumb = () => {
  const pathname = usePathname();

  // Lấy mảng breadcrumb theo path hiện tại
  const breadcrumbs = findBreadcrumbsByPath(pathname) || [];

  // Nếu không tìm được breadcrumb nào thì không render gì
  if (breadcrumbs.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-600">
      <ol className="flex space-x-2">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={item.label} className="flex items-center">
              {!isLast ? (
                <Link href={item.path || "#"} className="hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-gray-900">{item.label}</span>
              )}
              {!isLast && <span className="mx-2">{'>'}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
