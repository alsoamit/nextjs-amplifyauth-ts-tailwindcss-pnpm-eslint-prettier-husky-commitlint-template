import { z } from "zod";

export const confirmSignUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  confirmationCode: z.string().min(1, "Confirmation Code is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  confirmationCode: z.string().min(1, "Confirmation code is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type TConfirmSignUpFormData = z.infer<typeof confirmSignUpSchema>;
export type TForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type TLoginFormData = z.infer<typeof loginSchema>;
export type TResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type TSignUpFormData = z.infer<typeof signUpSchema>;
