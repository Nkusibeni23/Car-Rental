import React from "react";
import { Car } from "@/types/car";
import { Users, Briefcase, Clock, Settings, Info, User } from "lucide-react";

interface HorizontalCarCardProps {
  car: Car;
  isTopPick?: boolean;
  hostName?: string;
  reviewCount?: number;
  reviewRating?: number;
}

export default function HorizontalCarCard({ 
  car, 
  isTopPick = false, 
  hostName = "Benny Crispin",
  reviewCount = 111,
  reviewRating = 9.3
}: HorizontalCarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 relative transform hover:-translate-y-1 overflow-hidden">
      {/* Top Pick Badge */}
      {isTopPick && (
        <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium z-10 rounded">
          Top Pick
        </div>
      )}

      {/* First Row: Image | Car Details | Price & Button */}
      <div className="flex">
        {/* Car Image */}
        <div className="w-72 h-48 flex-shrink-0">
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
            }}
          />
        </div>

        {/* Car Details */}
        <div className="flex-1 p-6">
          <div className="flex justify-between h-full">
            {/* Left Side - Car Info */}
            <div className="flex-1">
              {/* Car Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {car.make} {car.model} {car.year}
              </h3>
              <p className="text-sm text-gray-500 mb-4">or similar SUV</p>

              {/* Car Features */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{car.seats} Seats</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>1 Large bag</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{car.mileage} km per rental</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>2 Small bag</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Automatic</span>
                </div>
              </div>
            </div>

            {/* Right Side - Price and Action */}
            <div className="w-48 flex flex-col justify-between items-end">
              <div className="text-right">
                <p className="text-sm text-gray-500">Price Per day</p>
                <p className="text-2xl font-bold text-gray-900">{car.pricePerDay.toLocaleString()} RWF</p>
                <p className="text-sm text-gray-500">Free cancellation</p>
              </div>
              <button className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                View Deal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Host | Rating | Important Info */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Host Info */}
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center mr-2">
              <User className="w-3 h-3 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{hostName}</p>
              <p className="text-xs text-gray-500">Host</p>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center">
            <div className="bg-black text-white px-2 py-1 rounded text-sm font-medium mr-3">
              <span className="text-lg font-bold">{reviewRating.toFixed(1)}</span> OK
            </div>
            <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
          </div>
          
          {/* Important Info */}
          <div className="flex items-center text-gray-500">
            <Info className="w-4 h-4 mr-1" />
            <span className="text-sm">Important Info</span>
          </div>
        </div>
      </div>
    </div>
  );
}
