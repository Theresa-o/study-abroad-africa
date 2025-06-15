import { Breadcrumbs } from "@/app/components/shared/Breadcrumb/Breadcrumb";
import { BasicPage } from "@/app/components/shared/sharedPages/BasicPage";
import { eventsService } from "@/app/services/eventsService";
import { Button } from "@/components/ui/button";
import { DateTime } from "luxon";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  const slug = params.slug;

  const event = await eventsService.getEventBySlug(slug);

  const breadcrumbItems = [
    {
      label: "Events",
      href: "/blog?type=events",
    },
    {
      label: event.title,
    },
  ];

  const additionalContent = (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Event Details</h3>
        <div className="space-y-2">
          {event.event_date && (
            <p>
              <strong>Date:</strong>{" "}
              {DateTime.fromISO(event.event_date).toFormat("MMM d, yyyy")}
            </p>
          )}
          {event.event_location && (
            <p>
              <strong>Location:</strong> {event.event_location}
            </p>
          )}
          {event.created_by && (
            <p>
              <strong>Organized by:</strong> {event.created_by}
            </p>
          )}
          {event.created_at && (
            <p>
              <strong>Created:</strong>{" "}
              {DateTime.fromISO(event.created_at).toFormat("MMM d, yyyy")}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Quick Actions</h3>
        {event.registration_link && (
          <Button
            className="bg-secondary text-white hover:bg-white hover:text-secondary font-sans"
            size="lg"
          >
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
          </Button>
        )}
        {event.url && (
          <Button
            className="border-secondary text-white hover:bg-white hover:text-secondary font-sans mx-2"
            size="lg"
          >
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              Visit Official Page
            </a>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <BasicPage
        title={event.title ?? ""}
        description={event.description ?? ""}
        imageUrl={event.image ?? ""}
        additionalContent={additionalContent}
      />
    </div>
  );
};

export default page;
