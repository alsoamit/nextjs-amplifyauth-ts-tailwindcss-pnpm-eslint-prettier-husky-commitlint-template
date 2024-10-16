"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TSignUpFormData, signUpSchema } from "@/validators/auth.validator";

export default function SignUp() {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TSignUpFormData) => {
    try {
      await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
          },
        },
      });
      router.push("/auth/confirmation");
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
          <input type="email" {...register("email")} className="text-black" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className="text-black"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button disabled={isSubmitting} className=".c-btn" type="submit">
          Sign Up
        </button>
        {error && <p>{error}</p>}
        <div className="flex justify-between mt-4 flex-col gap-2 text-blue-300">
          <Link href="/auth/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
