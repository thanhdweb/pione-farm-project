export const isTokenExpiringSoon = (token: string, thresholdSeconds = 60): boolean => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp;
        const now = Math.floor(Date.now() / 1000);
        return exp - now < thresholdSeconds;
    } catch (error) {
        console.error("Không đọc được token:", error);
        return true; // lỗi thì bắt buộc refresh
    }
};
