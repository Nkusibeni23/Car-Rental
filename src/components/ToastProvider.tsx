"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import Toast, { ToastType, ToastProps } from "./Toast";

interface ToastItem extends Omit<ToastProps, "show" | "onClose"> {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  success: (title: string, message?: string, duration?: number) => void;
  error: (title: string, message?: string, duration?: number) => void;
  warning: (title: string, message?: string, duration?: number) => void;
  info: (title: string, message?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

export function ToastProvider({
  children,
  maxToasts = 5,
  position = "top-right",
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const generateId = useCallback(() => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastItem, "id">) => {
      const id = generateId();
      const newToast: ToastItem = {
        ...toast,
        id,
        duration: toast.duration ?? 5000,
      };

      setToasts((prev) => {
        const updatedToasts = [newToast, ...prev];
        // Limit the number of toasts
        return updatedToasts.slice(0, maxToasts);
      });
    },
    [generateId, maxToasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback(
    (title: string, message?: string, duration?: number) => {
      addToast({ type: "success", title, message, duration });
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) => {
      addToast({ type: "error", title, message, duration });
    },
    [addToast]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number) => {
      addToast({ type: "warning", title, message, duration });
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) => {
      addToast({ type: "info", title, message, duration });
    },
    [addToast]
  );

  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "top-0 right-0 pt-6 pr-6";
      case "top-left":
        return "top-0 left-0 pt-6 pl-6";
      case "bottom-right":
        return "bottom-0 right-0 pb-6 pr-6";
      case "bottom-left":
        return "bottom-0 left-0 pb-6 pl-6";
      case "top-center":
        return "top-0 left-1/2 transform -translate-x-1/2 pt-6";
      case "bottom-center":
        return "bottom-0 left-1/2 transform -translate-x-1/2 pb-6";
      default:
        return "top-0 right-0 pt-6 pr-6";
    }
  };

  const contextValue: ToastContextType = useMemo(
    () => ({
      addToast,
      removeToast,
      clearAllToasts,
      success,
      error,
      warning,
      info,
    }),
    [addToast, removeToast, clearAllToasts, success, error, warning, info]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Toast Container */}
      <div
        aria-live="assertive"
        className={`fixed ${getPositionClasses()} pointer-events-none z-50 flex flex-col space-y-4`}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} show={true} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
