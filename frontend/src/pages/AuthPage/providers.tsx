import type { ReactNode } from "react"

import type { StageProviderProps } from "./contexts/stage"

import { StageProvider } from "./contexts/stage"

interface AuthPageProvidersProps {
  children: ReactNode
  stage: Omit<StageProviderProps, "children">
}

export const AuthPageProviders = ({
  children,
  stage,
}: AuthPageProvidersProps) => (
  <StageProvider {...stage}>{children}</StageProvider>
)
