import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ExamCardProps {
  title: string;
  description: string;
  purpose: string;
  link: string;
}

export function ExamCard({ title, description, purpose, link }: ExamCardProps) {
  return (
    <Card className="h-full flex flex-col font-sans">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge
            variant="secondary"
            className="text-black bg-gray-100 hover:bg-transparent"
          >
            {purpose}
          </Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-end">
        <Button
          variant="outline"
          className="w-full mt-4 text-secondary border-none font-medium group hover:bg-inherit"
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            Learn More{" "}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
