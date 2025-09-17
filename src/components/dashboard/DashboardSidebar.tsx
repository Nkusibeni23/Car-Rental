"use client";

import {
  LayoutDashboard,
  Car,
  Calendar,
  History,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function DashboardSidebar({
  activeTab,
  onTabChange,
  onLogout,
}: SidebarProps) {
  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      key: "dashboard",
    },
    {
      icon: Car,
      label: "Listing",
      key: "listing",
    },
    {
      icon: Calendar,
      label: "Booking",
      key: "booking",
    },
    {
      icon: History,
      label: "Rental History",
      key: "history",
    },
    {
      icon: Settings,
      label: "Settings",
      key: "settings",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Car Rental Hub</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onTabChange(item.key)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${
              activeTab === item.key
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
