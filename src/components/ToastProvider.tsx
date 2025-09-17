"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Toast, { ToastType, ToastProps } from "./Toast";

interface ToastItem extends Omit<ToastProps, "show" | "onClose"> {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  priority?: "low" | "normal" | "high" | "urgent";
  persistent?: boolean;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  pauseAllToasts: () => void;
  resumeAllToasts: () => void;
  success: (title: string, message?: string, options?: ToastOptions) => void;
  error: (title: string, message?: string, options?: ToastOptions) => void;
  warning: (title: string, message?: string, options?: ToastOptions) => void;
  info: (title: string, message?: string, options?: ToastOptions) => void;
  toastCount: number;
}

interface ToastOptions {
  duration?: number;
  priority?: "low" | "normal" | "high" | "urgent";
  persistent?: boolean;
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
  stackDirection?: "vertical" | "horizontal";
  globalPause?: boolean;
}

export function ToastProvider({
  children,
  maxToasts = 6,
  position = "top-right",
  stackDirection = "vertical",
  globalPause = false,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isPaused, setIsPaused] = useState(globalPause);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateId = useCallback(() => {
    return `toast_${Math.random()
      .toString(36)
      .substring(2)}_${Date.now().toString(36)}`;
  }, []);

  // Priority sorting function
  const sortToastsByPriority = useCallback((toastList: ToastItem[]) => {
    const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
    return toastList.sort((a, b) => {
      const aPriority = priorityOrder[a.priority || "normal"];
      const bPriority = priorityOrder[b.priority || "normal"];
      return aPriority - bPriority;
    });
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastItem, "id">) => {
      // Check for duplicate toasts (same title and message)
      const isDuplicate = toasts.some(
        (existingToast) =>
          existingToast.title === toast.title &&
          existingToast.message === toast.message &&
          existingToast.type === toast.type
      );

      if (isDuplicate) {
        return; // Don't add duplicate toast
      }

      const id = generateId();
      const newToast: ToastItem = {
        ...toast,
        id,
        duration: toast.duration ?? 5000,
        priority: toast.priority ?? "normal",
        persistent: toast.persistent ?? false,
      };

      setToasts((prev) => {
        // If urgent priority, remove one low priority toast if at limit
        if (newToast.priority === "urgent" && prev.length >= maxToasts) {
          const nonUrgentIndex = prev.findIndex((t) => t.priority !== "urgent");
          if (nonUrgentIndex >= 0) {
            prev.splice(nonUrgentIndex, 1);
          }
        }

        const updatedToasts = [newToast, ...prev];
        const limitedToasts = updatedToasts.slice(0, maxToasts);
        return sortToastsByPriority(limitedToasts);
      });
    },
    [generateId, maxToasts, sortToastsByPriority, toasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const pauseAllToasts = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeAllToasts = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Enhanced convenience methods with options
  const success = useCallback(
    (title: string, message?: string, options?: ToastOptions) => {
      addToast({
        type: "success",
        title,
        message,
        duration: options?.duration,
        priority: options?.priority,
        persistent: options?.persistent,
      });
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, message?: string, options?: ToastOptions) => {
      addToast({
        type: "error",
        title,
        message,
        duration: options?.duration ?? 6000, // Reduced from 8000 to 6000
        priority: options?.priority ?? "high",
        persistent: options?.persistent,
      });
    },
    [addToast]
  );

  const warning = useCallback(
    (title: string, message?: string, options?: ToastOptions) => {
      addToast({
        type: "warning",
        title,
        message,
        duration: options?.duration ?? 6000,
        priority: options?.priority,
        persistent: options?.persistent,
      });
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, message?: string, options?: ToastOptions) => {
      addToast({
        type: "info",
        title,
        message,
        duration: options?.duration,
        priority: options?.priority,
        persistent: options?.persistent,
      });
    },
    [addToast]
  );

  const getPositionClasses = () => {
    const baseClasses = "fixed pointer-events-none z-50";
    const stackClasses =
      stackDirection === "vertical"
        ? "flex flex-col space-y-4"
        : "flex flex-row space-x-4";

    switch (position) {
      case "top-right":
        return `${baseClasses} top-0 right-0 pt-6 pr-6 ${stackClasses}`;
      case "top-left":
        return `${baseClasses} top-0 left-0 pt-6 pl-6 ${stackClasses}`;
      case "bottom-right":
        return `${baseClasses} bottom-0 right-0 pb-6 pr-6 ${stackClasses} flex-col-reverse`;
      case "bottom-left":
        return `${baseClasses} bottom-0 left-0 pb-6 pl-6 ${stackClasses} flex-col-reverse`;
      case "top-center":
        return `${baseClasses} top-0 left-1/2 transform -translate-x-1/2 pt-6 ${stackClasses}`;
      case "bottom-center":
        return `${baseClasses} bottom-0 left-1/2 transform -translate-x-1/2 pb-6 ${stackClasses} flex-col-reverse`;
      default:
        return `${baseClasses} top-0 right-0 pt-6 pr-6 ${stackClasses}`;
    }
  };

  // Container hover handlers for pause functionality
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const contextValue: ToastContextType = useMemo(
    () => ({
      addToast,
      removeToast,
      clearAllToasts,
      pauseAllToasts,
      resumeAllToasts,
      success,
      error,
      warning,
      info,
      toastCount: toasts.length,
    }),
    [
      addToast,
      removeToast,
      clearAllToasts,
      pauseAllToasts,
      resumeAllToasts,
      success,
      error,
      warning,
      info,
      toasts.length,
    ]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Modern Toast Container */}
      <div
        ref={containerRef}
        aria-live="assertive"
        aria-label="Toast notifications"
        className={getPositionClasses()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          // Add subtle backdrop filter for the container area
          backdropFilter: toasts.length > 0 ? "blur(1px)" : "none",
          transition: "backdrop-filter 0.3s ease",
        }}
      >
        {/* Toast Counter Badge (when multiple toasts) */}
        {toasts.length > 1 && (
          <div className="absolute -top-2 -right-2 z-60 pointer-events-auto">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
              {toasts.length}
            </div>
          </div>
        )}

        {/* Render toasts with enhanced stacking */}
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="relative"
            style={{
              zIndex: 50 - index, // Stack toasts properly
              // Add slight delay for staggered animations
              animationDelay: `${index * 100}ms`,
            }}
          >
            <Toast
              {...toast}
              show={true}
              onClose={removeToast}
              // Don't pause duration on hover for error toasts to ensure they close
              duration={
                toast.type === "error"
                  ? toast.duration
                  : isPaused || isHovering
                  ? 0
                  : toast.duration
              }
            />
          </div>
        ))}

        {/* Clear All Button (when multiple toasts) */}
        {toasts.length > 2 && (
          <div className="flex justify-center mt-2 pointer-events-auto">
            <button
              onClick={clearAllToasts}
              className="bg-black/20 backdrop-blur-lg text-white/80 hover:text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/10 hover:border-white/20 transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Clear All ({toasts.length})
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
