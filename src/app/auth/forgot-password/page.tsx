"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import {
  TForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/validators/auth.validator";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TForgotPasswordFormData) => {
    try {
      await resetPassword({
        username: data.email,
      });
      setMessage("A confirmation code has been sent to your email.");
      router.push("/auth/reset-password");
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
        <button disabled={isSubmitting} type="submit" className=".c-btn">
          Submit
        </button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
