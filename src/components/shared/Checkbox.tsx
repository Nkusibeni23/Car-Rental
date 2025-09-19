import React from "react";
import clsx from "clsx";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function Checkbox({
  label,
  checked,
  onChange,
  className,
}: CheckboxProps) {
  return (
    <div className={clsx("flex items-center space-x-3", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 text-black bg-white border border-gray-300 rounded cursor-pointer transition-all duration-200 ease-in-out focus:ring-1 focus:ring-black focus:ring-offset-1 hover:border-gray-400 checked:bg-black checked:border-black checked:text-white accent-black"
      />
      <label className="text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
}
