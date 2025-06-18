import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setTitle } from "@/store/slices/counterSlice";


export const useRoute = () => {
  const [openHeader, setOpenHeader] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const pathname = usePathname() || "";

  const normalizePath = (path: string, depth: number) => {
    return path.split("/").slice(0, depth).join("/");
  };

  const handleHeaderClick = (href: string) => {
    const length = href.split("/").length;
    const currentPathname = normalizePath(href, length);
    setOpenHeader((prev) =>
      prev == null || prev == ""
        ? href
        : normalizePath(prev, length) === currentPathname
        ? normalizePath(prev, length-1)
        : currentPathname
    );
  };

  const handleSetHeader = (title: string) => {
    dispatch(setTitle(title));
  };

  const isActive = (href: string): boolean => {
    const length = href.split("/").length;
    const currentPath = normalizePath(pathname, length);
    return currentPath === href;
  };
  return {
    openHeader,
    setOpenHeader,
    handleHeaderClick,
    isActive,
    handleSetHeader,
  };
};
