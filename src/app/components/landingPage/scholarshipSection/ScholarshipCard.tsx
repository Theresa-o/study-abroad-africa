import { Badge } from "@/components/ui/badge";
import { DateTime } from "luxon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScholarshipCardProps } from "@/app/types/scholarships/scholarships";

const ScholarshipCard = ({
  title,
  id,
  image,
  published_date,
  deadline_date,
  url,
  description,
  scholarship_categories,
}: ScholarshipCardProps) => {
  return (
    <>
      <Link href={url}>
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

            {scholarship_categories?.length > 0 && (
              <>
                {/* If there's only one category, place it on the right */}
                {scholarship_categories.length === 1 && (
                  <Badge
                    key={scholarship_categories[0].category_id}
                    className="absolute top-4 right-4 bg-primary"
                  >
                    {/* <h1>WHOOO</h1> */}
                    {scholarship_categories[0].categories?.category_name || ""}
                  </Badge>
                )}

                {/* If there are 2 categories, position them differently */}
                {scholarship_categories.length > 1 && (
                  <>
                    <Badge
                      key={scholarship_categories[0].category_id}
                      className="absolute top-4 left-4 bg-emerald-500 hover:bg-emerald-600 mb-2"
                    >
                      {/* <h1>Hello</h1> */}
                      {scholarship_categories[0].categories?.category_name ||
                        ""}
                    </Badge>

                    <Badge
                      key={scholarship_categories[1].category_id}
                      className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600 mb-2"
                    >
                      {/* <h1>Hi</h1> */}
                      {scholarship_categories[1].categories?.category_name ||
                        ""}
                    </Badge>
                  </>
                )}
              </>
            )}
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
            <p className="text-muted-foreground line-clamp-2">{description}</p>
            <div className="">
              <div className="text-sm text-secondary font-medium">
                Deadline:{" "}
                {deadline_date
                  ? DateTime.fromISO(deadline_date).toFormat("MMM, d, yyyy")
                  : ""}
              </div>
              <div className="flex items-center text-emerald-600 font-medium group my-2">
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
