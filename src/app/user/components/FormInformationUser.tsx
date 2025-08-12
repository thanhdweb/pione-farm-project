'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getUserInformation, updateUserInformation } from '@/lib/api/information-user';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import axios from 'axios';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { CameraIcon } from '@/components/ui/icon';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import VerifyUpdateOtp from '@/app/user/components/VerifyUpdateOtp';
import { useUserStore } from '@/lib/store/user-store';
import ConnectWallet from '@/app/user/components/ConnectWallet';

interface FormValues {
    fullName?: string;
    userName?: string;
    emailOrPhone?: string;
    yearOfBirth?: number;
    address?: string;
    gender?: 'male' | 'female' | 'other';
    nationality?: string;
    avatar?: FileList;
}


// 2. Payload gửi về backend để cập nhật thông tin
interface UpdateUserInformationPayload {
    fullName?: string;
    userName?: string;
    email?: string;
    phone?: string;
    yearOfBirth?: number;
    address?: string;
    gender?: 'male' | 'female' | 'other';
    nationality?: string;
    avatar?: File;
    verify?: boolean;
}

interface OtpData {
    userId: string;
    type: string;
    emailOrPhone: string;
    otp: string;
}


const NATIONALITIES = [
    'Vietnamese', 'American', 'Japanese', 'Korean', 'Chinese',
    'French', 'German', 'British', 'Italian', 'Spanish',
    'Russian', 'Indian', 'Brazilian', 'Mexican', 'Canadian', 'Australian'
];

