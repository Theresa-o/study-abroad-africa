"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { toast } from "sonner";
import { ChevronDown, Loader2 } from "lucide-react";
import { TiptapEditor } from "@/app/components/shared/TiptapEditor";
import { useStudyDestinations } from "@/app/hooks/studyDestination/useStudyDestination";
import { useCreateInstitutionss } from "@/app/hooks/institution/useInstitution";

const validationSchema = Yup.object({
  institution_name: Yup.string().required("Slug is required"),
  description: Yup.string().required("Description is required"),
  logo: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  destination_id: Yup.string().required("Please select related destination"),
  location: Yup.string().required("Please select a location"),
  website: Yup.string()
    .url("Must be a valid URL")
    .required("Enter schools website"),
  created_by: Yup.string().required("Created by is required"),
});

interface FormValues {
  website: string;
  logo: string;
  location: string;
  institution_name: string;
  destination_id: string;
  description: string;
  created_by: string;
}

const AddInstitutionForm = () => {
  const { data: locationsQuery, isLoading: locationsQueryLoading } =
    useStudyDestinations();
  const { mutate: createInstitution } = useCreateInstitutionss();

  const locationsOptions = useMemo(
    () =>
      locationsQuery?.map((location) => ({
        value: location.id,
        label: location.country,
      })) || [],
    [locationsQuery]
  );

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const {
      website,
      logo,
      location,
      institution_name,
      destination_id,
      description,
      created_by,
    } = values;

    const payload = {
      website,
      logo,
      location,
      institution_name,
      destination_id: Number(destination_id),
      description,
      created_by,
    };

    createInstitution(payload, {
      onSuccess: () => {
        toast.success("Institution created successfully");
        resetForm();
      },
      onError: () => {
        toast.error("Failed to create institution");
      },
    });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        website: "",
        logo: "",
        location: "",
        institution_name: "",
        destination_id: "",
        description: "",
        created_by: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
          <div className="bg-secondary px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              {" "}
              Create Institution
            </h2>
          </div>

          <div className="px-6 py-8 space-y-6">
            <div>
              <label
                htmlFor="institution_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institution Name
              </label>
              <Field
                name="institution_name"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.institution_name && touched.institution_name
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="Enter institution name"
              />
              <ErrorMessage
                name="institution_name"
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
                htmlFor="logo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                logo
              </label>
              <Field
                name="logo"
                type="url"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.logo && touched.logo
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="https://example.com/image.jpg"
              />
              <ErrorMessage
                name="logo"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Website
              </label>
              <Field
                name="website"
                type="url"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.website && touched.website
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="https://article.com"
              />
              <ErrorMessage
                name="website"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <Field
                name="location"
                type="text"
                className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out"
                placeholder="location"
              />
            </div>

            <div>
              <label
                htmlFor="destination_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="destination_id"
                  isLoading={locationsQueryLoading}
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.destination_id && touched.destination_id
                      ? "border-red-500"
                      : "border-gray-300"
                  } appearance-none focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                >
                  <option value="">Select country</option>
                  {locationsOptions.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="destination_id"
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
                "Create Institution"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddInstitutionForm;
