"use client";

import { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  show: boolean;
  onClose: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    iconColor: "text-green-400",
    bgColor: "bg-white",
    borderColor: "border-green-200",
    titleColor: "text-green-800",
    messageColor: "text-green-600",
  },
  error: {
    icon: XCircle,
    iconColor: "text-red-400",
    bgColor: "bg-white",
    borderColor: "border-red-200",
    titleColor: "text-red-800",
    messageColor: "text-red-600",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-yellow-400",
    bgColor: "bg-white",
    borderColor: "border-yellow-200",
    titleColor: "text-yellow-800",
    messageColor: "text-yellow-600",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-400",
    bgColor: "bg-white",
    borderColor: "border-blue-200",
    titleColor: "text-blue-800",
    messageColor: "text-blue-600",
  },
};

export default function Toast({
  id,
  type,
  title,
  message,
  duration = 5000,
  show,
  onClose,
}: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, id, onClose]);

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`
        max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5
        ${config.bgColor} ${config.borderColor} border
      `}
      >
        <div className="p-4">
          <div className="flex items-start">
            {/* Icon */}
            <div className="flex-shrink-0">
              <Icon
                className={`h-6 w-6 ${config.iconColor}`}
                aria-hidden="true"
              />
            </div>

            {/* Content */}
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className={`text-sm font-medium ${config.titleColor}`}>
                {title}
              </p>
              {message && (
                <p className={`mt-1 text-sm ${config.messageColor}`}>
                  {message}
                </p>
              )}
            </div>

            {/* Close button */}
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className={`
                  inline-flex rounded-md text-gray-400 hover:text-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                `}
                onClick={() => onClose(id)}
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar for duration */}
        {duration > 0 && show && (
          <div className="relative overflow-hidden">
            <div className={`h-1 bg-gray-200`}>
              <div
                className={`h-full transition-all ease-linear ${
                  type === "success"
                    ? "bg-green-400"
                    : type === "error"
                    ? "bg-red-400"
                    : type === "warning"
                    ? "bg-yellow-400"
                    : "bg-blue-400"
                }`}
                style={{
                  animation: `toast-progress ${duration}ms linear`,
                  transformOrigin: "left",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Transition>
  );
}
