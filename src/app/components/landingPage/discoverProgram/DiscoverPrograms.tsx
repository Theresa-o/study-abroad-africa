import { Card } from "@/components/ui/card";
import FilterTags from "./FilterTags";
import SchoolCards from "./SchoolCards";
import EduNavTabs from "./EduNavTabs";

const courses = [
  {
    title: "Oxford Artificial Intelligence Programme",
    institution: "Oxford Said",
    imageUrl: "/placeholder.svg?height=192&width=384",
    category: "Executive Education",
  },
  {
    title: "MBA Essentials",
    institution: "LSE",
    imageUrl: "/placeholder.svg?height=192&width=384",
    category: "Executive Education",
  },
  {
    title: "Artificial Intelligence: Implications for Business Strategy",
    institution: "MIT Sloan School of Management",
    imageUrl: "/placeholder.svg?height=192&width=384",
    category: "Executive Education",
  },
  {
    title: "Oxford Executive Leadership Programme",
    institution: "Oxford Said",
    imageUrl: "/placeholder.svg?height=192&width=384",
    category: "Executive Education",
  },
];

const DiscoverPrograms = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 my-4">
      <Card className="p-4 md:py-12 md:px-4 ">
        <h1 className="text-lg md:text-4xl font-bold mb-8 text-[#2d4a43">
          Discover Programs by Category
        </h1>

        <EduNavTabs />
        <FilterTags />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <SchoolCards
              key={course.title}
              title={course.title}
              institution={course.institution}
              imageUrl={course.imageUrl}
              category={course.category}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="#" className="text-lg text-gray-900 hover:underline">
            View more options
          </a>
        </div>
      </Card>
    </section>
  );
};

export default DiscoverPrograms;
