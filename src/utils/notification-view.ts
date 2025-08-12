const NOTIFICATION_VIEWED_KEY = "hasViewedNotifications";

export const hasViewedNotifications = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(NOTIFICATION_VIEWED_KEY) === "true";
};

export const setViewedNotifications = (): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(NOTIFICATION_VIEWED_KEY, "true");
  }
};

export const resetViewedNotifications = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(NOTIFICATION_VIEWED_KEY);
  }
};
