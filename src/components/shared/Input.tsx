import React from "react";
import clsx from "clsx";

interface InputProps {
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className,
}: InputProps) {
  return (
    <div className={clsx("space-y-2", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors",
          error
            ? "border-red-300 focus:ring-red-500"
            : "border-gray-300 hover:border-gray-400"
        )}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
