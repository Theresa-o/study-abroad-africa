"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { toast } from "sonner";
import { ChevronDown, Loader2 } from "lucide-react";
import { TiptapEditor } from "@/app/components/shared/TiptapEditor";
import { useCourses } from "@/app/hooks/courses/useCourses";
import { useCreateEvents } from "@/app/hooks/events/useEvents";
import { useStudyDestinations } from "@/app/hooks/studyDestination/useStudyDestination";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  description: Yup.string().required("Description is required"),
  imageUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  course: Yup.string().required("Please select a course"),
  location: Yup.string().required("Please select a location"),
  url: Yup.string()
    .url("Must be a valid URL")
    .required("Article website URL is required"),
  eventDate: Yup.string().required("Event date is required"),
  eventLocation: Yup.string().required("Event location is required"),
  registrationLink: Yup.string()
    .url("Must be a valid URL")
    .required("Enter registration link"),
  created_by: Yup.string().required("Created by is required"),
});

interface FormValues {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  course: string;
  location: string;
  url: string;
  eventDate: string;
  eventLocation: string;
  registrationLink: string;
  created_by: string;
}

const EventForm = () => {
  const { data: countryQuery } = useStudyDestinations();
  const { data: coursesQuery } = useCourses();

  const { mutate: createArticleMutation } = useCreateEvents();

  const countryOptions = useMemo(
    () => countryQuery?.map((c) => ({ value: c.id, label: c.country })) || [],
    [countryQuery]
  );
  const coursesOptions = useMemo(
    () => coursesQuery?.map((l) => ({ value: l.id, label: l.title })) || [],
    [coursesQuery]
  );

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const {
      title,
      description,
      slug,
      imageUrl,
      course,
      location,
      url,
      eventDate,
      eventLocation,
      registrationLink,
      created_by,
    } = values;

    const payload = {
      title,
      description,
      slug,
      image: imageUrl,
      course_id: parseInt(course),
      country_id: parseInt(location),
      url,
      event_date: eventDate,
      event_location: eventLocation,
      registration_link: registrationLink,
      created_by: created_by,
    };

    createArticleMutation(payload, {
      onSuccess: () => {
        toast.success("Article created successfully");
        resetForm();
      },
      onError: () => {
        toast.error("Failed to create article");
      },
    });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        slug: "",
        description: "",
        imageUrl: "",
        course: "",
        location: "",
        url: "",
        eventDate: "",
        eventLocation: "",
        registrationLink: "",
        created_by: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
          <div className="bg-secondary px-6 py-4">
            <h2 className="text-2xl font-bold text-white"> Create Event</h2>
          </div>

          <div className="px-6 py-8 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <Field
                name="title"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.title && touched.title
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="Enter article title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Slug
              </label>
              <Field
                name="slug"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.slug && touched.slug
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="article-title-slug"
              />
              <ErrorMessage
                name="slug"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <TiptapEditor
                content={values.description}
                onChange={(content) => setFieldValue("description", content)}
                error={!!(errors.description && touched.description)}
                placeholder="Write a detailed description..."
              />
              <ErrorMessage
                name="description"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <Field
                name="imageUrl"
                type="url"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.imageUrl && touched.imageUrl
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="https://example.com/image.jpg"
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Article URL
              </label>
              <Field
                name="url"
                type="url"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.url && touched.url
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="https://article.com"
              />
              <ErrorMessage
                name="url"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="registrationLink"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Registration Link
              </label>
              <Field
                name="registrationLink"
                type="url"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.registrationLink && touched.registrationLink
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="Enter link to register"
              />
              <ErrorMessage
                name="registrationLink"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="eventDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Date
              </label>
              <Field
                name="eventDate"
                type="date"
                className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label
                htmlFor="eventLocation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Location
              </label>
              <Field
                name="eventLocation"
                type="text"
                className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out"
                placeholder="Event venue or online"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="location"
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.location && touched.location
                      ? "border-red-500"
                      : "border-gray-300"
                  } appearance-none focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                >
                  <option value="">Select country</option>
                  {countryOptions.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="location"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Related Course
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="course"
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.course && touched.course
                      ? "border-red-500"
                      : "border-gray-300"
                  } appearance-none focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                >
                  <option value="">Select course</option>
                  {coursesOptions.map((course) => (
                    <option key={course.value} value={course.value}>
                      {course.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="course"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="created_by"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Created By
              </label>
              <Field
                name="created_by"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.created_by && touched.created_by
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="Enter creators name/your name"
              />
              <ErrorMessage
                name="created_by"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition duration-150 ease-in-out"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Creating...
                </div>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EventForm;
