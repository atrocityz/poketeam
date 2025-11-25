import { useEffect } from "react"

export const useLockScroll = (isLocked: boolean) => {
  useEffect(() => {
    document.documentElement.style.overflowY = isLocked ? "hidden" : "auto"

    return () => {
      document.documentElement.style.overflowY = "auto"
    }
  }, [isLocked])
}
