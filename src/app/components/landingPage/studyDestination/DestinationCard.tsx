import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  country: string;
  flagCode: string;
  imageUrl: string;
  href: string;
}

const DestinationCard = ({
  country,
  flagCode,
  imageUrl,
  href,
}: DestinationCardProps) => {
  return (
    <Link href={href} className="block group">
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative h-40 w-full">
            {/* <Image
              src={imageUrl}
              alt={`Study in ${country}`}
              fill
              className="object-cover"
            /> */}
            <Image
              src="/images/landing-page-bg.jpg"
              alt="Background"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Study in {country}</h3>
            <div className="flex items-center text-blue-600 group-hover:text-blue-700">
              <span className="mr-2">Explore</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DestinationCard;
