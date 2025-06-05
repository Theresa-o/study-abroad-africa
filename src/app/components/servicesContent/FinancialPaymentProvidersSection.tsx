import { Button } from "@/components/ui/button";
import { PaymentProvider } from "@/app/types/services/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PaymentProvidersSectionProps {
  providers: PaymentProvider[];
}

export const PaymentProvidersSection = ({
  providers,
}: PaymentProvidersSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map((provider) => (
          <Card key={provider.id} className="h-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 relative">
                <Image
                  src="/images/landing-page-bg.jpg"
                  alt={provider.name}
                  fill
                  className="object-contain"
                />
              </div>
              <CardTitle className="text-lg">{provider.name}</CardTitle>
              <p className="text-sm text-gray-600">{provider.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Fees:</span>
                  <span className="text-gray-600">{provider.fees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Processing:</span>
                  <span className="text-gray-600">
                    {provider.processingTime}
                  </span>
                </div>
              </div>

              <div>
                <p className="font-medium text-sm mb-2">Supported Countries:</p>
                <div className="flex flex-wrap gap-1">
                  {provider.supportedCountries.map((country, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              <Button asChild className="w-full mt-4">
                <Link
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pay Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
