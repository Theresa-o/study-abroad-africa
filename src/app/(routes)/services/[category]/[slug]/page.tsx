import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getServiceBySlug,
  isValidCategory,
} from "@/app/services/servicesService";
import { Breadcrumbs } from "@/app/components/shared/Breadcrumb/Breadcrumb";
import { serviceContentConfig } from "@/app/components/shared/staticData/serviceContent";
import { LendersSection } from "@/app/components/servicesContent/FinancialLendersSection";
import { PaymentProvidersSection } from "@/app/components/servicesContent/FinancialPaymentProvidersSection";
import { OverviewSection } from "@/app/components/servicesContent/OverviewSection";
import { GuidesSection } from "@/app/components/servicesContent/GuidesSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BasicServicePage,
  ServiceHeader,
} from "@/app/components/servicesContent/HelperService";

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = params;

  if (!isValidCategory(category)) {
    return {
      title: "Service Not Found",
    };
  }

  const service = await getServiceBySlug(category, slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | ${
      category.charAt(0).toUpperCase() + category.slice(1)
    } Services`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: service.image ? [service.image] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { category, slug } = params;

  // Validate category
  if (!isValidCategory(category)) {
    notFound();
  }

  // Fetch service data
  const service = await getServiceBySlug(category, slug);

  if (!service) {
    notFound();
  }

  // Get custom content configuration
  const contentConfig = serviceContentConfig[slug];
  if (!contentConfig) {
    // Fallback to basic service display
    return <BasicServicePage service={service} category={category} />;
  }

  const breadcrumbItems = [
    {
      label: "Services",
      href: "/services",
    },
    {
      label: category.charAt(0).toUpperCase() + category.slice(1),
      href: `/services#${category}`,
    },
    {
      label: service.title,
    },
  ];

  // Render based on layout type
  if (contentConfig.layoutType === "simple") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="max-w-6xl mx-auto">
          <ServiceHeader service={service} category={category} />

          <div className="space-y-12">
            {contentConfig.customContent?.overview && (
              <OverviewSection content={contentConfig.customContent.overview} />
            )}

            {contentConfig.customContent?.paymentProviders && (
              <PaymentProvidersSection
                providers={contentConfig.customContent.paymentProviders}
              />
            )}

            {contentConfig.customContent?.guides && (
              <GuidesSection guide={contentConfig.customContent.guides} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Tabs layout
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto">
        <ServiceHeader service={service} category={category} />
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <Tabs defaultValue="overview" className="mt-8 ">
              <TabsList className="grid w-full grid-cols-3 ">
                <TabsTrigger
                  value="overview"
                  className="bg-primary-600/20 data-[state=active]:bg-orange-500  data-[state=active]:text-white font-medium py-3"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="providers"
                  className="bg-primary-600/20 data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium py-3"
                >
                  {contentConfig.customContent?.lenders
                    ? "Lenders"
                    : "Providers"}
                </TabsTrigger>
                <TabsTrigger
                  value="guides"
                  className="bg-primary-600/20 data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium py-3"
                >
                  How to Apply
                </TabsTrigger>
                {/* <TabsTrigger
                  value="testimonials"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white font-medium py-3"
                >
                  Testimonials
                </TabsTrigger> */}
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                {contentConfig.customContent?.overview && (
                  <OverviewSection
                    content={contentConfig.customContent.overview}
                  />
                )}
              </TabsContent>

              <TabsContent value="providers" className="mt-8">
                {contentConfig.customContent?.lenders && (
                  <LendersSection
                    lenders={contentConfig.customContent.lenders}
                  />
                )}
                {contentConfig.customContent?.paymentProviders && (
                  <PaymentProvidersSection
                    providers={contentConfig.customContent.paymentProviders}
                  />
                )}
              </TabsContent>

              <TabsContent value="guides" className="mt-8">
                {contentConfig.customContent?.guides && (
                  <GuidesSection guide={contentConfig.customContent.guides} />
                )}
              </TabsContent>

              {/* <TabsContent value="testimonials" className="mt-8">
                {contentConfig.customContent?.testimonials && (
                  <TestimonialsSection
                    testimonials={contentConfig.customContent.testimonials}
                  />
                )}
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
