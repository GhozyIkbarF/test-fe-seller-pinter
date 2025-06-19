import { useState } from "react";
import { useGetArticles } from "@/useCases/ArticleUseCases";
import { useSearch } from "@/hooks/useSearch";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useGetInfiniteCategories } from "@/useCases/CategoryUseCases";

type UseArticlesFeatureProps = {
  userId?: string;
  limitPage?: number;
};

export const UseArticlesFreature = ({
  userId = "",
  limitPage = 9,
}: UseArticlesFeatureProps) => {
  const { page, limit, debouncedSearch, searchQuery, setPage, setSearchQuery } =
    useSearch({
      initPage: 1,
      initLimit: limitPage,
      delay: 500,
    });
  const [category, setCategory] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data, isLoading } = useGetArticles(
    page,
    limit,
    category,
    debouncedSearch,
    userId
  );

  const {
    data: categoriesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteCategories({ limit: 9 });
  const categoryOptions = categoriesData?.pages.flatMap((p) => p.data) ?? [];

  return {
    page,
    limit,
    category,
    hasNextPage,
    isFetchingNextPage,
    categoryOptions,
    data,
    isLoading,
    searchQuery,
    selectedId,
    isOpenAlert,
    isMobile,
    setPage,
    setCategory,
    fetchNextPage,
    setSearchQuery,
    setSelectedId,
    setIsOpenAlert,
  };
};
