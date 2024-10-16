"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmResetPassword } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import {
  TResetPasswordFormData,
  resetPasswordSchema,
} from "@/validators/auth.validator";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TResetPasswordFormData) => {
    try {
      await confirmResetPassword({
        username: data.email,
        newPassword: data.newPassword,
        confirmationCode: data.confirmationCode,
      });
      setMessage("Password has been reset successfully.");
      router.push("/auth/login");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input type="text" {...register("email")} className="text-black" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label>Confirmation Code</label>
          <input
            type="text"
            {...register("confirmationCode")}
            className="text-black"
          />
          {errors.confirmationCode && <p>{errors.confirmationCode.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label>New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            className="text-black"
          />
          {errors.newPassword && <p>{errors.newPassword.message}</p>}
        </div>
        <button disabled={isSubmitting} type="submit">
          Reset Password
        </button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
