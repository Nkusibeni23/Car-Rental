import React from "react";
import clsx from "clsx";

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  required = false,
  className,
}: TextareaProps) {
  return (
    <div className={clsx("space-y-2", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none",
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
