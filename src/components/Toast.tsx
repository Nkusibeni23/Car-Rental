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
  show: boolean;
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

  const handleClose = () => {
    onClose(id);
  };

  // Don't render if not showing
  if (!show) return null;

  return (
    <div
      className={`max-w-md w-full min-w-[380px] pointer-events-auto relative hover:scale-105 transition-all duration-300 ease-out`}
    >
      <div
        className={`relative overflow-hidden rounded-xl ${config.bgColor} ${config.borderColor} border-l-4 transition-all duration-300`}
      >
        <div
          className={`absolute top-0 left-0 w-1 h-full ${config.accentColor}`}
        />

        <div className="relative px-4 py-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Icon
                className={`h-6 w-6 ${config.iconColor}`}
                aria-hidden="true"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3
                className={`${config.titleColor} font-semibold text-sm leading-tight`}
              >
                {title}
              </h3>
              {message && (
                <p
                  className={`mt-1 ${config.messageColor} text-sm leading-relaxed`}
                >
                  {message}
                </p>
              )}
            </div>

            <button
              type="button"
              className="flex-shrink-0 p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {duration > 0 && show && (
          <div className="h-1 bg-gray-200">
            <div
              className={`h-full ${config.progressColor} progress-animate`}
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
