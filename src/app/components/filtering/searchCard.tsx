import { Badge } from "@/components/ui/badge";
import { DateTime } from "luxon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ScholarshipCardProps {
  school_name?: string;
  id: number;
  image: string;
  title: string;
  description: string;
  url: string;
}

const SearchCard = ({
  id,
  school_name,
  image,
  title,
  description,
  url,
}: ScholarshipCardProps) => {
  return (
    <>
      <Link href={url}>
        <Card
          key={id}
          className="overflow-hidden h-full transition-all  md:transition md:ease-in-out md:delay-100 md:hover:-translate-y-1 md:hover:scale-110 md:hover:shadow-lg md:duration-300 ..."
        >
          <div className="relative h-48 w-full">
            <Image
              src={image}
              // udate the sizes attribute to match the image dimensions
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={title}
              fill
              className="rounded-md object-cover"
            />
          </div>
          <CardHeader className="space-y-2">
            <div className="text-sm text-muted-foreground">
              {school_name ? school_name : ""}
            </div>
            <h3 className="text-xl font-bold leading-tight group-hover:text-emerald-600 transition-colors">
              {title}
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground line-clamp-2">{description}</p>
            <div className="flex items-center text-emerald-600 font-medium group">
              Read more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default SearchCard;
