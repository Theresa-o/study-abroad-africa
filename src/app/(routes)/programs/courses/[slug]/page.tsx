import React from "react";
import { BasicPage } from "@/app/components/shared/sharedPages/BasicPage";
import { courseService } from "@/app/services/courseService";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/app/components/shared/Breadcrumb/Breadcrumb";

interface CourseDetailPageProps {
  params: { slug: string };
}
export const generateStaticParams = async () => {
  try {
    const courses = await courseService.getCourses();

    return courses
      .filter((course) => course.slug)
      .map((course) => ({
        slug: course.slug,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
};

const page = async ({ params }: CourseDetailPageProps) => {
  const slug = params.slug;
  const course = await courseService.getCourseBySlug(slug);

  if (!course) return notFound();

  const breadcrumbItems = [
    {
      label: "Programs",
      href: "/programs",
    },
    {
      label: course.title,
    },
  ];

  const additionalContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Institution</h3>
        <p className="text-gray-700">{course?.institution?.institution_name}</p>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Course Details</h3>
        <p className="text-gray-700">More course information can go here...</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <BasicPage
        title={course?.title ?? ""}
        description={course?.description ?? ""}
        category={course?.category?.category_name ?? ""}
        imageUrl={course?.image ?? ""}
        additionalContent={additionalContent}
      />
    </div>
  );
};

export default page;
