"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Fill In The Required Form",
    description: "Amet minim mollit no duis deserunt ulamco.",
    href: "#fill-form",
  },
  {
    number: "02",
    title: "Submit Your Documents",
    description: "Amet minim mollit no duis deserunt ulamco.",
    href: "#submit-docs",
  },
  {
    number: "03",
    title: "Review Process",
    description: "Amet minim mollit no duis deserunt ulamco.",
    href: "#review",
  },
  {
    number: "04",
    title: "Get Ready To Receive your Visa",
    description: "Amet minim mollit no duis deserunt ulamco.",
    href: "#receive-visa",
  },
];

const ProcessSteps = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-red-400 font-medium">WORKING PROCESS</span>
        <h2 className="text-4xl font-bold mt-2">
          4 Easy Steps to Get Quick Help
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <Link key={step.number} href={step.href} className="flex flex-col">
            <Card className="flex-1 group hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-white font-bold mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-red-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 flex-1">{step.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;
