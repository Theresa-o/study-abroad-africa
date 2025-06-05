"use client";

import {
  useCreateServices,
  useServiceCategories,
  useServiceProviders,
} from "@/app/hooks/services/useServices";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useMemo } from "react";
import * as Yup from "yup";
import { toast } from "sonner";
import { ServiceInsertDataDTO } from "@/app/types/services/services";
import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@/app/components/shared/TiptapEditor";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  status: Yup.string()
    .oneOf(["true", "false"], "Please select a status")
    .required("Please select a status"),
  url: Yup.string().url().required("Enter the url"),
  service_category_id: Yup.number().required("Choose a category"),
  serviceProviderIds: Yup.array()
    .min(1, "Please select at least one service provider")
    .of(Yup.number().required())
    .required("Please select a service provider"),
});

interface FormValues {
  title: string;
  description: string;
  service_category_id: number;
  image: string;
  status: string;
  url: string;
  slug: string;
  serviceProviderIds: number[];
}

const ServicesForm = () => {
  const router = useRouter();
  const { mutate } = useCreateServices();
  const {
    data: categoriesQuery,
    isLoading: categoriesQueryLoading,
    // error: categoriesQueryError,
  } = useServiceCategories();
  const {
    data: serviceProviders,
    isLoading: providersQueryLoading,
    // error: categoriesQueryError,
  } = useServiceProviders();

  const providerOptions = useMemo(
    () =>
      serviceProviders?.map((providers) => ({
        value: providers.id,
        label: providers.company_name,
      })) || [],
    [serviceProviders]
  );

  const categoriesOptions = useMemo(
    () =>
      categoriesQuery?.map((category) => ({
        value: category.id,
        label: category.name,
      })) || [],
    [categoriesQuery]
  );

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const {
      title,
      description,
      service_category_id,
      image,
      status,
      url,
      slug,
      serviceProviderIds,
    } = values;

    const createProviderData: ServiceInsertDataDTO & {
      serviceProviderIds: number[];
    } = {
      title,
      description,
      image: image,
      service_category_id: service_category_id,
      serviceProviderIds: serviceProviderIds,
      status: values.status === "true",
      url: url,
      slug: slug,
    };

    mutate(createProviderData, {
      onError: () => {
        toast.error("Transaction failed. Please try again.");
      },
      onSuccess: () => {
        toast.success("Service created successfully");
        resetForm();
        router.push("/");
      },
    });
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        image: "",
        service_category_id: 0,
        status: "",
        slug: "",
        url: "",
        serviceProviderIds: [] as number[],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form className="max-w-md md:max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
          <div className="bg-secondary px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex justify-center">
              Add New Service
            </h2>
          </div>
          <div className="px-6 py-8 space-y-6">
            {/* Title */}
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
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="Enter service title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            {/* Description */}
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
                placeholder="Enter service description..."
              />
              {/* <Field
                name="description"
                as="textarea"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.description && touched.description
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="Enter service description"
              /> */}

              <ErrorMessage
                name="description"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            {/* Slug */}
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
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="Enter slug e.g title-slug"
              />
              <ErrorMessage
                name="slug"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="service_category_id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="service_category_id"
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.service_category_id && touched.service_category_id
                      ? "border-secondary"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                >
                  <option value="">Select a category</option>
                  {categoriesOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="service_category_id"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            {/* Provider */}
            <div>
              <label
                htmlFor="serviceProviderIds"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Provider
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="serviceProviderIds"
                  multiple
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.service_category_id && touched.service_category_id
                      ? "border-secondary"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                >
                  {providerOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="serviceProviderIds"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image
              </label>
              <Field
                name="image"
                type="url"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.image && touched.image
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="https://example.com/image.jpg"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Url
              </label>
              <Field
                name="url"
                type="url"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.url && touched.url
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="Enter url"
              />
              <ErrorMessage
                name="url"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="status"
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.status && touched.status
                      ? "border-secondary"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                >
                  <option value="">Select status</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="status"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary  text-white font-bold py-3 px-4 rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Creating...
                </div>
              ) : (
                "Create Service"
              )}
              {/* {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"} */}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ServicesForm;
