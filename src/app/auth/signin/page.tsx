"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";

interface SignInForm {
  email: string;
  password: string;
}

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>();

  const onSubmit = async (data: SignInForm) => {
    try {
      dispatch(loginStart());
      setError("");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple dummy validation
      if (data.email === "user@example.com" && data.password === "password") {
        const user = {
          id: "1",
          email: data.email,
          name: "John Doe",
        };

        dispatch(loginSuccess(user));
        router.push("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch {
      dispatch(loginFailure());
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Demo credentials: user@example.com / password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-black hover:text-gray-800"
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
