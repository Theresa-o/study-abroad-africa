import React from "react";
import { BasicPage } from "@/app/components/shared/sharedPages/BasicPage";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/app/components/shared/Breadcrumb/Breadcrumb";
import { scholarshipService } from "@/app/services/scholarshipService";
import { DateTime } from "luxon";
import { TransformedScholarship } from "@/app/types/scholarships/scholarships";
import {
  Destination,
  Institution,
  ScholarshipCategory,
  ScholarshipDestination,
  ScholarshipInstitution,
  ScholarshipTag,
} from "@/app/types/shared/shared";

interface ScholarshipDetailPageProps {
  params: { slug: string };
}
export const generateStaticParams = async () => {
  try {
    const scholarships = await scholarshipService.getScholarship();

    return scholarships
      .filter((scholarship) => scholarship.slug)
      .map((scholarship) => ({
        slug: scholarship.slug,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
};

const page = async ({ params }: ScholarshipDetailPageProps) => {
  const slug = params.slug;
  const scholarship = await scholarshipService.getScholarshipbySlug(slug);

  if (!scholarship) return notFound();

  const transformedScholarship: TransformedScholarship = {
    ...scholarship,
    tags:
      scholarship.scholarship_tags?.map(
        (st: ScholarshipTag) => st.course_tags
      ) ?? [],
    categories:
      scholarship.scholarship_categories?.map(
        (sc: ScholarshipCategory) => sc.course_categories
      ) ?? [],
    destinations:
      scholarship.scholarship_destination?.map(
        (sd: ScholarshipDestination) => sd.destinations
      ) ?? [],
    institutions:
      scholarship.scholarship_institution?.map(
        (si: ScholarshipInstitution) => si.Institution
      ) ?? [],
  };

  const breadcrumbItems = [
    {
      label: "Scholarships",
      href: "/scholarships",
    },
    {
      label: scholarship.title,
    },
  ];

  const additionalContent = (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Scholarship Information</h3>
        <div className="space-y-2">
          {scholarship.funding_amount && (
            <p>
              <strong>Funding Amount:</strong> {scholarship.funding_amount}
            </p>
          )}
          {scholarship.deadline_date && (
            <p>
              <strong>Deadline:</strong>{" "}
              {DateTime.fromISO(scholarship.deadline_date).toFormat(
                "MMM, d, yyyy"
              )}
            </p>
          )}
          {scholarship.creator_name && (
            <p>
              <strong>Provider:</strong> {scholarship.creator_name}
            </p>
          )}
          {scholarship.published_date && (
            <p>
              <strong>Published: </strong>
              {DateTime.fromISO(scholarship.published_date).toFormat(
                "MMM, d, yyyy"
              )}
            </p>
          )}
          {transformedScholarship.destinations.length > 0 && (
            <p>
              <strong>Destinations:</strong>{" "}
              {transformedScholarship.destinations
                .map((d: Destination) => d.country)
                .join(", ")}
            </p>
          )}
          {transformedScholarship.institutions.length > 0 && (
            <p>
              <strong>Institutions:</strong>{" "}
              {transformedScholarship.institutions
                .map((i: Institution) => i.institution_name)
                .join(", ")}
            </p>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3">Quick Actions</h3>
        {scholarship.url && (
          <a
            href={scholarship.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Apply Now
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <BasicPage
        title={scholarship?.title ?? ""}
        description={scholarship?.description ?? ""}
        categories={transformedScholarship.categories}
        tags={transformedScholarship.tags}
        destinations={transformedScholarship.destinations}
        institutions={transformedScholarship.institutions}
        imageUrl={scholarship?.image ?? ""}
        additionalContent={additionalContent}
      />
    </div>
  );
};

export default page;
