import type { ComponentProps } from "react"

import { cn } from "@/utils/lib"

export const ErrorMessage = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => (
  <p className={cn("text-sm text-red-500", className)} {...props}>
    {children}
  </p>
)
