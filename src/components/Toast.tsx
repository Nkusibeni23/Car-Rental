"use client";

import { useEffect } from "react";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-800",
    messageColor: "text-green-700",
    progressColor: "bg-green-500",
    accentColor: "bg-green-500",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
    titleColor: "text-red-800",
    messageColor: "text-red-700",
    progressColor: "bg-red-500",
    accentColor: "bg-red-500",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-800",
    messageColor: "text-yellow-700",
    progressColor: "bg-yellow-500",
    accentColor: "bg-yellow-500",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-800",
    messageColor: "text-blue-700",
    progressColor: "bg-blue-500",
    accentColor: "bg-blue-500",
  },
};

export default function Toast({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const handleClose = () => {
    onClose(id);
  };

  return (
    <div className="max-w-xl w-full min-w-[420px] pointer-events-auto">
      <div
        className={`relative rounded-lg ${config.bgColor} ${config.borderColor} border-l-4 shadow-sm`}
      >
        <div className="px-5 py-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-5 w-5 ${config.iconColor}`} />
            </div>
            <div className="ml-3 w-0 flex-1 pr-2">
              <p className={`text-sm font-medium ${config.titleColor}`}>
                {title}
              </p>
              {message && (
                <p
                  className={`mt-1 text-sm ${config.messageColor} leading-relaxed`}
                >
                  {message}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                type="button"
                className="rounded-md p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {duration > 0 && (
          <div className="h-1 bg-gray-200">
            <div
              className={`h-full ${config.progressColor}`}
              style={{
                animation: `toast-progress ${duration}ms linear forwards`,
                transformOrigin: "left",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
