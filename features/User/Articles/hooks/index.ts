import { useState } from "react";
import { useGetArticles } from "@/useCases/ArticleUseCases";
import { useSearch } from "@/hooks/useSearch";

type UseArticlesFeatureProps = {
  userId?: string;
  limitPage?: number;
};

export const UseArticlesFreature = ({
  userId = "",
  limitPage = 9,
}: UseArticlesFeatureProps) => {
  const {
    page,
    limit,
    debouncedSearch,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useSearch({
    initPage: 1,
    initLimit: limitPage,
    delay: 1000,
  });
  const [category, setCategory] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const { data, isLoading } = useGetArticles(
    page,
    limit,
    category,
    debouncedSearch,
    userId
  );

  return {
    page,
    limit,
    category,
    data,
    isLoading,
    searchQuery,
    selectedId,
    isOpenAlert,
    setPage,
    setCategory,
    setSearchQuery,
    setSelectedId,
    setIsOpenAlert,
  };
};
