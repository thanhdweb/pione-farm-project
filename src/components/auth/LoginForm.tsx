'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="flex items-center justify-center w-full max-w-[570px]">
            <Card className="w-full rounded-4xl border border-gray-300 px-6 md:px-12 py-6 shadow-lg bg-white">

                <div className="text-center px-2 sm:px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-snug">
                        Log In to Blockchain Farm
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500">
                        Công nghệ đồng hành, nông sản vững mạnh.
                    </p>
                </div>



                {/* Inputs */}
                <div className="grid gap-4">
                    {/* Email */}
                    <div className="rounded-2xl border border-gray-400 px-4 py-2 hover:border-black">
                        <label htmlFor="email" className="block text-xs text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="johndoe@example.com"
                            className="w-full bg-transparent border-none outline-none text-base text-gray-800 placeholder-gray-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative rounded-2xl border border-gray-400 px-4 py-2 hover:border-black">
                        <label htmlFor="password" className="block text-xs text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
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

                    {/* Options */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember" className='text-gray-400 underline'>Remember Me</Label>
                        </div>
                        <a href="#" className="text-gray-400 hover:underline">Forgot Password?</a>
                    </div>

                    {/* Submit */}
                    <Button className="w-full rounded-2xl h-14 text-base bg-[#01A10B] hover:bg-green-700 text-white font-semibold">
                        PROCEED
                    </Button>
                </div>

                {/* Social */}
                <div className="text-center text-gray-500 text-sm">OR USE</div>
                <div className="flex justify-center gap-4">
                    <button>
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.00024" y="1.4502" width="40" height="40" fill="#FAFAFA" stroke="#EEEEEE" />
                            <mask id="mask0_409_105343" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="7" y="7" width="29" height="29">
                                <rect x="7.00024" y="7.4502" width="28" height="28" fill="white" />
                            </mask>
                            <g mask="url(#mask0_409_105343)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M32.4399 19.165H31.5002V19.1165H21.0002V23.7832H27.5936C26.6317 26.4998 24.0469 28.4499 21.0002 28.4499C17.1344 28.4499 14.0002 25.3156 14.0002 21.4499C14.0002 17.5841 17.1344 14.4499 21.0002 14.4499C22.7846 14.4499 24.408 15.123 25.6441 16.2226L28.944 12.9227C26.8603 10.9808 24.0732 9.7832 21.0002 9.7832C14.5572 9.7832 9.3335 15.007 9.3335 21.4499C9.3335 27.8928 14.5572 33.1165 21.0002 33.1165C27.4431 33.1165 32.6668 27.8928 32.6668 21.4499C32.6668 20.6676 32.5863 19.904 32.4399 19.165Z" fill="#FFC107" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.6787 16.0196L14.5118 18.8307C15.549 16.2629 18.0608 14.4499 21.0002 14.4499C22.7846 14.4499 24.408 15.123 25.6441 16.2226L28.944 12.9227C26.8604 10.9808 24.0732 9.7832 21.0002 9.7832C16.519 9.7832 12.6329 12.3131 10.6787 16.0196Z" fill="#FF3D00" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M21.0003 33.1168C24.0138 33.1168 26.7519 31.9635 28.8222 30.0881L25.2113 27.0326C24.04 27.9199 22.584 28.4501 21.0003 28.4501C17.9658 28.4501 15.3892 26.5152 14.4185 23.8149L10.614 26.7462C12.5448 30.5244 16.466 33.1168 21.0003 33.1168Z" fill="#4CAF50" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M32.44 19.1656H31.5002V19.1172H21.0002V23.7839H27.5937C27.1317 25.0888 26.2922 26.214 25.2096 27.0336C25.2102 27.033 25.2107 27.033 25.2113 27.0324L28.8222 30.0879C28.5667 30.3201 32.6669 27.2839 32.6669 21.4505C32.6669 20.6683 32.5864 19.9047 32.44 19.1656Z" fill="#1976D2" />
                            </g>
                        </svg>
                    </button>
                    <button>
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.00024" y="1.4502" width="40" height="40" fill="#FAFAFA" stroke="#EEEEEE" />
                            <mask id="apple-mask0" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="5" y="5" width="33" height="33">
                                <rect x="5.00024" y="5.4502" width="32" height="32" fill="white" />
                            </mask>
                            <g mask="url(#apple-mask0)">
                                <mask id="apple-mask1" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="10" y="7" width="22" height="29">
                                    <rect x="10.0002" y="7.4502" width="21" height="28" fill="white" />
                                </mask>
                                <g mask="url(#apple-mask1)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M27.4292 22.1449C27.4182 20.1379 28.326 18.623 30.1635 17.5074C29.1354 16.0363 27.5823 15.2269 25.5315 15.0683C23.5901 14.9152 21.4682 16.2004 20.6917 16.2004C19.8713 16.2004 17.9901 15.123 16.5135 15.123C13.462 15.1722 10.219 17.5566 10.219 22.4074C10.219 23.8402 10.4815 25.3204 11.0065 26.848C11.7065 28.8551 14.2331 33.7769 16.869 33.6949C18.2471 33.6621 19.2206 32.716 21.0143 32.716C22.7534 32.716 23.6557 33.6949 25.1924 33.6949C27.8502 33.6566 30.1362 29.1832 30.8034 27.1707C27.2377 25.4918 27.4291 22.2488 27.4291 22.1449L27.4292 22.1449ZM24.3338 13.165C25.8268 11.3932 25.6901 9.77988 25.6463 9.2002C24.3284 9.27676 22.8026 10.0971 21.9331 11.1088C20.976 12.1916 20.4127 13.5314 20.5331 15.0408C21.9604 15.1502 23.262 14.4174 24.3338 13.165Z"
                                        fill="black"
                                    />
                                </g>
                            </g>
                        </svg>
                    </button>
                    <button>
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.00024" y="1.4502" width="40" height="40" fill="#FAFAFA" stroke="#EEEEEE" />
                            <mask id="fb-mask0" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="5" y="5" width="33" height="33">
                                <rect x="5.00024" y="5.4502" width="32" height="32" fill="white" />
                            </mask>
                            <g mask="url(#fb-mask0)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M21.0003 8.78369C14.0047 8.78369 8.33364 14.4547 8.33362 21.4503C8.3336 28.4459 14.0046 34.117 21.0002 34.117C27.9958 34.117 33.6669 28.446 33.6669 21.4504C33.667 14.4548 27.9959 8.78374 21.0003 8.78369H21.0003Z"
                                    fill="#039BE5"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M22.7149 24.8072H25.9929L26.5076 21.4772H22.7142V19.6572C22.7142 18.2739 23.1662 17.0472 24.4602 17.0472H26.5396V14.1412C26.1742 14.0919 25.4016 13.9839 23.9416 13.9839C20.8929 13.9839 19.1056 15.5939 19.1056 19.2619V21.4772H15.9716V24.8072H19.1056V33.9599C19.7262 34.0532 20.3549 34.1166 21.0002 34.1166C21.5836 34.1166 22.1529 34.0632 22.7149 33.9872V24.8072Z"
                                    fill="white"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
            </Card>

        </div>

    )
}
