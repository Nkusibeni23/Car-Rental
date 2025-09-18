"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import ListingContent from "@/components/dashboard/ListingContent";
import BookingContent from "@/components/dashboard/BookingContent";
import RentalHistoryContent from "@/components/dashboard/RentalHistoryContent";
import SettingsContent from "@/components/dashboard/SettingsContent";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = "/";
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard";
      case "listing":
        return "Car Listing";
      case "booking":
        return "Bookings";
      case "history":
        return "Rental History";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "listing":
        return <ListingContent />;
      case "booking":
        return <BookingContent />;
      case "history":
        return <RentalHistoryContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <div className="flex h-full">
        <DashboardSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        <div
          className={`
          flex-1 
          flex 
          flex-col 
          h-full 
          transition-all 
          duration-300 
          ease-in-out
          ${isSidebarCollapsed ? "lg:ml-0" : "lg:ml-0"}
        `}
        >
          <DashboardHeader
            title={getPageTitle()}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isCollapsed={isSidebarCollapsed}
          />
          <div className="flex-1 overflow-hidden">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
