import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Stage = "login" | "register"

interface StageStoreState {
  stage: Stage
  setStage: (stage: Stage) => void
}

export const useStageStore = create<StageStoreState>()(
  persist(
    (set) => ({
      stage: "login",
      setStage: (stage) => set({ stage }),
    }),
    {
      name: "stage",
    },
  ),
)
