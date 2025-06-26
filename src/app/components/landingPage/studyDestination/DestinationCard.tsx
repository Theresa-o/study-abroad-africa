import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  country: string;
  image_url: string;
}

const DestinationCard = ({ country, image_url }: DestinationCardProps) => {
  return (
    <Link href={`/country/${country.toLowerCase()}`}>
      <Card className="overflow-hidden transition-all md:transition md:ease-in-out md:delay-100 md:hover:-translate-y-1 md:hover:scale-80 md:hover:shadow-lg md:duration-300 font-sans">
        <CardContent className="p-0">
          <div className="relative h-40 w-full">
            <Image
              src={image_url}
              alt={`Study in ${country}`}
              fill
              className="rounded-md object-cover"
              // udate the sizes attribute to match the image dimensions
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Study in {country}</h3>
            <div className="flex items-center text-secondary-dark group-hover:text-secondary">
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
