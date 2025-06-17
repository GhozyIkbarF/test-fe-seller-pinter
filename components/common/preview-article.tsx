import { formatDateTime } from "@/lib/utils"
import Image from "next/image";
import ArticleCard from "@/components/common/article-card";
import { Article } from "@/features/User/Articles/type";

type PreviewArticleProps = {
        title: string;
        content: string;
        imageUrl?: string;
        createdAt: string;
        user: {
            username: string;
        };
        articles?: Article[];

};
const PreviewArticle = (article: PreviewArticleProps) => {
    return (
    <div className="bg-white pt-10">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2">
          <div className="fllex justify-center items-center">
            <span className="text-sm text-gray-500">
              {formatDateTime(article.createdAt, "MMM dd, yyyy")}
            </span>
            <span className="mx-2 text-gray-500">|</span>
            <span className="text-sm text-gray-500">
              Created by {article.user.username}
            </span>
          </div>
          <h1 className="text-3xl font-semibold text-center">
            {article.title}
          </h1>
        </div>
        <div className="py-8">
          <div className="relative h-80 w-full mb-6">
            <Image
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-[12px]"
            />
          </div>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
        <div className="pt-10 pb-24">
          <h2 className="text-xl font-semibold mb-6">Other Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-[60px]">
            {article.articles?.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </div>
    </div>
    )
}

export default PreviewArticle;