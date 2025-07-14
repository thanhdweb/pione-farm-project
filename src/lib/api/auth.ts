import axios from 'axios';

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
        `${process.env.NEXT_PUBLIC_API_TEST_URL}/api/authentication/register`,
        payload
    );
    return res.data;
};

// VERIFY_OTP and AGAIN-OTP -----------------------------------------------


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
        `${process.env.NEXT_PUBLIC_API_TEST_URL}/api/authentication/verify-otp`,
        payload
    );
    return res.data;
};

/** Payload gửi lại OTP */
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
        `${process.env.NEXT_PUBLIC_API_TEST_URL}/api/authentication/again-otp`,
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
        `${process.env.NEXT_PUBLIC_API_TEST_URL}/api/authentication/login`,
        payload
    );
    return res.data;
};


