import { Metadata } from "next";
import { getArticleById } from "@/services/ArticleServices";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params?.slug.split("-").slice(0, 5).join("-");
  const article = await getArticleById(id);

  return {
    title: article.title,
    openGraph: {
      title: article.title,
      images: article.imageUrl ? [article.imageUrl] : [],
    },
  };
}
