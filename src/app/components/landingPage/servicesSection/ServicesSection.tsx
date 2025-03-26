"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard from "./ServiceCard";
import { useService } from "@/app/hooks/services/useServices";
const ServicesSection = () => {
  const { data } = useService();

  const financialServices = data?.filter(
    (service) => service?.service_category_id === 1
  );

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 font-heading">
            Everything you need in one place
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-heading">
            Explore exclusive programs to help you with your Financial, Visa and
            Language needs
          </p>
        </div>

        <Tabs defaultValue="financial" className="w-full">
          <TabsList className="grid w-full max-w-[600px] grid-cols-3 mx-auto font-sans">
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
              {financialServices?.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="visa" className="mt-8">
            <div className="text-center text-gray-600 py-12 font-sans">
              Coming soon: Visa services to help streamline your application
              process
            </div>
          </TabsContent>

          <TabsContent value="language" className="mt-8">
            <div className="text-center text-gray-600 py-12 font-sans">
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
