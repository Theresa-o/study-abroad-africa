import React, { Suspense } from "react";
import Search from "../filtering/search";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Full-width background image */}
      <Image
        src="/images/landing-page-bg.jpg"
        alt="Background"
        fill
        // udate the sizes attribute to match the image dimensions
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        className="absolute z-0 object-cover object-center w-full h-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-5"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-3xl text-center text-white px-4">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
            Guide to Navigating Studying Abroad
          </h1>
          <p className="text-base md:text-xl mb-5 px-2">
            From Africa to the World
          </p>

          {/* Search Bar Wrapper */}
          <div className="flex justify-center pb-8">
            <div className="w-full max-w-2xl">
              <Suspense>
                <Search />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
