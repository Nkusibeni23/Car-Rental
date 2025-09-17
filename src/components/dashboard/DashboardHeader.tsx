"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { User as UserType } from "@/types/auth";

interface DashboardHeaderProps {
  title: string;
  user: UserType | null;
}

export default function DashboardHeader({ title, user }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user?.fName} {user?.lName}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {user?.picture ? (
              <Image
                src={user.picture}
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-gray-600" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
