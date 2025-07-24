"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { log } from "node:console";

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
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

const InputSelect = <TData,>({
  className,
  value,
  onValueChange,
  data,
  options,
  placeholder = "Select an option",
  resetPlaceholder = "Reset to default",
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: SelectProps<TData>) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
  if (!isOpen) return;

  const timer = setTimeout(() => {
    const el = document.querySelector('[data-viewport-scroll]') as HTMLDivElement;
    
    if (!el || !fetchNextPage || !hasNextPage) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      console.log('!isFetchingNextPage:', !isFetchingNextPage);
      console.log(`${scrollTop + clientHeight >= scrollHeight - 20}`);
      if (scrollTop + clientHeight >= scrollHeight - 20 && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, 1000);

  return () => clearTimeout(timer);
}, [isOpen, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value === "all") value = "";
        onValueChange(value);
      }}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger className={cn("w-full bg-white/90 text-black", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          <SelectItem value="all" className="text-gray-400">{resetPlaceholder}</SelectItem>
          {data?.map((item, index) =>
            item[options.keyValue] !== "" ? (
              <SelectItem key={index} value={String(item[options.keyValue])}>
                {String(item[options.keyLabel])}
              </SelectItem>
            ) : null
          )}
          {isFetchingNextPage && (
            <div className="text-center py-2 text-sm text-gray-500">
              Loading...
            </div>
          )}
        </SelectContent>
    </Select>
  );
};

export default InputSelect;
