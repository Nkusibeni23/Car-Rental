"use client";

import { useToast } from "@/components/ToastProvider";

export default function ToastDemo() {
  const toast = useToast();

  const showSuccessToast = () => {
    toast.success("Success!", "This is a success message with great news!");
  };

  const showErrorToast = () => {
    toast.error("Error Occurred", "Something went wrong. Please try again.");
  };

  const showWarningToast = () => {
    toast.warning(
      "Warning",
      "This action cannot be undone. Please be careful."
    );
  };

  const showInfoToast = () => {
    toast.info("Information", "Here's some helpful information for you.");
  };

  const showLongDurationToast = () => {
    toast.success(
      "Long Duration",
      "This toast will stay for 10 seconds.",
      10000
    );
  };

  const showShortDurationToast = () => {
    toast.info(
      "Quick Message",
      "This toast will disappear in 2 seconds.",
      2000
    );
  };

  const showPersistentToast = () => {
    toast.warning(
      "Persistent Toast",
      "This toast will stay until manually closed.",
      0
    );
  };

  const clearAllToasts = () => {
    toast.clearAllToasts();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Toast Component Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A beautiful and accessible toast notification system built with
            Headless UI, featuring smooth animations, multiple types, and
            excellent user experience.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Toast Types
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={showSuccessToast}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Show Success Toast
            </button>

            <button
              onClick={showErrorToast}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Show Error Toast
            </button>

            <button
              onClick={showWarningToast}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Show Warning Toast
            </button>

            <button
              onClick={showInfoToast}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Show Info Toast
            </button>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Duration Options
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={showShortDurationToast}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Short (2s)
            </button>

            <button
              onClick={showLongDurationToast}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Long (10s)
            </button>

            <button
              onClick={showPersistentToast}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Persistent
            </button>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Actions</h3>

          <button
            onClick={clearAllToasts}
            className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Clear All Toasts
          </button>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ✨ Smooth Animations
              </h3>
              <p className="text-gray-600">
                Beautiful slide-in animations powered by Headless UI Transition
                components.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ♿ Accessible
              </h3>
              <p className="text-gray-600">
                Built with accessibility in mind, including proper ARIA labels
                and screen reader support.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🎨 Customizable
              </h3>
              <p className="text-gray-600">
                Multiple toast types, positioning options, and duration
                settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📱 Responsive
              </h3>
              <p className="text-gray-600">
                Works beautifully on desktop and mobile devices with responsive
                positioning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
