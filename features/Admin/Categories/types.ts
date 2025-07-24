import { UseFormReturn } from "react-hook-form";
import { ICategorySchema } from "@/schema/category";

export interface DialogForm {
  action: string
  form: UseFormReturn<ICategorySchema, any>;
  isOpen: boolean;
  isPendingAdd: boolean;
  isPendingUpdate: boolean;
  setIsOpen: (open: boolean) => void;
  mutateAdd: (values: { name: string }) => void;
  mutateEdit: (values: { name: string }) => void;
}


type Column<TData> = {
  header: string;
  accessorKey: keyof TData | string;
  cell?: (row: TData) => React.ReactNode;
  className?: string;
};

export interface DataTableProps<TData> {
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