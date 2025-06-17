import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ConsultationRequest = () => {
  return (
    <section className="relative py-24">
      {/* <Image
        src="/placeholder.svg?height=400&width=1200"
        alt="Team of professionals"
        fill
        className="object-cover"
      /> */}
      <Image
        src="/images/landing-page-bg.jpg"
        alt="Background"
        fill
        className="rounded-md object-cover"
        // udate the sizes attribute to match the image dimensions
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-navy-900 bg-opacity-70"></div>
      <div className="relative z-10 max-w-3xl mx-auto text-center text-white space-y-6">
        <h2 className="text-4xl font-bold font-heading">
          Need Consultation for Your Canadian PR Application?{" "}
        </h2>
        <p className="text-xl font-sans">
          If you're considering moving to Canada and need help with your
          permanent residency (PR) process, we’ve partnered with a trusted
          registered Canadian immigration consultant.
        </p>
        <Link href={`book_consultation/`}>
          <Button
            className="bg-secondary text-white hover:bg-white hover:text-secondary font-sans mt-4"
            size="lg"
          >
            Book a Consultation – $100
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ConsultationRequest;
