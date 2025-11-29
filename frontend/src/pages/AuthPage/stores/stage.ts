import { create } from "zustand"

export type Stage = "login" | "register"

interface StageStoreState {
  stage: Stage
  setStage: (stage: Stage) => void
}

export const useStageStore = create<StageStoreState>()((set) => ({
  stage: "login",
  setStage: (stage) => set({ stage }),
}))
