"use client";
import { Button } from "@/components/ui/button";
import ScholarshipCard from "./ScholarshipCard";
import { useScholarship } from "@/app/hooks/scholarships/useScholarship";

const ScholarshipsSection = () => {
  const { data: scholarships } = useScholarship();
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h2 className="text-xl md:text-3xl font-bold flex items-center gap-2">
              Scholarships for international students
            </h2>
            <p className="text-muted-foreground">Apply for a scholarship!</p>
          </div>
          <Button
            variant="secondary"
            className="text-red-500 hover:bg-emerald-600 hover:border-none border border-red-500 hover:text-white"
          >
            View all
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships?.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} {...scholarship} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipsSection;
