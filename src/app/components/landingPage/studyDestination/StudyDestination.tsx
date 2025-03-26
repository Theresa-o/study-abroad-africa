"use client";

import { useStudyDestinations } from "@/app/hooks/studyDestination/useStudyDestination";
import DestinationCard from "./DestinationCard";

const StudyDestinations = () => {
  const { data } = useStudyDestinations();
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 font-heading">
          Study In Your Dream Destination
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {data?.map((destination) => (
            <DestinationCard key={destination.country} {...destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyDestinations;
