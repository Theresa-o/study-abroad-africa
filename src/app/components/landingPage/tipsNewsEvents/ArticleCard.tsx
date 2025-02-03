import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  comments: number;
  category: string;
  image: string;
  href: string;
}

const ArticleCard = ({
  title,
  excerpt,
  date,
  comments,
  category,
  image,
  href,
}: ArticleCardProps) => {
  return (
    <Link href={href}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-[200px] w-full overflow-hidden">
          {/* <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          /> */}
          <Image
            src="/images/landing-page-bg.jpg"
            alt="Background"
            fill
            className="rounded-md object-cover"
            // udate the sizes attribute to match the image dimensions
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-4 left-4 bg-pink-500 hover:bg-pink-600">
            {category}
          </Badge>
        </div>
        <CardHeader>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {date}
            </div>
            <div className="flex items-center">
              <MessageCircle className="mr-1 h-4 w-4" />
              {comments} comments
            </div>
          </div>
          <h3 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-blue-600">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">{excerpt}</p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-blue-600 font-medium group">
            Read more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArticleCard;
