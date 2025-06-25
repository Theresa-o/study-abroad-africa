import { getHtmlPreviewServer } from "@/app/utils/helpers";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  slug?: string;
  service_category: {
    id: number;
    name: string;
  };
}

const ServiceCard = ({
  title,
  description,
  // url,
  image,
  service_category,
  slug,
}: ServiceCardProps) => {
  const categoryName = service_category?.name?.toLowerCase();

  return (
    <Card className="h-full flex flex-col font-sans transition-all md:transition md:ease-in-out md:delay-100 md:hover:-translate-y-1 md:hover:scale-80 md:hover:shadow-lg md:duration-300">
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
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{getHtmlPreviewServer(description)}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={`/services/${categoryName}/${slug}`}
          className="text-secondary hover:text-secondary-dark inline-flex items-center group"
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
