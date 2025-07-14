'use client'

import NewPasswordForm from '@/components/auth-forms/NewPasswordForm'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const NewPassword = () => {
    const router = useRouter()
    return (
        <div className='relative min-h-screen bg-[#E8FFE8] overflow-hidden'>

            {/* Background image */}
            <div className="absolute top-0 left-0 w-full h-[65vh] z-0 overflow-hidden">
                <Image
                    src="/images/imagelogin.png"
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
                    onClick={() => router.push('/auth/signup')}
                    className="px-4 md:px-8 h-12 py-2 rounded-none border border-black hover:bg-black hover:text-white transition">
                    SIGN UP
                </Button>
            </div>


            {/* Login form */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <NewPasswordForm />
                <div className="mt-10 text-xs text-center text-gray-400">
                    &copy; 2021 – 2025 All Rights Reserved. Qpay
                </div>
            </div>


        </div>

    )
}

export default NewPassword