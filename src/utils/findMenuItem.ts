// utils/findMenuItem.ts
import { menuConfig, MenuItem } from "@/utils/menuConfig";


export function findMenuItem(
  label: string,
  items: MenuItem[] = menuConfig
): MenuItem | undefined {
  for (const item of items) {
    if (item.label === label) return item;
    if (item.children) {
      const found = findMenuItem(label, item.children);
      if (found) return found;
    }
  }
  return undefined;
}


// Hàm mới tìm breadcrumb theo path
export function findBreadcrumbsByPath(
  path: string,
  items: MenuItem[] = menuConfig
): MenuItem[] | null {
  for (const item of items) {
    if (item.path === path) {
      return [item];
    }
    if (item.children) {
      const childPath = findBreadcrumbsByPath(path, item.children);
      if (childPath) {
        return [item, ...childPath];
      }
    }
  }
  return null;
}


