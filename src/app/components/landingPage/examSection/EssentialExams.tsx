import { ExamCard } from "./ExamCard";

const exams = [
  {
    title: "IELTS",
    description: "International English Language Testing System",
    purpose: "English Proficiency",
    link: "https://www.ielts.org/",
  },
  {
    title: "TOEFL",
    description: "Test of English as a Foreign Language",
    purpose: "English Proficiency",
    link: "https://www.ets.org/toefl/",
  },
  {
    title: "GMAT",
    description: "Graduate Management Admission Test",
    purpose: "Business School",
    link: "https://www.mba.com/exams/gmat/",
  },
  {
    title: "GRE",
    description: "Graduate Record Examinations",
    purpose: "Graduate School",
    link: "https://www.ets.org/gre/",
  },
  {
    title: "SAT",
    description: "Scholastic Assessment Test",
    purpose: "Undergraduate",
    link: "https://satsuite.collegeboard.org/sat/",
  },
  {
    title: "ACT",
    description: "American College Testing",
    purpose: "Undergraduate",
    link: "https://www.act.org/",
  },
];

const EssentialExams = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Essential Exams for Your Study Abroad Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prepare for Success: Key Exams to Ace Your Study Abroad Dream
          </p>
        </div>
        <p className="text-gray-700 max-w-3xl mx-auto text-center">
          Preparing to study abroad involves more than just choosing a
          destination; it often requires proving your academic and language
          proficiency. These exams are essential to meeting the requirements of
          universities and colleges worldwide. Whether it's demonstrating your
          English skills or showcasing your aptitude, this guide will help you
          navigate the exams that matter most for your dream destination.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <ExamCard key={exam.title} {...exam} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EssentialExams;
