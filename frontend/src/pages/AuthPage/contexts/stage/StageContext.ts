import React from "react"

export type Stage = "login" | "register"

export interface StageContextProps {
  stage: Stage
  setStage: (stage: Stage) => void
}

export const StageContext = React.createContext<StageContextProps>({
  stage: "login",
  setStage: () => {},
})
