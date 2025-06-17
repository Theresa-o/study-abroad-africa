"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { TiptapEditor } from "@/app/components/shared/TiptapEditor";
import { useConsultation } from "@/app/hooks/consultation/useConsultation";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_no: Yup.string().required("Phone number is required"),
  pr_interest: Yup.string().required("Please select PR interest"),
});

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  pr_interest: string;
}

const BookConsultation = () => {
  const { mutate } = useConsultation();
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const { first_name, last_name, email, phone_no, pr_interest } = values;

    const payload = {
      first_name,
      last_name,
      email,
      phone_no,
      pr_interest,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Thank you, we would get back to you");
        resetForm();
        router.push("/");
      },
      onError: () => {
        toast.error("Something went wrong, please try again");
      },
    });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        pr_interest: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
          <div className="bg-secondary px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              Book a consultation
            </h2>
            <p className="text-white font-semibold italic font-sm">
              Please fill the below form with accurate details and we would
              contact you
            </p>
          </div>

          <div className="px-6 py-8 space-y-6">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <Field
                name="first_name"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.first_name && touched.first_name
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <Field
                name="last_name"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.last_name && touched.last_name
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
              />
              <ErrorMessage
                name="slug"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.email && touched.email
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>
            <div>
              <label
                htmlFor="phone_no"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <Field
                name="phone_no"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.phone_no && touched.phone_no
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
              />
              <ErrorMessage
                name="phone_no"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="pr_interest"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Please provide a background of your P.R interest and history
              </label>
              <TiptapEditor
                content={values.pr_interest}
                onChange={(content) => setFieldValue("pr_interest", content)}
                error={!!(errors.pr_interest && touched.pr_interest)}
              />
              <ErrorMessage
                name="pr_interest"
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
                "Book a consultation"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BookConsultation;
