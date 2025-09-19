import React from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  required = false,
  className,
}: SelectProps) {
  return (
    <div className={clsx("space-y-2", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(
            "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors appearance-none cursor-pointer",
            error
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300 hover:border-gray-400"
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
