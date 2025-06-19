import ArticlePreviewFeature from "@/features/Preview";
import { Metadata } from "next";
import { getArticleById } from "@/services/ArticleServices";
import { stripHtml } from "@/lib/utils";

export async function generateMetadata({ params }: {params: Promise<{ slug: string }>}): Promise<Metadata> { 
  const { slug } = await params;
  const id = slug.split("-").slice(0, 5).join("-");
  const article = await getArticleById(id);

  return {
    title: article.title,
    description: stripHtml(article.content).slice(0, 150),
    openGraph: {
      title: article.title,
      description: stripHtml(article.content).slice(0, 150),
      images: article.imageUrl ? [article.imageUrl] : [],
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ArticlePreviewFeature params={resolvedParams} />;
}