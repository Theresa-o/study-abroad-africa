import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  institution: string;
  imageUrl: string;
  category: string;
  slug: string;
}

const SchoolCards = ({
  title,
  institution,
  category,
  imageUrl,
  slug,
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden relative transition-all md:transition md:ease-in-out md:delay-100 md:hover:-translate-y-1 md:hover:scale-80 md:hover:shadow-lg md:duration-300">
      <Link href={`/programs/courses/${slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt="Background"
            fill
            className="rounded-md object-cover"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-8">{institution}</p>
          <div className="absolute bottom-4 left-4 ">
            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
              {category}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default SchoolCards;
