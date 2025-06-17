"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit?: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages = 1,
  limit = 9,
  onPageChange,
}: PaginationProps) => {
  const pagesToShow = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center font-medium space-x-4 lg:space-x-6 text-sm">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center px-2 py-1 rounded disabled:text-gray-300 disabled:pointer-events-none cursor-pointer"
      >
        <ChevronLeft size={16} /> <span>Previous</span>
      </button>

      <div className="flex items-center space-x-2">
        {pagesToShow.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={cn(
              "p-3 rounded hover:bg-gray-100 cursor-pointer",
              {
                "shadow font-semibold": page === currentPage,
                "cursor-default": page === "...",
              }
            )}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center px-2 py-1 rounded disabled:text-gray-300 disabled:pointer-events-none cursor-pointer"
      >
       <span>Next</span> <ChevronRight size={16} />
      </button>
    </div>
  );
};

function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, "...", total];
  if (current >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", current, "...", total];
}

export default Pagination;