import type { ReactNode } from "react"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { queryClient } from "../utils/lib"

interface ProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
