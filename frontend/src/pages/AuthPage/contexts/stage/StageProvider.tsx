import { useMemo, useState } from "react"

import type { Stage } from "./StageContext"

import { StageContext } from "./StageContext"

export interface StageProviderProps {
  children: React.ReactNode
  defaultStage?: Stage
}

export const StageProvider = ({
  children,
  defaultStage = "login",
}: StageProviderProps) => {
  const [stage, setStage] = useState<Stage>(defaultStage)

  const value = useMemo(() => ({ stage, setStage }), [stage])

  return <StageContext value={value}>{children}</StageContext>
}