const FormInformationUser = () => {
    // register: gắn input
    // handleSubmit: xử lý submit
    // reset: reset form
    const { register, handleSubmit, reset, watch, setValue } = useForm<FormValues>();
    const yearOfBirth = watch("yearOfBirth");
    const gender = watch("gender");

    // State để lưu địa chỉ ví điện tử
    // const [walletAddress, setWalletAddress] = useState<string | null>(null);

    //-----------------------------------------------------------------------

    // State để lưu danh sách năm sinh
    const [years, setYears] = useState<number[]>([]);
    // State để lưu avatar preview
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    // State để lưu file avatar đã chọn
    const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);


    const [initialEmailOrPhone, setInitialEmailOrPhone] = useState<string>("");
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otpData, setOtpData] = useState<OtpData | null>(null);

    const setUser = useUserStore((state) => state.setUser);


    // Tạo danh sách năm sinh từ năm hiện tại
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearList = Array.from({ length: 100 }, (_, i) => currentYear - i);
        setYears(yearList);
    }, []);


    // Lấy thông tin user khi component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserInformation(); // Lấy thông tin user từ API

                // Xử lý avatarPreview chính xác
                if (user.avatar) {
                    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
                    const avatarUrl = user.avatar.startsWith('http')
                        ? user.avatar
                        : `${baseUrl}/api/upload/${user.avatar}`; // SỬA ĐÚNG CHUẨN BE

                    setAvatarPreview(avatarUrl);
                    // Đồng bộ vào store
                    setUser({
                        fullName: user.fullName || 'User',
                        avatarUrl: avatarUrl,
                    });
                } else {
                    setAvatarPreview(null); // Để Image fallback mặc định
                }

                // Xử lý gộp email/phone vào field emailOrPhone để khớp form
                const emailOrPhoneValue = user.email ?? user.phone ?? "";
                // Reset form với dữ liệu user đã gộp email/phone
                reset({
                    ...user,
                    emailOrPhone: emailOrPhoneValue, // gán vào đúng field đang dùng trong form
                    yearOfBirth: user.yearOfBirth ?? undefined,
                    address: user.address ?? undefined,
                    gender: user.gender ?? undefined,
                    nationality: user.nationality ?? undefined,
                    avatar: undefined, // FileList không set qua reset

                });
                setInitialEmailOrPhone(emailOrPhoneValue);

                if (user.avatar) {
                    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
                    const avatarUrl = user.avatar.startsWith('http')
                        ? user.avatar
                        : `${baseUrl}/api/upload/${user.avatar}`;
                    setAvatarPreview(avatarUrl);
                } else {
                    setAvatarPreview(null); // cho phép fallback ảnh mặc định
                }

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message || "Failed to fetch user data.");
                } else {
                    toast.error("Failed to fetch user data.");
                }
            }
        };

        fetchUser();
    }, [reset, setUser]);

    // Hàm xử lý submit cập nhật user
    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmail = emailRegex.test(data.emailOrPhone || "");
            const hasChangedPhoneOrEmail = data.emailOrPhone !== initialEmailOrPhone;

            const payload: UpdateUserInformationPayload = {
                fullName: data.fullName,
                userName: data.userName,
                email: isEmail ? data.emailOrPhone : undefined,
                phone: !isEmail ? data.emailOrPhone : undefined,
                yearOfBirth: data.yearOfBirth,
                address: data.address,
                gender: data.gender,
                nationality: data.nationality,
                avatar: selectedAvatarFile ?? undefined,
                // verify: !hasChangedPhoneOrEmail, // nếu đổi email/phone thì không gửi verify: true
            };

            const res = await updateUserInformation(payload);
            console.log("GỬI LÊN PAYLOAD:", payload);

            if (res.success && res.data?.otp && hasChangedPhoneOrEmail) {
                setOtpData({
                    userId: res.data.otp.userId,
                    type: res.data.otp.type,
                    emailOrPhone: data.emailOrPhone ?? "",
                    otp: res.data.otp.otp,
                });
                setOtpModalVisible(true);
            } else if (res.success) {
                toast.success(res.message || "User updated successfully!");
            } else {
                toast.error(res.message || "Failed to update user.");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to update user.");
            } else {
                toast.error("Failed to update user.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSuccess = () => {
        toast.success("Xác thực OTP thành công!");
        setOtpModalVisible(false);
    };


    return (
        <>
            <div>
                <div className="max-w-xl p-4 grid grid-col-1">
                    <div className='bg-gray-300 rounded-tl-2xl rounded-tr-2xl py-6'>
                    <h2 className="text-center text-lg font-semibold text-gray-800">Cập nhật thông tin người dùng</h2>
                    </div>
                    <Card className="w-full p-6 space-y-4 shadow-lg bg-white/50 rounded-none rounded-br-2xl rounded-bl-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-800 bg-gay/70">
                            <div className="flex justify-center mb-6 relative">
                                {/* Avatar hiện tại hoặc preview */}
                                <Image
                                    src={avatarPreview || '/images/avatar-3.png'} // đã lưu trong public
                                    alt="User Avatar"
                                    width={128}
                                    height={128}
                                    className="w-28 h-28 lg:w-38 lg:h-38 rounded-full object-cover border-4 border-white shadow-md"
                                />

                                {/* Overlay icon camera */}
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('avatarInput')?.click()}
                                    className="absolute bottom-0 translate-x-5/6 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition cursor-pointer"
                                >
                                    <CameraIcon />
                                </button>

                                {/* Hidden file input */}
                                <input
                                    id="avatarInput"
                                    type="file"
                                    accept="image/*"
                                    {...register('avatar')}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            const file = e.target.files[0];
                                            setAvatarPreview(URL.createObjectURL(file));
                                            setSelectedAvatarFile(file); // Cập nhật state để gửi lên BE
                                        }
                                    }}
                                    className="hidden"
                                />

                            </div>

                            <div className='space-y-2'>
                                <Label>Full Name</Label>
                                <input type="text" {...register('fullName')} className="w-full rounded-md border border-gray-400 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800 transition duration-200" />
                            </div>
                            <div className='space-y-2'>
                                <Label>User Name</Label>
                                <input type="text" {...register('userName')} className="w-full rounded-md border border-gray-400 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800 transition duration-200" />
                            </div>
                            <div className='space-y-2'>
                                <Label>Email hoặc Số điện thoại</Label>
                                <input
                                    type="text"
                                    {...register('emailOrPhone')}
                                    className="w-full rounded-md border border-gray-400 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800 transition duration-200"
                                    placeholder="Nhập email hoặc số điện thoại"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label>Year Of Birth</Label>
                                <Select value={yearOfBirth ? String(yearOfBirth) : ""} onValueChange={(value) => setValue("yearOfBirth", Number(value))}>
                                    <SelectTrigger className="w-full border border-gray-400 rounded-md">
                                        <SelectValue placeholder="Chọn năm sinh" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white border border-gray-300 rounded-md'>
                                        <SelectGroup>
                                            {years.map((year) => (
                                                <SelectItem key={year} value={String(year)} className='cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors'>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='space-y-2'>
                                <Label>Address</Label>
                                <input type="text" {...register('address')} className="w-full rounded-md border border-gray-400 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800 transition duration-200" />
                            </div>
                            <div className='space-y-2'>
                                <Label>Gender</Label>
                                <Select value={gender ?? ""} onValueChange={(value) => setValue("gender", value as "male" | "female" | "other")}>
                                    <SelectTrigger className="w-full border border-gray-400 rounded-md">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white border border-gray-300 rounded-md'>
                                        <SelectGroup>
                                            <SelectItem value="male" className='cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors'>Male</SelectItem>
                                            <SelectItem value="female" className='cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors'>Female</SelectItem>
                                            <SelectItem value="other" className='cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors'>Other</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='space-y-2'>
                                <Label>Nationality</Label>
                                <Select
                                    value={watch("nationality") ?? ""}
                                    onValueChange={(value) => setValue("nationality", value)}
                                >
                                    <SelectTrigger className="w-full border border-gray-400 rounded-md">
                                        <SelectValue placeholder="Select nationality" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white border border-gray-300 rounded-md'>
                                        <SelectGroup>
                                            {NATIONALITIES.map((nation) => (
                                                <SelectItem
                                                    key={nation}
                                                    value={nation}
                                                    className='cursor-pointer px-3 py-2 text-sm hover:bg-[#F0FDF4] hover:text-green-700 rounded-md transition-colors'
                                                >
                                                    {nation}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* ví điện tử */}
                            <div>
                                <ConnectWallet />
                            </div>
                            <div className='flex justify-center items-center mt-6'>
                                <Button type="submit" disabled={loading} className='font-semibold text-white bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md transition-colors duration-200'>
                                    {loading ? <Spinner /> : "Cập nhật"}
                                </Button>
                            </div>

                        </form>
                    </Card>
                </div>
            </div>

            {otpModalVisible && otpData && (
                <VerifyUpdateOtp
                    userId={otpData.userId}
                    type={otpData.type}
                    phone={otpData.emailOrPhone}
                    onSuccess={handleOtpSuccess}
                    onClose={() => setOtpModalVisible(false)}
                />
            )}
        </>
    );
};

export default FormInformationUser;   
