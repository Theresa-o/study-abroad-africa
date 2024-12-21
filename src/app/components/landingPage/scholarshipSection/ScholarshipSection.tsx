import { Button } from "@/components/ui/button";
import ScholarshipCard from "./ScholarshipCard";

const scholarships = [
  {
    title: "Study Abroad Scholarship Directory 2024",
    image: "/placeholder.svg?height=192&width=384",
    date: "Oct 16, 2024",
    deadline: "Dec 31, 2024",
    type: "Multiple Programs",
    href: "/scholarships/directory-2024",
    description:
      "Comprehensive guide to international study opportunities and funding options for students worldwide.",
  },
  {
    title: "Study a Master's in Europe Scholarship 2025",
    image: "/placeholder.svg?height=192&width=384",
    date: "Nov 30, 2024",
    deadline: "Mar 15, 2025",
    type: "Master's",
    href: "/scholarships/europe-masters-2025",
    description:
      "Full-tuition scholarship for outstanding students pursuing master's degrees at top European universities.",
  },
  {
    title: "Study a Bachelor's in the USA Scholarship 2025",
    image: "/placeholder.svg?height=192&width=384",
    date: "Nov 22, 2024",
    deadline: "Feb 28, 2025",
    type: "Bachelor's",
    href: "/scholarships/usa-bachelors-2025",
    description:
      "Merit-based scholarship for international students seeking undergraduate education in the United States.",
  },
  {
    title: "Go Global MBA Scholarship 2025",
    image: "/placeholder.svg?height=192&width=384",
    date: "Nov 25, 2024",
    deadline: "Apr 1, 2025",
    type: "MBA",
    href: "/scholarships/global-mba-2025",
    description:
      "Premium scholarship opportunity for future business leaders pursuing MBA programs worldwide.",
  },
];

const ScholarshipsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h2 className="text-xl md:text-3xl font-bold flex items-center gap-2">
              Scholarships for international students
            </h2>
            <p className="text-muted-foreground">
              Apply for one of the 8 educations.com scholarships!
            </p>
          </div>
          <Button
            variant="secondary"
            className="text-pink-500 hover:bg-pink-600 hover:text-white"
          >
            View all
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.title} {...scholarship} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipsSection;
