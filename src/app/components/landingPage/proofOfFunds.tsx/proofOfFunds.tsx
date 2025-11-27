import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const POFRequest = () => {
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
          Need Proof of Funds for Japa or Visa?
        </h2>
        <p className="mx-1 md:text-xl font-sans">
          Preparing for a visa, study, or japa application requires verifiable
          financial capability. We&apos;ve partnered with a trusted financial
          agent to seamlessly provide legitimate Proof of Funds (POF), ensuring
          your documents satisfy all embassy and immigration requirements.
        </p>
        <Link href={`proof_of_funds/`}>
          <Button
            className="bg-secondary text-white hover:bg-white hover:text-secondary font-sans mt-4"
            size="lg"
          >
            Learn More
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default POFRequest;
