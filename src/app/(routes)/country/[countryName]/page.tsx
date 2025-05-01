import Image from "next/image";
import { destinationService } from "@/app/services/destinationService";
import React from "react";
import CountryArticlesBySection from "@/app/components/countrySections/CountryArticlesBySection";

export default async function CountryPage({
  params,
}: {
  params: { countryName: string };
}) {
  const destinations = await destinationService.getDestinations();
  const country = destinations.find(
    (d) => d.country.toLowerCase() === params.countryName
  );

  if (!country) return <div>Country not found</div>;

  return (
    <div>
      <div className="md:min-h-screen bg-primary text-white overflow-hidden relative">
        {/* <div className="md:min-h-screen bg-[#2e3192] text-white overflow-hidden relative"> */}
        <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-start gap-12 relative">
          {/* Left content section */}
          <div className="lg:w-1/2 z-10 pt-12">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-6 flex sm:items-center gap-2 sm:gap-4">
              {country.country}
              <span className="ml-2 md:ml-4 md:top-2">
                <Image
                  src={country.flag_emoji}
                  alt={`${country.country} flag`}
                  width={100}
                  height={100}
                  className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                />
              </span>
            </h1>

            <p className="text-base md:text-xl leading-relaxed max-w-full lg:max-w-xl mt-4 lg:mt-8">
              {country.about}
            </p>
          </div>

          {/* Right image gallery section */}
          <div className="hidden lg:w-1/2 md:flex relative h-[500px] md:mt-8">
            <div className="absolute right-4 top-0 z-30">
              <div className="bg-white p-3 shadow-lg">
                <Image
                  src={country.hero_img_env_url}
                  alt={`${country.country} landmark`}
                  width={260}
                  height={320}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute right-0 top-64 transform -rotate-3 z-20">
              <div className="bg-white p-3 shadow-lg">
                <Image
                  src={country.hero_img_campus_url}
                  alt={`${country.country} campus`}
                  width={280}
                  height={200}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute right-40 top-40 z-40">
              <div className="bg-white p-3 shadow-lg">
                <Image
                  src={country.hero_img_student_url}
                  alt={`${country.country} student`}
                  width={300}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Decorative dots */}
            <div className="bg-red-600 absolute z-10 bottom-50px right-40">
              <div className="relative">
                {/* Large dot */}
                <div className="absolute w-6 h-6 rounded-full bg-teal-400 opacity-70"></div>

                {/* Medium dots */}
                <div className="absolute w-4 h-4 rounded-full bg-yellow-400 opacity-70 -top-8 -left-10"></div>
                <div className="absolute w-4 h-4 rounded-full bg-pink-400 opacity-70 top-12 -left-12"></div>

                {/* Small dots */}
                <div className="absolute w-2 h-2 rounded-full bg-purple-400 opacity-70 -top-4 -left-16"></div>
                <div className="absolute w-2 h-2 rounded-full bg-blue-300 opacity-70 top-8 -left-20"></div>
                <div className="absolute w-2 h-2 rounded-full bg-green-300 opacity-70 top-16 -left-8"></div>
                <div className="absolute w-2 h-2 rounded-full bg-red-300 opacity-70 -top-10 -left-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-base md:text-xl font-bold leading-relaxed text-center mx-auto my-8 max-w-6xl">
          Everything you need to know about studying in {country.country} –
          universities, scholarships, visa process, and more.
        </h1>
        <section>
          <CountryArticlesBySection
            destinationId={country.id}
            countryName={country.country}
          />
        </section>
      </div>
    </div>
  );
}
