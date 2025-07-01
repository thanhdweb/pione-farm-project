'use client'

import RegisterForm from '@/components/auth/RegisterForm'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const LoginPage = () => {
    const router = useRouter();
    return (
        <div className='relative min-h-screen bg-[#E8FFE8] overflow-hidden'>

            {/* Background image */}
            <div className="absolute top-0 left-0 w-full h-[65vh] z-0">
                <Image
                    src="/images/imagesignup.png"
                    alt="Diagonal Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Header: logo + button */}
            <div className="relative z-30 flex items-center justify-between px-4 md:px-12 py-4">
                <Image src="/images/Logo.png" alt="QPay Logo" width={105} height={46} />
                <Button
                    onClick={() => router.push('/login')}
                    className="px-4 md:px-8 py-2 border border-black hover:bg-black hover:text-white transition">
                    SIGN IN
                </Button>
            </div>


            {/* Login form */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <RegisterForm />
                <div className="mt-10 text-xs text-center text-gray-400">
                    &copy; 2021 – 2025 All Rights Reserved. Qpay
                </div>
            </div>


        </div>

    )
}

export default LoginPage