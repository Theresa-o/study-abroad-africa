"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { TiptapEditor } from "@/app/components/shared/TiptapEditor";
import { useConsultation } from "@/app/hooks/consultation/useConsultation";
import { useRouter } from "next/navigation";
import { useContactUs } from "@/app/hooks/contactUs/useContactUs";

const validationSchema = Yup.object({
  full_name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_no: Yup.string(),
  subject: Yup.string().required("Please select PR interest"),
  message: Yup.string().required("Message is required"),
});

interface FormValues {
  full_name: string;
  message: string;
  email: string;
  subject: string;
  phone_no: string;
}

const ContactUs = () => {
  const { mutate } = useContactUs();
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const { full_name, message, email, subject, phone_no } = values;

    const payload = {
      full_name,
      subject,
      email,
      phone_no,
      message,
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
        full_name: "",
        subject: "",
        email: "",
        phone_no: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
          <div className="bg-secondary px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            <p className="text-white font-semibold italic font-sm">
              Please fill the below form with accurate details and we would
              contact you
            </p>
          </div>

          <div className="px-6 py-8 space-y-6">
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <Field
                name="full_name"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.full_name && touched.full_name
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
              />
              <ErrorMessage
                name="full_name"
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
                Phone Number (optional)
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
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <Field
                name="subject"
                type="text"
                className={`block w-full px-4 py-3 rounded-md border ${
                  errors.subject && touched.subject
                    ? "border-secondary"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-secondary transition duration-150 ease-in-out`}
              />
              <ErrorMessage
                name="subject"
                component="div"
                className="mt-1 text-sm text-secondary"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Please leave your message
              </label>
              <TiptapEditor
                content={values.message}
                onChange={(content) => setFieldValue("message", content)}
                error={!!(errors.message && touched.message)}
              />
              <ErrorMessage
                name="message"
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
                "Submit"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactUs;
