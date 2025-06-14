"use client";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { ChevronDown, Loader2 } from "lucide-react";
import { CreateCourseDTO } from "@/app/types/courses/courses";
import { toast } from "sonner";
import { useMemo } from "react";
import { TiptapEditor } from "@/app/components/shared/TiptapEditor";
import { useCategories } from "@/app/hooks/shared/useCategories";
import { useTags } from "@/app/hooks/shared/useTags";
import { useInstitutions } from "@/app/hooks/institutions/useInstitutions";
import { useCreateCourse } from "@/app/hooks/courses/useCourses";
import { useStudyDestinations } from "@/app/hooks/studyDestination/useStudyDestination";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  description: Yup.string().required("Description is required"),
  imageUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  category: Yup.string().required("Please select a category"),
  tag: Yup.array()
    .min(1, "Please select at least one tag")
    .of(Yup.number().required())
    .required("Please select a tag"),
  institution: Yup.string().required("Please select a institution"),
  location: Yup.string().required("Please select a location"),

  url: Yup.string()
    .url("Must be a valid URL")
    .required("Institution's website is required"),
});

interface FormValues {
  title: string;
  description: string;
  institution: string;
  imageUrl: string;
  category: string;
  tag: number[];
  slug: string;
  url: string;
  location: string;
}

const CourseForm = () => {
  const {
    data: categoriesQuery,
    isLoading: categoriesQueryLoading,
    // error: categoriesQueryError,
  } = useCategories();
  const {
    data: locationsQuery,
    isLoading: locationsQueryLoading,
    // error: categoriesQueryError,
  } = useStudyDestinations();
  const {
    data: tagsQuery,
    isLoading: tagsQueryLoading,
    // error: tagsQueryError,
  } = useTags();
  const {
    data: institutionsQuery,
    isLoading: institutionsQueryLoading,
    // error: institutionsQueryError,
  } = useInstitutions();
  const {
    mutate: createCourseMutation,
    // error: createCourseMutationError,
    // isSuccess,
  } = useCreateCourse();

  const categoriesOptions = useMemo(
    () =>
      categoriesQuery?.map((category) => ({
        value: category.id,
        label: category.category_name,
      })) || [],
    [categoriesQuery]
  );

  const locationsOptions = useMemo(
    () =>
      locationsQuery?.map((location) => ({
        value: location.id,
        label: location.country,
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

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const {
      title,
      description,
      imageUrl,
      category,
      tag,
      institution,
      slug,
      url,
      location,
    } = values;
    const createCourseData: CreateCourseDTO & {
      tags: number[];
    } = {
      title,
      description,
      image: imageUrl,
      slug,
      category_id: parseInt(category),
      institution_id: parseInt(institution),
      tags: tag,
      url: url,
      location_id: parseInt(location),
    };

    await createCourseMutation(createCourseData, {
      onError: () => {
        toast.error("Transaction failed. Please try again.");
        resetForm();
      },
      onSuccess: () => {
        toast.success("Course created successfully");
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
        institution: "",
        imageUrl: "",
        category: "",
        tag: [] as number[],
        slug: "",
        url: "",
        location: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
          <div className="bg-secondary px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Add New Course</h2>
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
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="Enter course title"
              />
              <ErrorMessage
                name="title"
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
                placeholder="Enter course description"
              />
              <ErrorMessage
                name="description"
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
                placeholder="Enter slug (e.g., my-article-title)"
              />
              <ErrorMessage
                name="slug"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="category"
                  isLoading={categoriesQueryLoading}
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.category && touched.category
                      ? "border-secondary"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                >
                  <option value="">Select a category</option>
                  {categoriesOptions?.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="category"
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
                URL/Website
              </label>
              <Field
                name="url"
                type="url"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.url && touched.url
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                placeholder="Please enter website"
              />
              <ErrorMessage
                name="url"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="institution"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institution
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="institution"
                  isLoading={institutionsQueryLoading}
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.institution && touched.institution
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                >
                  <option value="">Select a university</option>
                  {institutionsOptions?.map((institution) => (
                    <option key={institution.value} value={institution.value}>
                      {institution.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="institution"
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
              <div className="relative">
                <Field
                  as="select"
                  name="location"
                  isLoading={locationsQueryLoading}
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.location && touched.location
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                >
                  <option value="">Select a location</option>
                  {locationsOptions?.map((location) => (
                    <option key={location.value} value={location.value}>
                      {location.label}
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
                htmlFor="tag"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tag
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="tag"
                  multiple
                  isLoading={tagsQueryLoading}
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.tag && touched.tag
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out appearance-none`}
                >
                  <option value="">Select a tag</option>
                  {tagsOptions?.map((tag) => (
                    <option key={tag.value} value={tag.value}>
                      {tag.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="tag"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

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
                "Create Course"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CourseForm;
