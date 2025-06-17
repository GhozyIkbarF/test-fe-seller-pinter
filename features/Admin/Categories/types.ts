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
