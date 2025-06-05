import { Card, CardContent } from "@/components/ui/card";

interface OverviewSectionProps {
  content: string;
}

export const OverviewSection = ({ content }: OverviewSectionProps) => {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{content}</p>
        </div>
      </CardContent>
    </Card>
  );
};
