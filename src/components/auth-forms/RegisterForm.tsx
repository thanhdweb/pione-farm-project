'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { AppleIcon, FacebookIcon, GoogleIcon } from '@/components/ui/icon';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { registerUser } from '@/lib/api/auth';

interface RegisterFormValues {
    firstName: string;
    emailOrPhone: string;
    password: string;
    agree: boolean;
}

// Xác định schema kiểm tra lỗi nhập input cho form đăng ký
const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    emailOrPhone: yup
        .string()
        .required('Email or phone is required')
        .test('is-email-or-phone', 'Must be a valid email or 10-digit phone', (value) => {
            if (!value) return false;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10}$/;
            return emailRegex.test(value) || phoneRegex.test(value);
        }),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    agree: yup.boolean().oneOf([true], 'You must accept the terms').required(),
}).required();

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Khởi tạo useForm với schema đã khai báo ở trên
    // resolver giúp tự động validate theo schema khi submit
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(schema),
    });

    // Hàm xử lý khi submit form đăng ký
    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmail = emailRegex.test(data.emailOrPhone); // thêm biến isEmail để tránh kiểm tra lại nhiều lần

            const payload = {
                fullName: data.firstName,
                userName: data.firstName,
                password: data.password,
                ...(isEmail ? { email: data.emailOrPhone } : { phone: data.emailOrPhone }),
            };

            // restAPI Register
            const res = await registerUser(payload);

            toast.success(res.message || 'Register successfully!');
            console.log(res);

            const { userId, type } = res.data;

            // Lưu tên người dùng để hiển thị ở HeaderTop
            // if (user) {
            //     localStorage.setItem('userName', user.fullName || user.userName);
            // }

            // chỉ giữ 1 lần, xác định URL phù hợp:
            const redirectUrl = isEmail
                ? `/auth/verify?userId=${userId}&type=${type}`
                : `/auth/verify?userId=${userId}&type=${type}&phone=${encodeURIComponent(data.emailOrPhone)}`;

            router.push(redirectUrl); //  gọi 1 lần duy nhất

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Registration failed');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-full max-w-[570px]">
            <Card className="w-full rounded-4xl border border-gray-300 px-6 md:px-16 py-6 shadow-lg bg-white">
                <div className="text-center px-2 sm:px-4">
                    <h2 className="text-xl sm:text-3xl font-bold mb-2 leading-snug">Sign up to Blockchain Farm</h2>
                    <p className="text-sm sm:text-base text-gray-500">Công nghệ đồng hành, nông sản vững mạnh.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-4">
                    {/* Name */}
                    <div>
                        <div className="rounded-2xl border border-gray-400 px-4 py-2 hover:border-black">
                            <label htmlFor="firstName" className="block text-xs text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                {...register('firstName')}
                                placeholder="john"
                                className="w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                    </div>

                    {/* Email or Phone */}
                    <div>
                        <div className="rounded-2xl border border-gray-400 px-4 py-2 hover:border-black">
                            <label htmlFor="emailOrPhone" className="block text-xs text-gray-700 mb-1">
                                Email or Phone
                            </label>
                            <input
                                id="emailOrPhone"
                                {...register('emailOrPhone')}
                                placeholder="johndoe@example.com or 0987654321"
                                className="w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {errors.emailOrPhone && <p className="text-red-500 text-xs">{errors.emailOrPhone.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative rounded-2xl border border-gray-400 px-4 py-2 hover:border-black">
                            <label htmlFor="password" className="block text-xs text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                placeholder="********"
                                className="w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    {/* Options */}
                    <div>
                        <Controller
                            name="agree"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="agree"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <Label htmlFor="agree" className="underline text-xs text-gray-400">
                                        I agree to the Terms of Service and Privacy Policy.
                                    </Label>
                                </div>
                            )}
                        />
                        {errors.agree && <p className="text-red-500 text-xs">{errors.agree.message}</p>}
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full rounded-2xl h-14 text-base bg-[#01A10B] hover:bg-green-700 text-white font-semibold"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : 'CREATE AN ACCOUNT'}
                    </Button>
                </form>

                {/* Social */}
                <div className="text-center text-gray-500 text-sm mt-4">OR USE</div>
                <div className="flex justify-center gap-4 mt-2">
                    <button><GoogleIcon /></button>
                    <button><AppleIcon /></button>
                    <button><FacebookIcon /></button>
                </div>
            </Card>
        </div>
    );
}
