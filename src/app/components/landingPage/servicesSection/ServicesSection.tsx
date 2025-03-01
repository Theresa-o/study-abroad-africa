"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard from "./ServiceCard";

const services = {
  financial: [
    {
      title: "TD International Student GIC Program",
      description:
        "Expedite your study permit application with a verifiable GIC from TD, a top 10 North American bank.",
      logo: "/placeholder.svg?height=64&width=128",
      href: "/services/td-gic",
    },
    {
      title: "RBC International Student GIC Program",
      description:
        "Strengthen and streamline your study permit application with a GIC from RBC, Canada's largest bank.",
      logo: "/placeholder.svg?height=64&width=128",
      href: "/services/rbc-gic",
    },
    {
      title: "Students Loans Services",
      description:
        "Don't let a lack of funds keep your students from achieving their dreams. Jumpstart their journey with ApplyBoard Student Loans.",
      logo: "/placeholder.svg?height=64&width=128",
      href: "/services/student-loans",
    },
    {
      title: "Tuition Payments Made Easy",
      description:
        "Speed up the application process with quick and reliable fee payments from Flywire.",
      logo: "/placeholder.svg?height=64&width=128",
      href: "/services/flywire",
    },
  ],
  visa: [],
  language: [],
};

const ServicesSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything you need in one place
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore exclusive programs to help you and your students save time
            and money. With ApplyBoard, you&apos;re never far from a helping
            hand.
          </p>
        </div>

        <Tabs defaultValue="financial" className="w-full">
          <TabsList className="grid w-full max-w-[600px] grid-cols-3 mx-auto">
            <TabsTrigger
              value="financial"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              Financial Services
            </TabsTrigger>
            <TabsTrigger
              value="visa"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              Visa Services
            </TabsTrigger>
            <TabsTrigger
              value="language"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              Language Test Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="financial" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.financial.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="visa" className="mt-8">
            <div className="text-center text-gray-600 py-12">
              Coming soon: Visa services to help streamline your application
              process
            </div>
          </TabsContent>

          <TabsContent value="language" className="mt-8">
            <div className="text-center text-gray-600 py-12">
              Coming soon: Language testing services to help you meet your
              requirements
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ServicesSection;
