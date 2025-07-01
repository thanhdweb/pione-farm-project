'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const AuthButtons = () => {
    const router = useRouter();

    return (
        <div
            className='rounded-[2rem] bg-white/61'
            style={{ boxShadow: '0 0 12px 0 rgba(4, 255, 0, 0.3)' }}
        >
            <h2
                className='text-center text-2xl font-bold rounded-3xl py-10'
                style={{ boxShadow: '0 2px 12px 0 rgba(4, 255, 0, 0.3)' }}
            >
                Đăng ký ngay
            </h2>
            <div className='py-12 pb-16 px-8 grid grid-cols-1 gap-4'>
                <Button
                    className='text-white bg-[#00A10B] rounded-full'
                    style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)' }}
                    onClick={() => router.push('/login')}
                >
                    Đăng nhập
                </Button>
                <Button
                    className='text-[#00A10B] bg-white rounded-full'
                    style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)' }}
                    onClick={() => router.push('/login')}
                >
                    Đăng ký
                </Button>
                <Button
                    className='text-[#00A10B] bg-white rounded-full'
                    style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)' }}
                    onClick={() => router.push('/cong-tac-vien')}
                >
                    Cộng tác viên
                </Button>
            </div>
        </div>
    )
}

export default AuthButtons
