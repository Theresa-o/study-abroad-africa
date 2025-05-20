"use client";

import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { useSubscribers } from "@/app/hooks/subscribers/useSubscribers";
import { toast } from "sonner";
import { checkIfEmailExists } from "@/app/services/subscriberService";

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

type SupabaseError = {
  code: string;
  message: string;
  details?: string;
};

const EmailSubscriber = () => {
  const { mutateAsync } = useSubscribers();

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
      const emailExists = await checkIfEmailExists(values.email);
      if (emailExists) {
        toast.error("This email is already subscribed.");
        setStatus({ error: "This email is already subscribed" });
        return;
      }
      await mutateAsync(values);

      toast.success("Thank you for subscribing");
      resetForm();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        const supabaseError = err as SupabaseError;
        toast.error(supabaseError.message || "An error occurred");
        setStatus({ error: supabaseError.message });
      } else {
        toast.error("An unknown error occurred. Please try again");
        setStatus({ error: "An unknown error occurred" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold text-navy-900 font-heading">
          Change Your Life Now!
        </h2>
        <p className="text-xl text-gray-600 font-heading">
          Want to know the latest immigration information and how it affects
          you?
        </p>
        <Formik
          initialValues={{ email: "", consent: false }}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, status, errors, touched }) => (
            <Form className="space-y-4">
              <div className="flex max-w-md mx-auto">
                <Field name="email">
                  {({ field, form }: FieldProps) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="Enter your e-mail"
                      className={`flex-grow p-2 border ${
                        errors.email && touched.email
                          ? "border-primary"
                          : "border-gray-300"
                      } rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      onChange={(e) => {
                        // Clear the error status if the user is typing again
                        form.setStatus(undefined);
                        form.setFieldValue("email", e.target.value);
                      }}
                    />
                  )}
                </Field>

                <Button
                  type="submit"
                  className="rounded-l-none my-auto bg-secondary text-white hover:bg-white hover:border-secondary hover:text-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send a request"}
                </Button>
              </div>

              {/* Email Error Message */}
              {errors.email && touched.email && (
                <p className="text-secondary text-sm text-center">
                  {errors.email}
                </p>
              )}

              {/* Consent Checkbox */}
              <div className="my-2 md:flex md:items-center md:justify-center md:space-x-2">
                <Field
                  type="checkbox"
                  name="consent"
                  id="consent"
                  className={`${
                    errors.consent && touched.consent
                      ? "border-secondary"
                      : "border-gray-300"
                  }`}
                />
                <label htmlFor="consent" className="mx-2 text-sm text-gray-600">
                  I agree that my submitted data is being collected and stored.
                </label>
              </div>

              {/* Consent Error Message */}
              {errors.consent && touched.consent && (
                <p className="text-red-500 text-sm text-center">
                  {errors.consent}
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
