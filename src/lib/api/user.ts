import axios from 'axios';
// FORGOT PASSWORD -------------------------------------------------------------
export interface ForgotPasswordPayload {
    email?: string;
    phone?: string;
}

export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
    data?: {
        otp?: string;
        userId: string;
        type: string;
    };
}

export const forgotPassword = async (
    payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> => {
    const res = await axios.post<ForgotPasswordResponse>(
        `${process.env.NEXT_PUBLIC_API_TEST_URL}/api/user/forgot-password`,
        payload
    );
    return res.data;
};

// RESET PASSWORD -------------------------------------------------------------
interface NewPasswordPayload {
    newPassword: string;
    userId: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
}

export const newPassword = async (
    payload: NewPasswordPayload
): Promise<ApiResponse> => {
    const res = await axios.post<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_TEST_URL}/api/user/new-password`,
        payload
    );
    return res.data;
};
