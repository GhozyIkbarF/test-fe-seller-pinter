import { getArticleById, getArticles } from "@/services/ArticleServices";
import PreviewArticle from "@/components/common/preview-article";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);
  const articles = await getArticles(1, 3, "", "", "");

  return (
    <PreviewArticle
      title={article.title}
      content={article.content}
      imageUrl={article.imageUrl}
      createdAt={article.createdAt}
      user={{ username: article.user.username }}
      articles={articles.data}
    />
  );
}
