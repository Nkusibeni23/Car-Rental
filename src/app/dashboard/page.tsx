"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logoutUser } from "@/store/authSlice";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import ListingContent from "@/components/dashboard/ListingContent";
import BookingContent from "@/components/dashboard/BookingContent";
import RentalHistoryContent from "@/components/dashboard/RentalHistoryContent";
import SettingsContent from "@/components/dashboard/SettingsContent";

export default function DashboardPage() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

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
        />
        <div className="flex-1 flex flex-col h-full">
          <DashboardHeader title={getPageTitle()} user={user} />
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
