import { useDebounce } from "use-debounce"
import { useEffect, useState } from "react"

type UseSearchProps = {
  initPage?: number;
  initLimit?: number;
  delay?: number;
};
export const useSearch = ({initPage = 1, initLimit = 10, delay = 500}: UseSearchProps) => {
  const [limit, setLimit] = useState(initLimit || 10);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, delay);
  const [page, setPage] = useState(initPage || 1);
  
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);
    
    return {
    page,
    limit,
    searchQuery,
    setPage,
    setLimit,
    setSearchQuery,
    debouncedSearch,
    }
}

