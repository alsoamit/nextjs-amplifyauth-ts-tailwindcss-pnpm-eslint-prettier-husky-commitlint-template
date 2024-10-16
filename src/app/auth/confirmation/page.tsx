"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmSignUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import {
  TConfirmSignUpFormData,
  confirmSignUpSchema,
} from "@/validators/auth.validator";

export default function ConfirmSignUp() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TConfirmSignUpFormData>({
    resolver: zodResolver(confirmSignUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TConfirmSignUpFormData) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: data.username,
        confirmationCode: data.confirmationCode,
      });
      if (isSignUpComplete) {
        setMessage("Sign up confirmed! You can now log in.");
        router.push("/auth/login");
      } else {
        setMessage(`Next step: ${nextStep}`);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label>Username</label>
          <input type="text" {...register("username")} className="text-black" />
          {errors.username && <p>{errors.username.message}</p>}
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
        <button disabled={isSubmitting} className=".c-btn" type="submit">
          Confirm Sign Up
        </button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
