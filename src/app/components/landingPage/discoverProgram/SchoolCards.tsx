import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image from "next/image";

interface CourseCardProps {
  title: string;
  institution: string;
  imageUrl: string;
  category: string;
}

const SchoolCards = ({
  title,
  institution,
  category,
  imageUrl,
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden relative">
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
    </Card>
  );
};

export default SchoolCards;
