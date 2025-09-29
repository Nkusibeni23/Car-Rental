"use client";

import React from "react";
import { MapPin, Calendar, Clock, Search } from "lucide-react";
import CarCard from "@/components/CarCard";
import { Car } from "@/types/car";

export default function Home() {

  // Sample car data with diverse, high-quality images
  const cars: Car[] = [
    {
      id: "1",
      make: "Mercedes-Benz",
      model: "GLC",
      year: 2023,
      seats: 5,
      pricePerDay: 85000,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      features: ["GPS", "Bluetooth", "Air Conditioning", "Premium Interior", "Panoramic Sunroof"],
      location: "Kigali",
      mileage: 8000,
      rating: 4.9
    },
    {
      id: "2",
      make: "Mercedes-Benz",
      model: "GLC",
      year: 2023,
      seats: 5,
      pricePerDay: 85000,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      features: ["GPS", "Bluetooth", "Air Conditioning", "Premium Interior", "Panoramic Sunroof"],
      location: "Kigali",
      mileage: 8000,
      rating: 4.9
    },
    {
      id: "3",
      make: "Mercedes-Benz",
      model: "GLC",
      year: 2023,
      seats: 5,
      pricePerDay: 85000,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      features: ["GPS", "Bluetooth", "Air Conditioning", "Premium Interior", "Panoramic Sunroof"],
      location: "Kigali",
      mileage: 8000,
      rating: 4.9
    },
    {
      id: "4",
      make: "BMW",
      model: "X3",
      year: 2022,
      seats: 5,
      pricePerDay: 75000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      features: ["GPS", "Bluetooth", "Air Conditioning", "Leather Seats", "Premium Sound"],
      location: "Kigali",
      mileage: 12000,
      rating: 4.9
    },
    {
      id: "5",
      make: "BMW",
      model: "X3",
      year: 2022,
      seats: 5,
      pricePerDay: 75000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      features: ["GPS", "Bluetooth", "Air Conditioning", "Leather Seats", "Premium Sound"],
      location: "Kigali",
      mileage: 12000,
      rating: 4.9
    },
    {
      id: "6",
      make: "BMW",
      model: "X3",
      year: 2022,
      seats: 5,
      pricePerDay: 75000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      features: ["GPS", "Bluetooth", "Air Conditioning", "Leather Seats", "Premium Sound"],
      location: "Kigali",
      mileage: 12000,
      rating: 4.9
    },
    {
      id: "7",
      make: "BMW",
      model: "X3",
      year: 2022,
      seats: 5,
      pricePerDay: 75000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      features: ["GPS", "Bluetooth", "Air Conditioning", "Leather Seats", "Premium Sound"],
      location: "Kigali",
      mileage: 12000,
      rating: 4.9
    },
    {
      id: "8",
      make: "Mercedes-Benz",
      model: "GLC",
      year: 2023,
      seats: 5,
      pricePerDay: 85000,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      features: ["GPS", "Bluetooth", "Air Conditioning", "Premium Interior", "Panoramic Sunroof"],
      location: "Kigali",
      mileage: 8000,
      rating: 4.9
    },
    {
      id: "9",
      make: "Volkswagen",
      model: "Tiguan",
      year: 2021,
      seats: 5,
      pricePerDay: 50000,
      image: "https://images.unsplash.com/photo-15493999019-8ccdd3c5770f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      features: ["GPS", "Bluetooth", "Air Conditioning", "All-Wheel Drive", "Roof Rails"],
      location: "Kigali",
      mileage: 20000,
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="relative h-[70vh]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
        >
          {/* Secondary Car Image Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Car & Driver Rental - Search, Compare & Save
              </h1>

              {/* Features List */}
              <div className="space-y-3 mb-12">
                <div className="flex items-center text-white">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-lg">Free Cancellation</span>
                </div>
                <div className="flex items-center text-white">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-lg">10,000 + Car Rentals</span>
                </div>
                <div className="flex items-center text-white">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-lg">Customer support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="absolute bottom-4 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                {/* Pick-up Location */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pick-up Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value="Kigali, Kigali, Rwanda"
                      readOnly
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50"
                    />
                  </div>
                </div>

                {/* Pick-up Date */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pick-up Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value="Sun 9 Mar"
                      readOnly
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50"
                    />
                  </div>
                </div>

                {/* Pick-up Time */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value="10:30"
                      readOnly
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50"
                    />
                  </div>
                </div>

                {/* Drop-off Date */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drop-off Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value="Mon 16 Mar"
                      readOnly
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50"
                    />
                  </div>
                </div>

                {/* Drop-off Time */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value="21:00"
                      readOnly
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="md:col-span-1">
                  <button className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    Search Car
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Below Hero */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    Clear All Filters
                  </button>
                </div>

                {/* Transmission Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Transmission</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                      <span className="ml-2 text-sm text-gray-600">Automatic</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                      <span className="ml-2 text-sm text-gray-600">Manual</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{cars.length} Cars Available</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort By:</span>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>

              {/* Car Listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
