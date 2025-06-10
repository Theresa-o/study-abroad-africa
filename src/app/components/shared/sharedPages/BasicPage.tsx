import { BasicPageProps } from "@/app/types/shared/shared";
import Image from "next/image";

export const BasicPage = ({
  title,
  description,
  category,
  imageUrl,
  categories,
  additionalContent,
  tags,
}: BasicPageProps) => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-8">
      {/* Display multiple categories and tags */}
      <div className="flex justify-between gap-2 mb-4 flex-wrap">
        {/* Single category display for pages with just 1 category) */}
        <div>
          {category && (!categories || categories.length <= 1) && (
            <span className="bg-secondary-foreground text-secondary text-sm font-bold px-4 py-2 rounded-full">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          )}

          {/* Multiple categories */}
          {categories?.map((cat) => (
            <span
              key={cat.id}
              className="bg-secondary-foreground text-secondary text-sm font-bold px-4 py-1 mx-2 rounded-full"
            >
              {cat?.category_name}
            </span>
          ))}
        </div>

        {/* Tags display */}
        <div>
          {tags?.map((tag) => (
            <span
              key={tag.id}
              className="bg-primary-foreground text-primary text-sm font-bold px-4 py-1 mx-2 rounded-full"
            >
              {tag.tag_name}
            </span>
          ))}
        </div>
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
