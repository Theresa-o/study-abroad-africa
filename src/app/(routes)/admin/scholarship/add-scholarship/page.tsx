"use client";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMemo } from "react";
import { TiptapEditor } from "@/app/components/shared/TiptapEditor";
import { useCategories } from "@/app/hooks/shared/useCategories";
import { useInstitutions } from "@/app/hooks/institutions/useInstitutions";
import { useTags } from "@/app/hooks/shared/useTags";
import { useCreateScholarship } from "@/app/hooks/scholarships/useScholarship";
import { useStudyDestinations } from "@/app/hooks/studyDestination/useStudyDestination";
import { CreateScholarshipDTO } from "@/app/types/scholarships/scholarships";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  description: Yup.string().required("Description is required"),
  imageUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  url: Yup.string()
    .url("Must be a valid URL")
    .required("Scholarship website is required"),
  deadlineDate: Yup.string().nullable(),
  fundingAmount: Yup.string().nullable(),
  creatorName: Yup.string().nullable(),
  categories: Yup.array()
    .min(1, "Please select at least one category")
    .of(Yup.number().required())
    .required("Please select at least one category"),
  tags: Yup.array()
    .min(1, "Please select at least one tag")
    .of(Yup.number().required())
    .required("Please select at least one tag"),
  institutions: Yup.array()
    .min(1, "Please select at least one institution")
    .of(Yup.number().required())
    .required("Please select at least one institution"),
  destinations: Yup.array()
    .min(1, "Please select at least one destination")
    .of(Yup.number().required())
    .required("Please select at least one destination"),
});

interface FormValues {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  slug: string;
  deadlineDate: string;
  fundingAmount: string;
  creatorName: string;
  categories: number[];
  tags: number[];
  institutions: number[];
  destinations: number[];
}

const ScholarshipForm = () => {
  const { data: categoriesQuery, isLoading: categoriesQueryLoading } =
    useCategories();
  const { data: tagsQuery, isLoading: tagsQueryLoading } = useTags();
  const { data: institutionsQuery, isLoading: institutionsQueryLoading } =
    useInstitutions();
  const { data: destinationsQuery, isLoading: destinationsQueryLoading } =
    useStudyDestinations();

  const { mutate: createScholarshipMutation } = useCreateScholarship();

  const categoriesOptions = useMemo(
    () =>
      categoriesQuery?.map((category) => ({
        value: category.id,
        label: category.category_name,
      })) || [],
    [categoriesQuery]
  );

  const tagsOptions = useMemo(
    () =>
      tagsQuery?.map((tag) => ({
        value: tag.id,
        label: tag.tag_name,
      })) || [],
    [tagsQuery]
  );

  const institutionsOptions = useMemo(
    () =>
      institutionsQuery?.map((institution) => ({
        value: institution.id,
        label: institution.institution_name,
      })) || [],
    [institutionsQuery]
  );

  const destinationsOptions = useMemo(
    () =>
      destinationsQuery?.map((destination) => ({
        value: destination.id,
        label: destination.country,
      })) || [],
    [destinationsQuery]
  );

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const {
      title,
      description,
      imageUrl,
      url,
      slug,
      deadlineDate,
      fundingAmount,
      creatorName,
      categories,
      tags,
      institutions,
      destinations,
    } = values;

    const createScholarshipData: CreateScholarshipDTO = {
      title,
      description,
      image: imageUrl,
      url,
      slug,
      deadline_date: deadlineDate || null,
      funding_amount: fundingAmount || null,
      creator_name: creatorName || null,

      categories,
      tags,
      institutions,
      destinations,
    };

    await createScholarshipMutation(createScholarshipData, {
      onError: (error) => {
        console.error("Scholarship creation failed:", error);
        toast.error("Scholarship creation failed. Please try again.");
        resetForm();
      },
      onSuccess: () => {
        toast.success("Scholarship created successfully!");
        resetForm();
      },
    });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        imageUrl: "",
        url: "",
        slug: "",
        deadlineDate: "",
        fundingAmount: "",
        creatorName: "",
        categories: [] as number[],
        tags: [] as number[],
        institutions: [] as number[],
        destinations: [] as number[],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
          <div className="bg-secondary px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              Add New Scholarship
            </h2>
          </div>
          <div className="px-6 py-8 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Scholarship Title
              </label>
              <Field
                name="title"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.title && touched.title
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="Enter scholarship title"
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
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="Enter slug (e.g., great-university-scholarship)"
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
                placeholder="Enter full scholarship description"
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
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="https://example.com/scholarship-image.jpg"
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
                Scholarship URL/Website
              </label>
              <Field
                name="url"
                type="url"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.url && touched.url
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="https://official-scholarship-website.com"
              />
              <ErrorMessage
                name="url"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="deadlineDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Application Deadline (Optional)
              </label>
              <Field
                name="deadlineDate"
                type="date"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.deadlineDate && touched.deadlineDate
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
              />
              <ErrorMessage
                name="deadlineDate"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="fundingAmount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Funding Amount (Optional)
              </label>
              <Field
                name="fundingAmount"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.fundingAmount && touched.fundingAmount
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="e.g., Full Tuition, $20,000"
              />
              <ErrorMessage
                name="fundingAmount"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="creatorName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Creator Name (Optional)
              </label>
              <Field
                name="creatorName"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.creatorName && touched.creatorName
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="e.g., Admin User"
              />
              <ErrorMessage
                name="creatorName"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Categories
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="categories"
                  multiple
                  isLoading={categoriesQueryLoading}
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.categories && touched.categories
                      ? "border-secondary"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                  style={{ minHeight: "80px" }}
                >
                  {categoriesOptions?.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="categories"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tags
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="tags"
                  multiple
                  isLoading={tagsQueryLoading}
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.tags && touched.tags
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                  style={{ minHeight: "80px" }}
                >
                  {tagsOptions?.map((tag) => (
                    <option key={tag.value} value={tag.value}>
                      {tag.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="tags"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="institutions"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institutions
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="institutions"
                  multiple
                  isLoading={institutionsQueryLoading}
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.institutions && touched.institutions
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                  style={{ minHeight: "80px" }}
                >
                  {institutionsOptions?.map((institution) => (
                    <option key={institution.value} value={institution.value}>
                      {institution.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="institutions"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="destinations"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Destinations
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="destinations"
                  multiple
                  isLoading={destinationsQueryLoading}
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.destinations && touched.destinations
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                  style={{ minHeight: "80px" }}
                >
                  {destinationsOptions?.map((destination) => (
                    <option key={destination.value} value={destination.value}>
                      {destination.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="destinations"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Creating...
                </div>
              ) : (
                "Create Scholarship"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ScholarshipForm;
