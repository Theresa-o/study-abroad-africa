import { Card, CardContent } from "@/components/ui/card";
// import { useStudyAbroadSteps } from "@/app/hooks/studyAbroadSteps/useStudyAbroadSteps";

const steps = [
  {
    number: "01",
    title: "Define Your Study Goals",
    description:
      "Identify your preferred course, country, and funding options. Research universities that align with your goals.",
    href: "#define-goals",
  },
  {
    number: "02",
    title: "Research Schools & Programs",
    description:
      "Compare universities based on admission requirements, tuition, scholarships, and post-graduation opportunities.",
    href: "#research-schools",
  },
  {
    number: "03",
    title: "Prepare & Take Required Exams",
    description:
      "Take IELTS/TOEFL, GMAT/GRE, or SAT/ACT as required by your chosen universities.",
    href: "#take-exams",
  },
  {
    number: "04",
    title: "Research Scholarships & Funding",
    description:
      "Explore scholarships, assistantships, and education loans to finance your studies.",
    href: "#research-funding",
  },
  {
    number: "05",
    title: "Gather & Prepare Application Documents",
    description:
      "Prepare transcripts, SOP, recommendation letters, test scores, and resume.",
    href: "#prepare-docs",
  },
  {
    number: "06",
    title: "Apply to Universities",
    description:
      "Submit applications to multiple universities, track deadlines, and follow up.",
    href: "#apply-universities",
  },
  {
    number: "07",
    title: "Apply for a Student Visa",
    description:
      "Submit your visa application with proof of admission, financial support, and other required documents.",
    href: "#apply-visa",
  },
  {
    number: "08",
    title: "Prepare for Travel & Accommodation",
    description:
      "Book flights, arrange housing, learn about the culture, and connect with other students.",
    href: "#prepare-travel",
  },
];

const ProcessSteps = () => {
  // const { data } = useStudyAbroadSteps();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-secondary font-medium font-heading">
          STUDY ABROAD PROCESS
        </span>
        <h2 className="text-4xl font-bold mt-2 font-heading">
          8 Steps to Studying Abroad for Africans
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps?.map((step) => (
          <Card
            key={step.number}
            className="flex-1 group hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6 text-center flex flex-col h-full font-sans">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold mb-4 mx-auto">
                {step.number}
              </div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-secondary transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 flex-1">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;
