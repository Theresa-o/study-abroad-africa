import ConsultationRequest from "./components/landingPage/consultation/Consultation";
import DiscoverPrograms from "./components/landingPage/discoverProgram/DiscoverPrograms";
import EmailSubscriber from "./components/landingPage/emailSubscriber/EmailSubscriber";
import EssentialExams from "./components/landingPage/examSection/EssentialExams";
import FAQ from "./components/landingPage/faq/FAQ";
import HeroSection from "./components/landingPage/HeroSection";
import StudyAbroadSteps from "./components/landingPage/StudyAbroadSteps/StudyAbroadSteps";
import ScholarshipsSection from "./components/landingPage/scholarshipSection/ScholarshipSection";
import ServicesSection from "./components/landingPage/servicesSection/ServicesSection";
import StudyDestinations from "./components/landingPage/studyDestination/StudyDestination";
import BlogTabs from "./components/landingPage/tipsNewsEvents/BlogTabs";
import { Suspense } from "react";
import BlogTabsSkeleton from "./components/shared/LoadingSkeletalView/BlogTabsSkeleton";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DiscoverPrograms />
      <StudyAbroadSteps />
      <StudyDestinations />
      <ScholarshipsSection />
      <Suspense fallback={<BlogTabsSkeleton />}>
        <BlogTabs />
      </Suspense>
      <EmailSubscriber />
      <EssentialExams />
      <ServicesSection />
      <ConsultationRequest />
      <FAQ />
    </div>
  );
}
