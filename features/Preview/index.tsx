import { getArticleById } from "@/services/ArticleServices";
import { getArticles } from "@/services/ArticleServices";
import { notFound } from "next/navigation";
import PreviewArticle from "@/components/common/preview-article";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ArticlePreviewFeature({ params }: Props) {
  const id = params?.slug.split("-").slice(0, 5).join("-");
  const article = await getArticleById(id);
  const articles = await getArticles(1, 3, "", "", '');

  if (!article) return notFound();

  return (
      <PreviewArticle
        title={article.title}
        content={article.content}
        imageUrl={article.imageUrl}
        createdAt={article.createdAt}
        user={{ username: article.user.username }}
        articles={articles.data}
      />
  )
}