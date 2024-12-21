import Footer from "./components/footer/Footer";
import ConsultationRequest from "./components/landingPage/consultation/Consultation";
import DiscoverPrograms from "./components/landingPage/discoverProgram/DiscoverPrograms";
import EmailSubscriber from "./components/landingPage/emailSubscriber/EmailSubscriber";
import EssentialExams from "./components/landingPage/examSection/EssentialExams";
import FAQ from "./components/landingPage/faq/FAQ";
import HeroSection from "./components/landingPage/HeroSection";
import ProcessSteps from "./components/landingPage/processSteps/ProcessSteps";
import ScholarshipsSection from "./components/landingPage/scholarshipSection/ScholarshipSection";
import ServicesSection from "./components/landingPage/servicesSection/ServicesSection";
import StudyDestinations from "./components/landingPage/studyDestination/StudyDestination";
import BlogTabs from "./components/landingPage/tipsNewsEvents/BlogTabs";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DiscoverPrograms />
      <ProcessSteps />
      <StudyDestinations />
      <ScholarshipsSection />
      <BlogTabs />
      <EmailSubscriber />
      <EssentialExams />
      <ServicesSection />
      <ConsultationRequest />
      <FAQ />
      <Footer />
    </div>
  );
}
