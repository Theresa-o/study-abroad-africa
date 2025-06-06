import { BasicPageProps } from "@/app/types/shared/shared";
import Image from "next/image";

export const BasicPage = ({
  title,
  description,
  category,
  imageUrl,
  additionalContent,
}: BasicPageProps) => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      {imageUrl && (
        <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      )}

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Additional Content */}
      {additionalContent && <div className="mt-8">{additionalContent}</div>}
    </div>
  </div>
);
