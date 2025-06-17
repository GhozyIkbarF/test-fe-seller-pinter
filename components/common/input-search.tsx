import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type InputSearchProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
const InputSearch = ({
  className,
  value,
  onChange,
  placeholder = "Search...",
}: InputSearchProps) => {
  return (
    <div className={cn("relative w-full", className)}>
      <Input
        placeholder={placeholder}
        value={value}
        className="w-full pl-10 bg-white/90 text-black"
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="absolute z-0 left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
    </div>
  );
};

export default InputSearch;
