import axios from 'axios';
import axiosInstance from '@/lib/api/axiosInstance';

// REGISTER USER -------------------------------------------------------------

export interface RegisterPayload {
    fullName: string;
    userName: string;
    password: string;
    email?: string;
    phone?: string;
}

export interface RegisterResponse {
    message: string;
    data: {
        userId: string;
        type: string;
    };
}

export const registerUser = async (
    payload: RegisterPayload
): Promise<RegisterResponse> => {
    const res = await axios.post<RegisterResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/authentication/register`,
        payload
    );
    return res.data;
};

// VERIFY_OTP  -----------------------------------------------


/** Payload xác thực OTP */
export interface VerifyOtpPayload {
    userId: string;
    otp: string;
}

/** Response trả về từ API xác thực OTP */
export interface VerifyOtpResponse {
    success: boolean;
    message: string;
}

/** Gửi yêu cầu xác thực OTP */
export const verifyOtp = async (
    payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
    const res = await axios.post<VerifyOtpResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/authentication/verify-otp`,
        payload
    );
    return res.data;
};



/** Payload gửi lại OTP ------------------------------------------------- */
export interface ResendOtpPayload {
    userId: string;
    type?: string | null;
    phone?: string;
}

/** Response trả về từ API gửi lại OTP */
export interface ResendOtpResponse {
    success: boolean;
    message: string;
    data?: {
        otp?: string;
    };
}

/** Gửi yêu cầu gửi lại OTP */
export const resendOtp = async (
    payload: ResendOtpPayload
): Promise<ResendOtpResponse> => {
    const res = await axios.post<ResendOtpResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/authentication/again-otp`,
        payload
    );
    return res.data;
};

// LOGIN USER -------------------------------------------------------------
/** Payload cho login */
export interface LoginPayload {
    email?: string;
    phone?: string;
    password: string;
}

/** Response trả về từ API login */
export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

/** Gửi yêu cầu login */
export const loginUser = async (
    payload: LoginPayload
): Promise<LoginResponse> => {
    const res = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/authentication/login`,
        payload
    );
    return res.data;
};


// Logout User -------------------------------------------------------------
export const logoutUser = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
        throw new Error("Thiếu token hoặc chưa đăng nhập.");
    }

    const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/authentication/log-out`,
        { refreshToken }
    );

    return response.data;
};

// Refresh Token -------------------------------------------------------------
/**
 * Refresh accessToken từ refreshToken đang lưu trong localStorage
 * và trả về accessToken mới
 */
export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        console.error("Không tìm thấy refreshToken trong localStorage.");
        return null;
    }

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/authentication/refresh-token`, {
            refreshToken: refreshToken
        });

        const newAccessToken = response.data.accessToken;

        // Lưu lại accessToken mới
        localStorage.setItem("accessToken", newAccessToken);

        console.log("Đã refresh accessToken thành công:", newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error("Lỗi khi refresh accessToken:", error);
        return null;
    }
};