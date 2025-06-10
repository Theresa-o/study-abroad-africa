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
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Program Information</h3>
        <div className="space-y-2">
          {course.Institution?.name && (
            <p>
              <strong>Institution:</strong> {course.Institution.name}
            </p>
          )}
          {course.destinations?.name && (
            <p>
              <strong>Location:</strong> {course.destinations.name}
            </p>
          )}
          {course.course_categories?.name && (
            <p>
              <strong>Category:</strong> {course.course_categories.name}
            </p>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3">Quick Actions</h3>
        {course.url && (
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Visit Official Page
          </a>
        )}
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
