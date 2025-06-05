import { Testimonial } from "@/app/types/services/services";
import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import Image from "next/image";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({
  testimonials,
}: TestimonialsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-gray-600">
          Real experiences from satisfied customers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-gray-600 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
