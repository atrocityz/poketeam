import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"

import { cva } from "class-variance-authority"

import { cn } from "@/utils/lib"

import type { AsChildProps } from "./Slot"

import { Slot } from "./Slot"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md cursor-pointer",
  {
    variants: {
      variant: {
        default: "border border-gray-200 px-3 py-2 bg-gray-200",
        ghost: "border border-gray-200 px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type ButtonProps = AsChildProps<
  {
    children: ReactNode
    className?: string
  } & VariantProps<typeof buttonVariants>,
  ComponentProps<"button">
>

export const Button = ({
  className,
  children,
  variant,
  asChild,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button"

  return (
    <Component
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}
