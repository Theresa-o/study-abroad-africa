import { useScholarship } from "@/app/hooks/scholarships/useScholarship";
import React from "react";
import ScholarshipCard from "../landingPage/scholarshipSection/ScholarshipCard";

const ScholarshipsByDestination = ({
  destinationId,
  countryName,
}: {
  destinationId: number;
  countryName: string;
}) => {
  const { data: scholarships = [] } = useScholarship();

  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.scholarship_destination?.some(
      (link: any) => link.destination_id === destinationId
    )
  );
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h2 className="text-xl md:text-3xl font-bold flex items-center gap-2 font-heading">
              Scholarships Available in {countryName}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} {...scholarship} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipsByDestination;
