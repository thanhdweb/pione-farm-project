"use client";

import { useForm } from "react-hook-form";
import { ChangePasswordPayload, changePassword } from "@/lib/api/information-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordPayload>();


  const onSubmit = async (data: ChangePasswordPayload) => {
    try {
      const res = await changePassword(data);
      if (res.success) {
        toast.success("Đổi mật khẩu thành công!");
        reset();
      } else {
        toast.error(res.message || "Đã có lỗi xảy ra.");
      }
    } catch (err: unknown) {

      if (err instanceof AxiosError) {
        const message = err.response?.data?.message || "Lỗi từ máy chủ.";
        toast.error(message);
      } else {
        toast.error("Lỗi không xác định.");
      }
    }
  };

  return (
    <div className="max-w-xl p-4 grid grid-cols-1">
      <div className="bg-gray-300 rounded-tl-2xl rounded-tr-2xl py-6">
        <h2 className="text-center text-lg font-semibold text-gray-800">Đổi mật khẩu</h2>
      </div>
      <Card className="w-full p-6 space-y-4 shadow-md bg-white/50 border border-gray-200 text-gray-800 rounded-none rounded-br-2xl rounded-bl-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Mật khẩu hiện tại */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
            <input
              type="password"
              {...register("currentPassword", {
                required: "Vui lòng nhập mật khẩu hiện tại",
                minLength: { value: 6, message: "Tối thiểu 6 ký tự" },
              })}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-1 focus:ring-gray-800"
            />
            {errors.currentPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* Mật khẩu mới */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
            <input
              type="password"
              {...register("newPassword", {
                required: "Vui lòng nhập mật khẩu mới",
                minLength: { value: 6, message: "Tối thiểu 6 ký tự" },
              })}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-1 focus:ring-gray-800"
            />
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              {...register("confirmPassword", {
                       required: "Vui lòng xác nhận mật khẩu",
                validate: (value) =>
                       value === watch("newPassword") || "Mật khẩu xác nhận không khớp",
              })}
                      className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-1 focus:ring-gra ty-800"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit button */}
          <div className="flex justify-center items-center mt-6">
            <Button type="submit" className="font-semibold text-white bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md transition-colors duration-200" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : "Đổi mật khẩu"}
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}
