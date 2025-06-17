import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "./button"


function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function InputPassword({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [show, setShow] = React.useState(false)
  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        className={cn("placeholder:text-muted-foreground", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShow(!show)}
        className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
        tabIndex={-1}
      >
        {show ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
      </Button>
    </div>
  )
}

export { Input, InputPassword }
