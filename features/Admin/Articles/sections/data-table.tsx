'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import Pagination from "@/components/common/pagination";
import InputSearch from "@/components/common/input-search";
import InputSelect from "@/components/common/input-select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DataTableLoader from "@/components/common/data-table-loader";
import Link from "next/link"
import { useGetInfiniteCategories } from "@/useCases/CategoryUseCases";

type CategoryOption = {
  name: string;
};

type Column<TData> = {
  header: string;
  accessorKey: keyof TData | string;
  cell?: (row: TData) => React.ReactNode;
  className?: string;
};

interface DataTableProps<TData> {
  columns: Column<TData>[];
  data: TData[];
  totalData?: number;
  isLoading: boolean;
  limit: number;
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  category?: string;
  setCategory?: (value: string) => void;
  totalPages: number;
  deleteData?: (id: string) => void;
  setIsEdit?: (value: boolean) => void;
  setIsDialogOpen?: (value: boolean) => void;
}

export function DataTable<TData>({
  columns,
  data,
  totalData,
  isLoading,
  limit,
  searchQuery,
  setSearchQuery,
  page,
  setPage,
  category,
  setCategory,
  totalPages,
}: DataTableProps<TData>) {

  const {
        data: categoriesData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
      } = useGetInfiniteCategories({ limit: 9 });
      const categoryOptions = categoriesData?.pages.flatMap((p) => p.data) ?? [];
  

  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Total Articles: {totalData}</h2>
        </div>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex space-x-2">
            <InputSelect<CategoryOption>
              value={category || ""}
              onValueChange={(value) => {
                if (value === "all") {
                  value = "";
                }
                setCategory && setCategory(value);
              }}
              data={categoryOptions}
              options={{
                keyLabel: "name",
                keyValue: "name",
              }}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              placeholder="Category"
              resetPlaceholder="All Categories"
              className="w-48"
            />
            <InputSearch
              value={searchQuery || ""}
              onChange={(value) => setSearchQuery && setSearchQuery(value)}
              placeholder="Search articles..."
              className="w-64"
            />
          </div>
          <div>
            <Link href='/admin/articles/add'>
              <Button
                variant="secondary"
              >
                <Plus />
                Add Article
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {columns.map((column) => (
              <TableHead
                key={column.accessorKey as string}
                className="text-center border-b border-gray-200"
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <DataTableLoader
              tableLength={columns.length}
              className="max-w-40"
            />
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center p-6">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data?.map((item, index) => (
              <TableRow key={index}>
                {columns?.map((column) => (
                  <TableCell
                    key={column.accessorKey as string}
                    className={column.className}
                  >
                    {column.cell
                      ? column.cell(item)
                      : typeof column.accessorKey === "string"
                      ? (item as any)[column.accessorKey]
                      : item[column.accessorKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter className="bg-gray-50 p-6 border-t border-gray-200">
          <TableRow>
            <TableCell colSpan={columns.length} className="p-2.5 text-center">
              {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                limit={limit}
                onPageChange={(newPage) => {
                  if (newPage !== page) {
                    setPage(newPage);
                  }
                }}
              />
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
