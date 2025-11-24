import { createContext } from "react"

export type Stage = "login" | "register"

export interface StageContextProps {
  stage: Stage
  setStage: (stage: Stage) => void
}

export const StageContext = createContext<StageContextProps>({
  stage: "login",
  setStage: () => {},
})
