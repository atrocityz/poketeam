import type { ReactNode } from "react"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useEffect } from "react"

import { useThemeStore } from "@/utils/stores"

import { queryClient } from "../utils/lib"

interface ProvidersProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    root.classList.add(theme)
  }, [theme])

  return <>{children}</>
}

export const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>{children}</ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
