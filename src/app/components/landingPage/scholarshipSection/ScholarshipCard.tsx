import { DateTime } from "luxon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScholarshipCardProps } from "@/app/types/scholarships/scholarships";
import { getHtmlPreviewServer } from "@/app/utils/helpers";

const ScholarshipCard = ({
  title,
  id,
  image,
  published_date,
  deadline_date,
  slug,
  description,
}: ScholarshipCardProps) => {
  return (
    <>
      <Link href={`scholarships/${slug}`}>
        <Card
          key={id}
          className="overflow-hidden h-full transition-all md:transition md:ease-in-out md:delay-100 md:hover:-translate-y-1 md:hover:scale-80 md:hover:shadow-lg md:duration-300 ..."
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
              Published:{" "}
              {published_date
                ? DateTime.fromISO(published_date).toFormat("MMM, d, yyyy")
                : ""}
            </div>
            <h3 className="text-xl font-bold leading-tight group-hover:text-emerald-600 transition-colors">
              {title}
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground line-clamp-2">
              {getHtmlPreviewServer(description)}
            </p>
            <div className="">
              <div className="text-sm text-secondary font-medium">
                Deadline:{" "}
                {deadline_date
                  ? DateTime.fromISO(deadline_date).toFormat("MMM, d, yyyy")
                  : ""}
              </div>
              <div className="flex items-center text-primary-600 font-medium group my-2">
                Read more
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default ScholarshipCard;
