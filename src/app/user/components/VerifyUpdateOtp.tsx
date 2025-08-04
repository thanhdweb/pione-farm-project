'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { verifyOtp, resendOtp } from '@/lib/api/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Props {
  userId: string;
  type?: string;
  phone?: string;
  onSuccess: () => void;
  onClose: () => void;
}

const VerifyUpdateOtp: React.FC<Props> = ({ userId, type, phone, onSuccess, onClose }) => {
  const [otpValues, setOtpValues] = useState(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

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
      const res = await verifyOtp({ userId, otp });

      if (res.success) {
        toast.success('Xác minh OTP thành công!');
        onSuccess(); // Gọi callback parent
      } else {
        toast.error(res.message || 'Xác minh thất bại');
        resetOtpFields();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Xác minh thất bại');
      } else {
        toast.error('Lỗi không xác định');
      }
      resetOtpFields();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || isResending) return;

    setIsResending(true);
    try {
      const res = await resendOtp({ userId, type, phone });
      if (res.success) {
        toast.success('OTP mới đã được gửi');
        setResendTimer(15);
        resetOtpFields();
      } else {
        toast.error(res.message || 'Không thể gửi lại OTP');
      }
    } catch (err) {
      console.error("Resend OTP error", err);
      toast.error('Gửi lại OTP thất bại.');
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="relative w-[90%] max-w-md">
        <Card className="w-full rounded-4xl border border-gray-300 px-6 md:px-10 py-6 shadow-lg bg-white text-gray-800">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl">×</button>
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Xác thực OTP</h2>
            <p className="text-sm sm:text-base text-gray-500 mb-4">Nhập mã OTP 6 số được gửi đến bạn</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-2">
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el }}
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
    </div>
  );
};

export default VerifyUpdateOtp;
