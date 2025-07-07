'use client';

import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';

interface VerifyOtpFormProps {
    userId: string;
    type?: string | null;
}

const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({ userId, type }) => {
    const [otpValues, setOtpValues] = useState(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);

    const router = useRouter();

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otpValues];
        newOtp[index] = value;
        setOtpValues(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Thêm vào trước:
    const resetOtpFields = () => {
        setOtpValues(Array(6).fill(''));
        setTimeout(() => inputRefs.current[0]?.focus(), 50);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otp = otpValues.join('');

        if (otp.length < 6) {
            toast.error('Vui lòng nhập đủ 6 số OTP');
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/authentication/verify-otp`, {
                otp,
                userId,
            });

            if (res.data.success) {
                toast.success(res.data.message || 'Xác minh thành công!');
                setTimeout(() => {
                    router.push('/auth/login');
                }, 1500);
            } else {
                toast.error(res.data.message || 'Xác minh thất bại');
                resetOtpFields();
                setAttemptCount(prev => prev + 1);

                if (res.data.message?.includes('after 60 second')) {
                    toast.info('Bạn đã nhập sai quá nhiều. Vui lòng đợi 60 giây rồi thử lại.');
                }

                // Sau khi sai 3 lần tự gửi lại OTP và chờ 15s
                if (attemptCount + 1 >= 3) {
                    toast.info('Bạn đã nhập sai 3 lần, đang gửi lại OTP mới...');
                    setAttemptCount(0);
                    await handleResendOtp();
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { data, status } = error.response;
                console.log('Error status:', status);
                console.log('Error data:', data);

                toast.error(data.message || 'Xác minh OTP thất bại');
            } else {
                toast.error('Lỗi không xác định');
            }
            // Dù lỗi gì cũng reset input + focus lại để user không bị kẹt
            resetOtpFields();
            setAttemptCount(prev => prev + 1);

            // Sau khi sai 3 lần tự gửi lại OTP và chờ 15s
            if (attemptCount + 1 >= 3) {
                toast.info('Bạn đã nhập sai 3 lần, đang gửi lại OTP mới...');
                setAttemptCount(0);
                await handleResendOtp();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0 || isResending) return;
        setIsResending(true);

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/authentication/again-otp`;
        const payload = { userId, type };

        console.log("URL resend OTP:", url);
        console.log("Payload resend OTP:", payload);

        try {
            const res = await axios.post(url, payload);
            console.log("Response resend OTP:", res.data);

            if (res.data.success) {
                toast.success(res.data.message || 'OTP mới đã được gửi');
                console.log('OTP mới:', res.data.data?.otp);
                setResendTimer(15);
                resetOtpFields();
            } else {
                toast.error(res.data.message || 'Không thể gửi lại OTP');

                if (res.data.message.includes('register again')) {
                    toast.info('Bạn đã gửi lại OTP quá số lần, cần đăng ký lại.');
                    setTimeout(() => {
                        router.push('/auth/register');
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('Resend OTP error:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.log('Resend OTP error response:', error.response.data);
            }
            toast.error('Gửi lại OTP thất bại.');
        } finally {
            setIsResending(false);
        }
    };

    useEffect(() => {
        if (resendTimer <= 0) return;
        const interval = setInterval(() => {
            setResendTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [resendTimer]);

    return (
        <div className="flex items-center justify-center w-full max-w-[400px]">
            <Card className="w-full rounded-4xl border border-gray-300 px-6 md:px-10 py-6 shadow-lg bg-white">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Xác thực OTP</h2>
                    <p className="text-sm sm:text-base text-gray-500 mb-4">Nhập mã OTP 6 số được gửi đến bạn</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                    <div className="flex justify-center gap-2">
                        {otpValues.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-9 h-9 sm:w-12 sm:h-12 text-center border border-gray-400 rounded-md text-base sm:text-xl focus:outline-none focus:border-black"
                            />
                        ))}
                    </div>
                    <Button
                        type="submit"
                        className="w-full rounded-2xl h-14 text-base bg-[#01A10B] hover:bg-green-700 text-white font-semibold mt-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : 'Xác minh OTP'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-2xl h-12 text-base mt-2"
                        disabled={resendTimer > 0 || isResending}
                        onClick={handleResendOtp}
                    >
                        {isResending ? (
                            <Spinner />
                        ) : resendTimer > 0 ? (
                            `Gửi lại OTP sau ${resendTimer}s`
                        ) : (
                            'Gửi lại OTP'
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default VerifyOtpForm;
