import type { ReactNode } from "react"

import { SpinnerIcon } from "../icons"

interface LoaderSwapProps {
  children: ReactNode
  isLoading: boolean
}

export const LoaderSwap = ({ isLoading, children }: LoaderSwapProps) =>
  isLoading ? <SpinnerIcon className="animate-spin" /> : children
