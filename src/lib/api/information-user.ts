import axios from "axios";

// Kiểu dữ liệu trả về từ API
export interface UserInformation {
    id: number;
    fullName: string;
    userName: string;
    email: string | null;
    phone: string | null;
    yearOfBirth: number | null;
    address: string | null;
    avatar: string | null;
    gender: "male" | "female" | "other" | null;
    nationality: string | null;
    createdAt: string;
    updateAt: string;
}

// Response shape
interface GetUserInformationResponse {
    success: boolean;
    message: string;
    data: UserInformation;
}

// Lấy thông tin user
export const getUserInformation = async (): Promise<UserInformation> => {
    const res = await axios.get<GetUserInformationResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/get-user`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
            },
        }
    );
    console.log("getUserInformation response:", res.data);
    return res.data.data;
};

// Cập nhật thông tin user ---------------------------------
interface UpdateUserInformationPayload {
    fullName?: string;
    userName?: string;
    email?: string;
    phone?: string;
    yearOfBirth?: number;
    address?: string;
    gender?: "male" | "female" | "other";
    nationality?: string;
    avatar?: File;
}

interface UpdateUserOTPData {
    otp: {
        otp: string;
        userId: string;
        type: string;
    };
}

interface UpdateUserInformationResponse {
    success: boolean;
    message: string;
    data?: UpdateUserOTPData;
}

export const updateUserInformation = async (
    payload: UpdateUserInformationPayload
): Promise<UpdateUserInformationResponse> => {
    let dataToSend: FormData | UpdateUserInformationPayload = payload;

    if (payload.avatar) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value instanceof File ? value : String(value));
            }
        });
        dataToSend = formData;
    }

    const res = await axios.put<UpdateUserInformationResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/user`,
        dataToSend,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
            },
        }
    );
    console.log("updateUserInformation response:", res.data);
    return res.data;
};

// Đổi mật khẩu user
export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const changePassword = async (payload: ChangePasswordPayload) => {
    const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/change-password`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
            },
        }
    );
    console.log("changePassword response:", res.data);
    return res.data;
}