"use client";

import { User, Menu } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  onMobileMenuToggle: () => void;
  isCollapsed: boolean;
}

export default function DashboardHeader({
  title,
  onMobileMenuToggle,
}: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 lg:py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
              {title}
            </h1>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <User className="w-4 h-4 lg:w-6 lg:h-6 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
