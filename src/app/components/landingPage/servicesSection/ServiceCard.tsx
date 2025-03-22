import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  service_name: string;
  service_description: string;
  image: string;
  website: string;
}

const ServiceCard = ({
  service_name,
  service_description,
  website,
  image,
}: ServiceCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-grow space-y-4 p-6">
        <div className="h-24 w-full relative">
          <Image
            src={image}
            alt="Background"
            fill
            className="rounded-md object-cover"
            // udate the sizes attribute to match the image dimensions
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{service_name}</h3>
        <p className="text-gray-600">{service_description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={website}
          className="text-blue-600 hover:text-blue-700 inline-flex items-center group"
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
