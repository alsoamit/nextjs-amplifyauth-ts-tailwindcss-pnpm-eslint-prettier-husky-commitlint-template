"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signInWithRedirect } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TLoginFormData, loginSchema } from "@/validators/auth.validator";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TLoginFormData) => {
    try {
      const res = await signIn({
        username: data.email,
        password: data.password,
      });
      console.log({ res });
      router.push("/");
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
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className="text-black"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button disabled={isSubmitting} className=".c-btn" type="submit">
          Login
        </button>
        <div className="flex">
          <button
            type="button"
            onClick={() => signInWithRedirect({ provider: "Google" })}
          >
            Google
          </button>
        </div>
        {error && <p>{error}</p>}
        <div className="flex justify-between mt-4 flex-col gap-2 text-blue-300">
          <Link href="/auth/forgot-password">Forgot Password?</Link>
          <Link href="/auth/signup">Create Account</Link>
        </div>
      </form>
    </div>
  );
}
