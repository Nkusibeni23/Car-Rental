"use client";

import React, { useState, useEffect } from 'react';

interface HeroCarouselProps {
  images: string[];
  interval?: number; // in milliseconds
}

export default function HeroCarousel({ images, interval = 3000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [images, interval]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      {/* Main background image with smooth transition */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out bg-gray-800"
        style={{
          backgroundImage: `url('${images[currentIndex]}')`,
        }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
