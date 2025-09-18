import React from "react";

export default function NotificationSettings() {
  const notifications = [
    {
      label: "New Bookings",
      description: "Get notified when you receive new rental requests",
    },
    {
      label: "Booking Updates",
      description: "Updates on existing bookings and cancellations",
    },
    {
      label: "Payment Confirmations",
      description: "Receive confirmation when payments are processed",
    },
    {
      label: "Monthly Reports",
      description: "Monthly summary of your rental business",
    },
    {
      label: "Marketing Updates",
      description: "Product updates and promotional offers",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          {notifications.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg space-y-2 sm:space-y-0"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-black bg-white border border-gray-300 rounded cursor-pointer transition-all duration-200 ease-in-out focus:ring-1 focus:ring-black focus:ring-offset-1 hover:border-gray-400 checked:bg-black checked:border-black checked:text-white accent-black"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
        <button className="flex items-center space-x-2 px-4 md:px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="text-sm md:text-base">Save Changes</span>
        </button>
      </div>
    </div>
  );
}
