"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// Mock booking data
const mockBookings = [
  {
    id: 1,
    customer: "Benny Chrispin",
    mobileNumber: "(250) 780-003842",
    email: "ndizibaidu23@gmail.com",
    location: "Remera, Kigali",
    vehicle: "Toyota Corolla 2018",
    pickupTime: "Apr 12, 2024, 10:30",
    pickupLocation: "Kacyiru, KK ST 23",
    returnTime: "Apr 17, 2024, 21:30",
    returnLocation: "Kacyiru, KK ST 23",
    startDate: "2024-04-09",
    endDate: "2024-04-12",
    color: "bg-blue-400"
  },
  {
    id: 2,
    customer: "Benny Chrispin",
    mobileNumber: "(250) 780-003842",
    email: "ndizibaidu23@gmail.com",
    location: "Remera, Kigali",
    vehicle: "Honda Civic 2019",
    pickupTime: "Apr 10, 2024, 09:00",
    pickupLocation: "Kimisagara, KG 123",
    returnTime: "Apr 13, 2024, 18:00",
    returnLocation: "Kimisagara, KG 123",
    startDate: "2024-04-10",
    endDate: "2024-04-13",
    color: "bg-yellow-400"
  },
  {
    id: 3,
    customer: "Benny Chrispin",
    mobileNumber: "(250) 780-003842",
    email: "ndizibaidu23@gmail.com",
    location: "Remera, Kigali",
    vehicle: "BMW X5 2020",
    pickupTime: "Apr 10, 2024, 14:00",
    pickupLocation: "Nyamirambo, NY 456",
    returnTime: "Apr 11, 2024, 12:00",
    returnLocation: "Nyamirambo, NY 456",
    startDate: "2024-04-10",
    endDate: "2024-04-11",
    color: "bg-green-400"
  },
  {
    id: 4,
    customer: "Benny Chrispin",
    mobileNumber: "(250) 780-003842",
    email: "ndizibaidu23@gmail.com",
    location: "Remera, Kigali",
    vehicle: "Mercedes C-Class 2021",
    pickupTime: "Apr 13, 2024, 08:00",
    pickupLocation: "Gikondo, GK 789",
    returnTime: "Apr 15, 2024, 20:00",
    returnLocation: "Gikondo, GK 789",
    startDate: "2024-04-13",
    endDate: "2024-04-15",
    color: "bg-red-400"
  }
];

export default function BookingContent() {
  const [selectedBooking, setSelectedBooking] = useState(mockBookings[0]);
  const [currentWeek, setCurrentWeek] = useState(new Date("2024-04-09"));

  // Generate week dates
  const getWeekDates = (startDate: Date) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'long' 
    });
  };

  // Format date range
  const formatDateRange = () => {
    const start = weekDates[0];
    const end = weekDates[6];
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  // Navigate weeks
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  // Calculate booking position and width
  const getBookingStyle = (booking: any) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    
    const startIndex = weekDates.findIndex(date => 
      date.toDateString() === startDate.toDateString()
    );
    const endIndex = weekDates.findIndex(date => 
      date.toDateString() === endDate.toDateString()
    );

    if (startIndex === -1 || endIndex === -1) return { display: 'none' };

    const left = (startIndex / 7) * 100;
    const width = ((endIndex - startIndex + 1) / 7) * 100;

    return {
      left: `${left}%`,
      width: `${width}%`,
      display: 'block'
    };
  };

  return (
    <div className="flex-1 p-4 lg:p-8 h-full overflow-auto bg-gray-50">
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Date Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-lg font-semibold text-gray-900">
                  {formatDateRange()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateWeek('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  onClick={() => navigateWeek('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="relative">
              {/* Column Headers */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {weekDates.map((date, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(date)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Bars */}
              <div className="relative h-32 bg-gray-50 rounded-lg border border-gray-200">
                {mockBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`absolute top-2 h-8 ${booking.color} rounded-md cursor-pointer hover:opacity-80 transition-opacity flex items-center px-2 text-white text-sm font-medium`}
                    style={getBookingStyle(booking)}
                    onClick={() => setSelectedBooking(booking)}
                  >
                    {booking.customer}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Details Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
              {/* User Profile */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {selectedBooking.customer.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {selectedBooking.customer}
                </h3>
                <p className="text-sm text-gray-500">Booker</p>
              </div>

              {/* Booking Details */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Mobile Number</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedBooking.mobileNumber}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedBooking.email}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Location</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedBooking.location}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Booked Vehicle</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedBooking.vehicle}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Pick-up Time</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedBooking.pickupTime}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Pick-up Location</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedBooking.pickupLocation}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Return Time</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedBooking.returnTime}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Return Location</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedBooking.returnLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
