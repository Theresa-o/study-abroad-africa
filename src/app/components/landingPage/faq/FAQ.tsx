"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does ApplyBoard offer?",
    answer:
      "ApplyBoard offers a range of services including study abroad program search, application assistance, visa guidance, and financial aid information for international students.",
  },
  {
    question: "How does the application process work?",
    answer:
      "Our application process involves creating an account, searching for programs, submitting required documents, and tracking your application status through our platform. Our team assists you at every step.",
  },
  {
    question: "What countries can I study in through ApplyBoard?",
    answer:
      "ApplyBoard partners with institutions in several countries including Canada, the United States, the United Kingdom, Australia, and Ireland.",
  },
  {
    question: "Are there any fees for using ApplyBoard's services?",
    answer:
      "ApplyBoard's services are free for students. We are compensated by our partner institutions when a student successfully enrolls.",
  },
  {
    question: "How long does the application process usually take?",
    answer:
      "The application process duration can vary depending on the program and institution. Generally, it can take anywhere from a few weeks to several months. We recommend starting the process as early as possible.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base md:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
