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
      />
      <div className="absolute inset-0 bg-navy-900 bg-opacity-70"></div>
      <div className="relative z-10 max-w-3xl mx-auto text-center text-white space-y-6">
        <h2 className="text-4xl font-bold">Need a Consultation?</h2>
        <p className="text-xl">
          If you would like to process your visa application, the best way to
          start is to have a consultation with one of our experienced registered
          migration agents.
        </p>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white" size="lg">
          Make an appointment
        </Button>
      </div>
    </section>
  );
};

export default ConsultationRequest;
