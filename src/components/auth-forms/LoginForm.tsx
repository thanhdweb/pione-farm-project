'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { AppleIcon, FacebookIcon, GoogleIcon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { loginUser } from '@/lib/api/auth';
import Link from 'next/link';
import { getUserInformation } from '@/lib/api/information-user';
import { useUserStore } from '@/lib/store/user-store';

interface LoginFormValues {
    emailOrPhone: string;
    password: string;
    remember: boolean;
}

const schema = yup.object({
    emailOrPhone: yup
        .string()
        .required('Email or phone is required')
        .test('is-email-or-phone', 'Must be a valid email or 10-digit phone', (value) => {
            if (!value) return false;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10}$/;
            return emailRegex.test(value) || phoneRegex.test(value);
        }),
    password: yup.string().required('Password is required'),
    remember: yup.boolean().required(),
}).required();

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            remember: false,
        },
    });

    // Xử lý submit form login
    const onSubmit = async (data: LoginFormValues) => {
        console.log('Submitting...', data);
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const payload = {
                password: data.password,
                ...(emailRegex.test(data.emailOrPhone)
                    ? { email: data.emailOrPhone }
                    : { phone: data.emailOrPhone }),
            };

            const res = await loginUser(payload);

            if (res.success) {
                toast.success(res.message || 'Đăng nhập thành công!');
                const { accessToken, refreshToken } = res.data;
                // save token
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                // handle get fullname and avatar
                try {
                    const userInfo = await getUserInformation();

                    // handle avatar
                    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
                    const avatarUrl = userInfo.avatar
                        ? userInfo.avatar.startsWith('http')
                            ? userInfo.avatar
                            : `${baseUrl}/api/upload/${userInfo.avatar}`
                        : null;

                    // update user-store to HeaderTop display
                    useUserStore.getState().setUser({
                        fullName: userInfo.fullName,
                        avatarUrl: avatarUrl,
                    })
                } catch (error) {
                    console.log("Lỗi khi lấy thông tin user", error)
                }

                setTimeout(() => {
                    router.push('/');
                }, 1000);
            } else {
                toast.error(res.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Login failed');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-full max-w-[570px]">
            <Card className="w-full rounded-4xl border border-gray-300 px-6 md:px-16 py-6 shadow-lg bg-white">
                <div className="text-center px-2 sm:px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-snug">Log In to Blockchain Farm</h2>
                    <p className="text-sm sm:text-base text-gray-500">Công nghệ đồng hành, nông sản vững mạnh.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-4">
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

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <Controller
                                control={control}
                                name="remember"
                                render={({ field }) => (
                                    <Checkbox
                                        id="remember"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                            <Label htmlFor="remember" className="text-gray-400 underline">Remember Me</Label>
                        </div>

                        <Link href="/auth/forgot-password" className="text-gray-400 hover:underline">Forgot Password?</Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-2xl h-14 text-base bg-[#01A10B] hover:bg-green-700 text-white font-semibold"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : 'PROCEED'}
                    </Button>
                </form>

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
