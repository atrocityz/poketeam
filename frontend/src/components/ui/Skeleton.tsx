import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/utils/lib"

interface SkeletonProps extends ComponentProps<"div"> {
  children?: ReactNode
  className?: string
}

export const Skeleton = ({ children, className }: SkeletonProps) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-gray-300/60 dark:bg-gray-300/20",
      className,
    )}
  >
    {children}
  </div>
)
