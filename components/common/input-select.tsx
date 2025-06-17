import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Options<TData> = {
  keyValue: keyof TData;
  keyLabel: keyof TData;
};

export interface SelectProps<TData> {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  data: TData[];
  options: Options<TData>;
  placeholder?: string;
  resetPlaceholder?: string;
}

const InputSelect = <TData,>({
  className,
  value,
  onValueChange,
  data,
  options,
  placeholder = "Select an option",
  resetPlaceholder = "Reset to default",
}: SelectProps<TData>) => {

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value === "all") {
          value = "";
        }
        onValueChange(value);
      }}
    >
      <SelectTrigger className={cn("w-full bg-white/90 text-black", className)}>
        <SelectValue placeholder={placeholder} className="text-black" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>{resetPlaceholder}</SelectItem>
        {data?.map((item, index) => (
          item[options.keyValue] !== "" ?
          <SelectItem
            key={index}
            value={String(item[options.keyValue])}
          >
            {String(item[options.keyLabel])}
          </SelectItem>
          : null
        ))}
      </SelectContent>
    </Select>
  );
};

export default InputSelect;
