import type { ReactNode } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface ProvidersProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
