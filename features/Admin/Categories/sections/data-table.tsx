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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import DataTableLoader from "@/components/common/data-table-loader";

type Column<TData> = {
  header: string;
  accessorKey: keyof TData | string;
  cell?: (row: TData) => React.ReactNode;
  className?: string;
};

interface DataTableProps<TData> {
  columns: Column<TData>[];
  data: TData[];
  total: number;
  isLoading: boolean;
  limit: number;
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  totalPages: number;
  setAction?: (value: string) => void;
  setIsDialogAddOpen: (value: boolean) => void;
}

export function DataTable<TData>({
  columns,
  data,
  total,
  isLoading,
  limit,
  searchQuery,
  setSearchQuery,
  page,
  setPage,
  totalPages,
  setAction,
  setIsDialogAddOpen
}: DataTableProps<TData>) {
  
  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-md font-semibold">Total Category : {total}</h2>
        </div>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex space-x-2">
            <InputSearch
              value={searchQuery || ""}
              onChange={(value) => setSearchQuery && setSearchQuery(value)}
              placeholder="Search articles..."
              className="w-64"
            />
          </div>
          <div>
            <Button variant='secondary' onClick={() => {
              setIsDialogAddOpen(true);
              setAction?.('add');
            }}>
              <Plus />
              Add Category
            </Button>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {columns.map((column) => (
              <TableHead
                key={column.accessorKey as string}
                className="text-center"
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
            data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.accessorKey as string}
                    className={cn('text-center max-w-40 whitespace-normal', column.className)}
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
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
