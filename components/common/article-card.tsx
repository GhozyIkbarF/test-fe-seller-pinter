"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Article } from "@/features/User/Articles/type";
import { slugify } from "@/lib/utils";
import Link from "next/link";

const ArticleCard = (article: Article) => {
  
  return (
    <Link
      href={`/articles/${article.id}-${slugify(article.title)}`}
      className="overflow-hidden flex flex-col h-full gap-4 cursor-pointer"
    >
      <div className="relative h-48 w-full">
        <Image
          src={article.imageUrl || "/placeholder.svg"}
          alt={article.title}
          // loading="lazy"
          priority
          // sizes=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover rounded-[12px]"
        />
      </div>
      <div className="space-y-2">
        <span className="text-xs md:text-sm text-slate-600 font-normal">
          {formatDate(article.createdAt, "MMMM dd, yyyy")}
        </span>
        <h3 className="font-semibold text-md md:text-lg text-slate-900 line-clamp-2">
          {article.title}
        </h3>
        <article
          className="text-sm md:text-md text-slate-600 font-normal line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: article.content || "",
          }}
        ></article>
        <Badge className="bg-blue-200 text-blue-900 px-3.5 py-1 text-xs md:text-sm rounded-full font-normal">
          {article.category.name}
        </Badge>
      </div>
    </Link>
  );
}

export default ArticleCard;