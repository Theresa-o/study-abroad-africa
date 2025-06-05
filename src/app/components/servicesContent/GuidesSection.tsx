import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Guide {
  title: string;
  steps: string[];
}

interface GuidesSectionProps {
  guide: Guide;
}

export const GuidesSection = ({ guide }: GuidesSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{guide.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {guide.steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {index + 1}
                </span>
              </div>
              <div className="flex-grow">
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
