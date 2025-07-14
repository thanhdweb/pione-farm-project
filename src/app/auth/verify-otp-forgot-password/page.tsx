'use client';

import VerifyOtpForgotForm from '@/components/auth-forms/VerifyOtpForgotForm'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const VerifyOtpForgot = () => {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('forgotUserId');
        const storedType = localStorage.getItem('forgotType');
        setUserId(storedUserId);
        setType(storedType);
    }, []);

    return (
        <div className='relative min-h-screen bg-[#E8FFE8] overflow-hidden'>
            {/* Background + header giữ nguyên */}
            <div className="absolute top-0 left-0 w-full h-[65vh] z-0 overflow-hidden">
                <Image
                    src="/images/imagelogin.png"
                    alt="Diagonal Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-30 flex items-center justify-between px-4 md:px-12 py-4">
                <Image src="/images/Logo.png" alt="QPay Logo" width={105} height={46} />
                <Button
                    onClick={() => router.push('/auth/signup')}
                    className="px-4 md:px-8 h-12 py-2 rounded-none border border-black hover:bg-black hover:text-white transition">
                    SIGN UP
                </Button>
            </div>

            {/* OTP form */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
                {userId && (
                    <VerifyOtpForgotForm userId={userId} type={type} />
                )}
                <div className="mt-10 text-xs text-center text-gray-400">
                    &copy; 2021 – 2025 All Rights Reserved. Qpay
                </div>
            </div>
        </div>
    );
};

export default VerifyOtpForgot;
