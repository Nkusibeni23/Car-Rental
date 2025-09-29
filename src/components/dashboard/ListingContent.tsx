"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Trash2, Gauge, Fuel, SlidersHorizontal } from "lucide-react";

// Mock data for demonstration with diverse cars and images
const mockCars = [
  {
    id: 1,
    make: "BMW",
    model: "X3",
    year: 2022,
    variant: "2.0 xDrive20d M Sport 5dr Auto Estate",
    mileage: "28,900 M",
    fuelType: "Diesel",
    transmission: "Automatic",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop&crop=center",
    price: 75000
  },
  {
    id: 2,
    make: "Honda",
    model: "CR-V",
    year: 2021,
    variant: "1.5 VTEC Turbo EX 5dr CVT AWD Estate",
    mileage: "45,200 M",
    fuelType: "Petrol",
    transmission: "Automatic",
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&crop=center",
    price: 42000
  },
  {
    id: 3,
    make: "Mercedes-Benz",
    model: "GLC",
    year: 2023,
    variant: "2.0 GLC 220d AMG Line 5dr Auto Estate",
    mileage: "12,300 M",
    fuelType: "Diesel",
    transmission: "Automatic",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&crop=center",
    price: 85000
  },
  {
    id: 4,
    make: "BMW",
    model: "X3",
    year: 2022,
    variant: "2.0 xDrive20d M Sport 5dr Auto Estate",
    mileage: "28,900 M",
    fuelType: "Diesel",
    transmission: "Automatic",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop&crop=center",
    price: 75000
  },
  {
    id: 5,
    make: "Mercedes-Benz",
    model: "GLC",
    year: 2023,
    variant: "2.0 GLC 220d AMG Line 5dr Auto Estate",
    mileage: "12,300 M",
    fuelType: "Diesel",
    transmission: "Automatic",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&crop=center",
    price: 85000
  },
  {
    id: 6,
    make: "Mazda",
    model: "CX-5",
    year: 2022,
    variant: "2.0 SKYACTIV-G SE-L Nav+ 5dr Manual Estate",
    mileage: "35,600 M",
    fuelType: "Petrol",
    transmission: "Manual",
    imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop&crop=center",
    price: 40000
  },
  {
    id: 7,
    make: "Mercedes-Benz",
    model: "GLC",
    year: 2023,
    variant: "2.0 GLC 220d AMG Line 5dr Auto Estate",
    mileage: "12,300 M",
    fuelType: "Diesel",
    transmission: "Automatic",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&crop=center",
    price: 85000
  },
  {
    id: 8,
    make: "Mercedes-Benz",
    model: "GLC",
    year: 2023,
    variant: "2.0 GLC 220d AMG Line 5dr Auto Estate",
    mileage: "12,300 M",
    fuelType: "Diesel",
    transmission: "Automatic",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&crop=center",
    price: 85000
  },
  {
    id: 9,
    make: "Mercedes-Benz",
    model: "GLC",
    year: 2023,
    variant: "2.0 GLC 220d AMG Line 5dr Auto Estate",
    mileage: "12,300 M",
    fuelType: "Diesel",
    transmission: "Automatic",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&crop=center",
    price: 85000
  },
  {
    id: 10,
    make: "Audi",
    model: "Q5",
    year: 2022,
    variant: "2.0 TDI 40 S Line 5dr S Tronic Estate",
    mileage: "22,400 M",
    fuelType: "Diesel",
    transmission: "Automatic",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop&crop=center",
    price: 68000
  },
  {
    id: 11,
    make: "Land Rover",
    model: "Discovery Sport",
    year: 2021,
    variant: "2.0 P200 S 5dr Manual Estate",
    mileage: "38,700 M",
    fuelType: "Petrol",
    transmission: "Manual",
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&crop=center",
    price: 72000
  },
  {
    id: 12,
    make: "Mercedes-Benz",
    model: "GLC",
    year: 2023,
    variant: "2.0 GLC 220d AMG Line 5dr Auto Estate",
    mileage: "12,300 M",
    fuelType: "Diesel",
    transmission: "Automatic",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&crop=center",
    price: 85000
  }
];

export default function ListingContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  // Filter cars based on search query
  const filteredCars = mockCars.filter(car =>
    car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleEdit = (carId: number) => {
    console.log("Edit car:", carId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (carId: number) => {
    console.log("Delete car:", carId);
    // TODO: Implement delete functionality
  };

  return (
    <div className="flex-1 p-4 lg:p-8 h-full overflow-auto bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header with Add Listing Button */}
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => router.push("/dashboard/add-listing")}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Add Listing
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Type make or model to search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </form>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Car Image */}
              <div className="relative h-64 border-b border-gray-200">
                <Image
                  src={car.imageUrl}
                  alt={`${car.make} ${car.model} ${car.year}`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop&crop=center";
                  }}
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {/* Car title overlay */}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-lg">
                    {car.make} {car.model} {car.year}
                  </h3>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-5">
                {/* Car Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {car.make} {car.model} {car.year}
                </h3>
                
                {/* Car Variant */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {car.variant}
                </p>

                {/* Divider */}
                <hr className="border-gray-200 mb-4" />

                {/* Car Specs */}
                <div className="flex items-center justify-around mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    <span>{car.mileage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(car.id)}
                    className="flex-grow-[2] bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="flex-grow-[1] bg-white text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full font-medium transition-colors ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cars found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
