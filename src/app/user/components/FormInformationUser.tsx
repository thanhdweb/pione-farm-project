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

const NATIONALITIES = [
    'Vietnamese', 'American', 'Japanese', 'Korean', 'Chinese',
    'French', 'German', 'British', 'Italian', 'Spanish',
    'Russian', 'Indian', 'Brazilian', 'Mexican', 'Canadian', 'Australian'
];

const FormInformationUser = () => {
    // register: gắn input
    // handleSubmit: xử lý submit
    // reset: reset form
    const { register, handleSubmit, reset } = useForm<FormValues>();

    // State để lưu avatar preview
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    // State để lưu file avatar đã chọn
    const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);


    const [loading, setLoading] = useState(false);

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
    }, [reset]);


    // Hàm xử lý submit form
    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        try {
            // Xử lý emailOrPhone tách thành email hoặc phone
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmail = emailRegex.test(data.emailOrPhone || "");

            const payload = {
                ...data,
                email: isEmail ? data.emailOrPhone : undefined,
                phone: !isEmail ? data.emailOrPhone : undefined,
                // avatar: data.avatar?.[0],
                avatar: selectedAvatarFile ?? undefined,
            };

            // Xóa emailOrPhone không cần gửi
            delete payload.emailOrPhone;

            const res = await updateUserInformation(payload); // Gọi API cập nhật thông tin user
            if (res.success) {
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


    //

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className="max-w-xl p-4 grid grid-col-1 gap-6">
                    <h2 className="text-center text-lg font-semibold text-gray-800">Cập nhật thông tin người dùng</h2>
                    <Card className="w-full p-6 space-y-4 shadow-lg bg-white/70">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-800 bg-gay/70">
                            <div className="flex justify-center mb-6 relative">
                                {/* Avatar hiện tại hoặc preview */}
                                <Image
                                    src={avatarPreview ?? '/images/avatar-3.png'} // đã lưu trong public
                                    alt="User Avatar"
                                    width={128}
                                    height={128}
                                    className="w-28 h-28 lg:w-38 lg:h-38 rounded-full object-cover border-4 border-white shadow-md"
                                />

                                {/* Overlay icon camera */}
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('avatarInput')?.click()}
                                    className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
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
                                <input type="text" {...register('fullName')} className="w-full border rounded p-2" />
                            </div>
                            <div className='space-y-2'>
                                <Label>User Name</Label>
                                <input type="text" {...register('userName')} className="w-full border rounded p-2" />
                            </div>
                            <div className='space-y-2'>
                                <Label>Email hoặc Số điện thoại</Label>
                                <input
                                    type="text"
                                    {...register('emailOrPhone')}
                                    className="w-full border rounded p-2"
                                    placeholder="Nhập email hoặc số điện thoại"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label>Year Of Birth</Label>
                                <input type="number" {...register('yearOfBirth')} className="w-full border rounded p-2" />
                            </div>
                            <div className='space-y-2'>
                                <Label>Address</Label>
                                <input type="text" {...register('address')} className="w-full border rounded p-2" />
                            </div>
                            <div className='space-y-2'>
                                <Label>Gender</Label>
                                <select {...register('gender')} className="w-full border rounded p-2">
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className='space-y-2'>
                                <Label>Nationality</Label>
                                <select {...register('nationality')} className="w-full border rounded p-2">
                                    <option value="">Select nationality</option>
                                    {NATIONALITIES.map((nation) => (
                                        <option key={nation} value={nation}>{nation}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex justify-center items-center mt-4'>
                                <Button type="submit" disabled={loading}>
                                    {loading ? <Spinner /> : "Cập nhật"}
                                </Button>
                            </div>

                        </form>
                    </Card>
                </div>

                {/* kết nối ví điện tử */}
                <div className='max-w-sm p-4'>
                    <h2 className="text-center text-lg font-semibold text-gray-800">Kết nối ví điện tử</h2>
                    <Card className="w-full p-6 space-y-4 shadow-lg bg-white/70 mt-6">
                        <p className="text-center text-gray-600">Chức năng này sẽ sớm được cập nhật.</p>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default FormInformationUser;
