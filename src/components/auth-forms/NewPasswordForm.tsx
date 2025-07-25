'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation'; // ✅ gộp import
import { toast } from 'react-toastify';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { newPassword } from '@/lib/api/user';

interface NewPasswordFormValues {
    newPassword: string;
    confirmPassword: string;
}

const schema = yup.object({
    newPassword: yup.string().required('New password is required').min(6, 'At least 6 characters'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your password'),
});

export default function NewPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const searchParams = useSearchParams();
    const userId = searchParams.get('userId'); // lấy userId từ query
    // const type = searchParams.get('type');     // lấy type từ query nếu cần

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<NewPasswordFormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: NewPasswordFormValues) => {
        try {
            //  Kiểm tra userId có tồn tại không trước khi gọi API
            if (!userId) {
                toast.error('User ID not found. Please retry the forgot password process.');
                return;
            }

            //  Gọi API đổi mật khẩu
            const res = await newPassword({
                newPassword: data.newPassword,
                userId,
            });

            if (res.success) {
                toast.success(res.message || 'Password updated successfully!');

                //  Chuyển về trang login sau 1s
                setTimeout(() => {
                    router.push('/auth/login');
                }, 1000);
            } else {
                toast.error(res.message || 'Failed to update password.');
            }
        } catch (error) {
            console.error('Update password error:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center w-full max-w-[570px]">
            <Card className="w-full rounded-4xl border border-gray-300 px-6 md:px-16 py-6 shadow-lg bg-white">
                <div className="text-center px-2 sm:px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-snug">Reset Your Password</h2>
                    <p className="text-sm sm:text-base text-gray-500">Enter your new password to continue.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-4">

                    {/* New Password */}
                    <div>
                        <div className="relative rounded-2xl border border-gray-400 px-4 py-2 hover:border-black">
                            <label htmlFor="newPassword" className="block text-xs text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                {...register('newPassword')}
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
                        {errors.newPassword && <p className="text-red-500 text-xs">{errors.newPassword.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <div className="relative rounded-2xl border border-gray-400 px-4 py-2 hover:border-black">
                            <label htmlFor="confirmPassword" className="block text-xs text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                placeholder="********"
                                className="w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-2xl h-14 text-base bg-[#01A10B] hover:bg-green-700 text-white font-semibold"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : 'RESET PASSWORD'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
