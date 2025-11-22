import type { HTMLAttributes, ReactElement, ReactNode } from "react"

import React from "react"
import { twMerge } from "tailwind-merge"

export type AsChildProps<BaseProps, SecondaryProps> =
  | ({ asChild: true; children: ReactNode } & BaseProps)
  | ({ asChild?: false } & BaseProps & SecondaryProps)

interface SlotProps {
  children: ReactNode
}

export const Slot = ({
  children,
  ...props
}: HTMLAttributes<HTMLElement> & SlotProps) => {
  const child = children as ReactElement<HTMLAttributes<HTMLElement>>

  if (React.isValidElement(child)) {
    // eslint-disable-next-line react/no-clone-element
    return React.cloneElement(child, {
      ...props,
      ...child.props,
      style:
        props.style || child.props.style
          ? {
              ...props.style,
              ...child.props.style,
            }
          : undefined,
      className:
        props.className || child.props.className
          ? twMerge(props.className, child.props.className)
          : undefined,
    })
  }
  return null
}
