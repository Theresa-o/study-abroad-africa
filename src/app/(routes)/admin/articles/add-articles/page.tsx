"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { toast } from "sonner";
import { ChevronDown, Loader2 } from "lucide-react";
import { TiptapEditor } from "@/app/components/shared/TiptapEditor";
import { useStudyDestinations } from "@/app/hooks/studyDestination/useStudyDestination";
import { useCategories } from "@/app/hooks/shared/useCategories";
import {
  useArticleTags,
  useCreateArticles,
} from "@/app/hooks/articles/useArticles";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  category: Yup.string().required("Please select a category"),
  location: Yup.string().required("Please select a location"),
  url: Yup.string()
    .url("Must be a valid URL")
    .required("Article website URL is required"),
  author: Yup.string().required("Author is required"),
  tags: Yup.array()
    .min(1, "Please select at least one tag")
    .of(Yup.number().required())
    .required("Please select a tag"),
});

interface FormValues {
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  location: string;
  url: string;
  author: string;
  tags: number[];
}

const ArticleForm = () => {
  const { data: countryQuery } = useStudyDestinations();
  const { data: categoriesQuery } = useCategories();
  const { data: tagsQuery } = useArticleTags();

  const { mutate: createArticleMutation } = useCreateArticles();

  const countryOptions = useMemo(
    () => countryQuery?.map((c) => ({ value: c.id, label: c.country })) || [],
    [countryQuery]
  );

  const categoryOptions = useMemo(
    () =>
      categoriesQuery?.map((l) => ({ value: l.id, label: l.category_name })) ||
      [],
    [categoriesQuery]
  );

  const tagsOptions = useMemo(
    () => tagsQuery?.map((t) => ({ value: t.id, label: t.name })) || [],
    [tagsQuery]
  );

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const {
      title,
      description,
      slug,
      image,
      category,
      location,
      url,
      author,
      tags,
    } = values;

    const payload = {
      title,
      description,
      slug,
      image,
      category_id: parseInt(category),
      country_id: parseInt(location),
      url,
      author,
      tagIds: tags,
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
        image: "",
        category: "",
        location: "",
        url: "",
        author: "",
        tags: [] as number[],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
          <div className="bg-secondary px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Create Articles</h2>
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
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <Field
                name="image"
                type="url"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.image && touched.image
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="https://example.com/image.jpg"
              />
              <ErrorMessage
                name="image"
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
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Selected Related Tag
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="tags"
                  multiple
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.tags && touched.tags
                      ? "border-secondary"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out appearance-none`}
                >
                  {tagsOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                name="tags"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Related category
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="category"
                  className={`block w-full px-4 py-3 rounded-md border ${
                    errors.category && touched.category
                      ? "border-red-500"
                      : "border-gray-300"
                  } appearance-none focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                >
                  <option value="">Select category</option>
                  {categoryOptions.map((category) => (
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
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Author
              </label>
              <Field
                name="author"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.author && touched.author
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
                placeholder="Enter authors name/your name"
              />
              <ErrorMessage
                name="author"
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
                "Create Article"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ArticleForm;
