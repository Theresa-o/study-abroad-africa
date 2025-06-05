import { Lender } from "@/app/types/services/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface LendersSectionProps {
  lenders: Lender[];
}

export const LendersSection = ({ lenders }: LendersSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Partner Lenders</h2>
        <p className="text-gray-600">
          Compare rates and terms from trusted financial institutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lenders.map((lender) => (
          <Card key={lender.id} className="h-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 relative">
                {/* <Image
                  src={lender.logo}
                  alt={lender.name}
                  fill
                  className="object-contain"
                /> */}
                <Image
                  src="/images/landing-page-bg.jpg"
                  alt={lender.name}
                  fill
                  className="object-contain"
                />
              </div>
              <CardTitle className="text-lg">{lender.name}</CardTitle>
              <p className="text-sm text-gray-600">{lender.description}</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-medium text-green-600">
                    {lender.interestRate}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max Amount:</span>
                  <span className="font-medium">{lender.maxAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-medium">{lender.processingTime}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="font-medium text-sm mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Requirements:
                </p>
                {lender.requirements.map((requirement, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <CheckCircle size={12} className="text-green-500" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-4">
                <Link
                  href={lender.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
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
