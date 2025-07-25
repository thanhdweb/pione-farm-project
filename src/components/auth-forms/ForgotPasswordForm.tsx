'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/lib/api/user';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface ForgotPasswordFormValues {
    emailOrPhone: string;
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
}).required();

export default function ForgotPasswordForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const payload = emailRegex.test(data.emailOrPhone)
                ? { email: data.emailOrPhone }
                : { phone: data.emailOrPhone };

            const res = await forgotPassword(payload);

            if (res.success) {
                toast.success(res.message || 'OTP sent successfully');

                localStorage.setItem('forgotUserId', String(res.data?.userId));
                localStorage.setItem('forgotType', res.data?.type || '');

                // Lưu thông tin email hoặc phone vào localStorage
                if (payload.phone) {
                    localStorage.setItem('forgotPhone', payload.phone);
                }
                if (payload.email) {
                    localStorage.setItem('forgotEmail', payload.email);
                }

                if (res.data?.otp) {
                    localStorage.setItem('forgotOtp', res.data?.otp);
                }

                console.log('OTP:', res.data?.otp);
                console.log('userId:', res.data?.userId);
                console.log('Type:', res.data?.type);


                router.push(`/auth/verify-otp-forgot-password?userId=${res.data?.userId}&type=${res.data?.type || ''}`);
            } else {
                toast.error(res.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            toast.error('An error occurred while sending OTP.');
        }
    };

    return (
        <div className="flex items-center justify-center w-full max-w-[570px]">
            <Card className="w-full rounded-4xl border border-gray-300 px-6 md:px-16 py-6 shadow-lg bg-white">
                <div className="text-center px-2 sm:px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-snug">Forgot Password</h2>
                    <p className="text-sm sm:text-base text-gray-500">Enter your email or phone to receive OTP.</p>
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
                        {errors.emailOrPhone && (
                            <p className="text-red-500 text-xs">{errors.emailOrPhone.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-2xl h-14 text-base bg-[#01A10B] hover:bg-green-700 text-white font-semibold"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : 'SEND OTP'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
