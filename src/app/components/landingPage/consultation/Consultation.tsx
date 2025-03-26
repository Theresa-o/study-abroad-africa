import { Button } from "@/components/ui/button";
import Image from "next/image";

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
          Need a Consultation?
        </h2>
        <p className="text-xl font-sans">
          If you would like to process your visa application, the best way to
          start is to have a consultation with one of our experienced registered
          migration agents.
        </p>
        <Button
          className="bg-secondary text-white hover:bg-white hover:text-secondary font-sans"
          size="lg"
        >
          Make an appointment
        </Button>
      </div>
    </section>
  );
};

export default ConsultationRequest;
