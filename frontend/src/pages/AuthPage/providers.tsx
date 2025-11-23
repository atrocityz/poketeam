import type { ReactNode } from "react"

import type { StageProviderProps } from "./contexts/stage"

import { StageProvider } from "./contexts/stage"

interface ProvidersProps {
  children: ReactNode
  stage: Omit<StageProviderProps, "children">
}

export const Providers = ({ children, stage }: ProvidersProps) => (
  <StageProvider {...stage}>{children}</StageProvider>
)
