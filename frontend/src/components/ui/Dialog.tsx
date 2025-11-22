import type { ComponentProps, ReactNode } from "react"

import React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/utils/lib"

interface DialogProps extends ComponentProps<"dialog"> {
  children: ReactNode
  isOpen: boolean
  ref: React.RefObject<HTMLDialogElement | null>
}

export const Dialog = ({
  children,
  onClose,
  ref,
  isOpen,
  className,
  ...props
}: DialogProps) => {
  React.useEffect(() => {
    if (!ref.current) return

    if (isOpen) {
      ref.current.showModal()
    } else {
      ref.current.close()
    }
  }, [])

  return createPortal(
    <dialog
      ref={ref}
      className={cn(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
      )}
      onClose={onClose}
      {...props}
    >
      {children}
    </dialog>,
    document.body,
  )
}
