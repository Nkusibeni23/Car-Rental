"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import authService from "@/services/auth.service";
import { useToast } from "@/components/ToastProvider";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { success, error } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordForm>();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || "Please enter a valid email address";
  };

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      await authService.requestPasswordResetOTP(data.email);
      setIsEmailSent(true);
      success("OTP sent to your email address");
    } catch (err) {
      const errorMessage =
        (err as Error)?.message || "Failed to send OTP. Please try again.";
      error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    const email = getValues("email");
    if (!email) return;

    setIsLoading(true);
    try {
      await authService.requestPasswordResetOTP(email);
      success("OTP sent again to your email");
    } catch (err) {
      const errorMessage =
        (err as Error)?.message || "Failed to resend OTP. Please try again.";
      error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;ve sent password reset instructions to{" "}
              <span className="font-medium text-gray-900">
                {getValues("email")}
              </span>
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow-lg rounded-lg space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                We&apos;ve sent a 6-digit OTP code to your email. Use this code
                to reset your password.
              </p>

              <div className="space-y-3">
                <Link
                  href="/auth/reset-password"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors cursor-pointer"
                >
                  Enter OTP & Reset Password
                </Link>

                <button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? "Sending..." : "Resend OTP"}
                </button>

                <Link
                  href="/auth/signin"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we&apos;ll send you instructions to
            reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      validate: validateEmail,
                    })}
                    type="email"
                    autoComplete="email"
                    className="appearance-none block w-full p-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-gray-700 focus:border-gray-800 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? "Sending..." : "Send reset instructions"}
                </button>

                <Link
                  href="/auth/signin"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
