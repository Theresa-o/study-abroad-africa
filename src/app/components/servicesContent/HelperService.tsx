import { Service } from "@/app/types/services/services";
import { BasicPage } from "../shared/sharedPages/BasicPage";

export const ServiceHeader = ({
  service,
  category,
}: {
  service: Service;
  category: string;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4">
      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    </div>
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
    <p className="text-xl text-gray-600">{service.description}</p>
  </div>
);

export const BasicServicePage = ({
  service,
  category,
}: {
  service: Service;
  category: string;
}) => (
  <BasicPage
    title={service.title}
    description={service.description}
    category={category}
  />
);
