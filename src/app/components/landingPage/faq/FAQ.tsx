import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I choose the right university abroad?",
    answer: (
      <>
        <p>Consider the following key factors:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Tuition & Cost of Living</strong> – Ensure the total
            expenses fit your budget.
          </li>
          <li>
            <strong>Available Scholarships</strong> – Some universities offer
            financial aid to African students.
          </li>
          <li>
            <strong>Job Opportunities</strong> – Check for post-study work
            options.
          </li>
          <li>
            <strong>University Ranking & Accreditation</strong> – Ensure your
            chosen course is well recognized.
          </li>
          <li>
            <strong>Student Support & Community</strong> – Look for universities
            with strong African student associations.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I study abroad without writing IELTS or TOEFL?",
    answer: (
      <>
        <p>Yes! Some universities waive English tests if:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your previous education was in English.</li>
          <li>
            You provide an official letter from your school confirming English
            proficiency.
          </li>
          <li>
            You apply to universities in countries where IELTS is not required
            (e.g., Germany, Turkey, some schools in Canada & USA).
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "What are the requirements to study abroad?",
    answer: (
      <>
        <p>For most countries, students will need to submit:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>A completed application form.</li>
          <li>Official academic transcripts.</li>
          <li>A personal statement.</li>
          <li>
            Minimum GPA requirements (typically <strong>2.5 – 3.0</strong>).
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I work while studying abroad?",
    answer: (
      <>
        <p>Yes! Most countries allow students to work part-time:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Canada</strong> – 20 hours/week during school, full-time
            during breaks.
          </li>
          <li>
            <strong>UK</strong> – 20 hours/week during school, full-time during
            holidays.
          </li>
          <li>
            <strong>USA</strong> – Limited on-campus work; off-campus work
            requires OPT/CPT approval.
          </li>
          <li>
            <strong>Germany</strong> – 120 full days or 240 half days per year.
          </li>
          <li>
            <strong>Australia</strong> – No limit during studies (as of 2023).
          </li>
        </ul>
      </>
    ),
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
