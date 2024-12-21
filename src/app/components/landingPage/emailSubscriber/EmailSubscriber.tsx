"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

const formSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  consent: Yup.boolean()
    .required("You must agree to the data collection")
    .oneOf([true], "You must agree to the data collection"),
});

interface FormValues {
  email: string;
  consent: boolean;
}

interface FormStatus {
  success?: boolean;
  error?: string;
}

const EmailSubscriber = () => {
  const onSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      setStatus,
      resetForm,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setStatus: (status: FormStatus) => void;
      resetForm: () => void;
    }
  ) => {
    setSubmitting(true);
    try {
      // Here you would typically send the data to your API
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call

      setStatus({ success: true });
      resetForm(); // Clear the form after successful submission
    } catch (error) {
      setStatus({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold text-navy-900">
          Change Your Life Now!
        </h2>
        <p className="text-xl text-gray-600">
          Want to know how will immigration affect you?
        </p>
        <Formik
          initialValues={{ email: "", consent: false }}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, status, errors, touched }) => (
            <Form className="space-y-4">
              <div className="flex max-w-md mx-auto">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your e-mail"
                  className={`flex-grow p-2 border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-pink-500 hover:bg-pink-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send a request"}
                </Button>
              </div>

              {/* Email Error Message */}
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm text-center">
                  {errors.email}
                </p>
              )}

              {/* Consent Checkbox */}
              <div className="flex items-center justify-center space-x-2">
                <Field
                  type="checkbox"
                  name="consent"
                  id="consent"
                  className={`${
                    errors.consent && touched.consent
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I agree that my submitted data is being collected and stored.
                </label>
              </div>

              {/* Consent Error Message */}
              {errors.consent && touched.consent && (
                <p className="text-red-500 text-sm text-center">
                  {errors.consent}
                </p>
              )}

              {/* Success Message */}
              {status?.success && (
                <p className="text-green-500 text-sm text-center">
                  Subscribed successfully!
                </p>
              )}

              {/* Error Message */}
              {status?.error && (
                <p className="text-red-500 text-sm text-center">
                  {status.error}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default EmailSubscriber;
