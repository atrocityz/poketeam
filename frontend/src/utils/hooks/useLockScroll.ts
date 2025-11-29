import { useEffect } from "react"

export const useLockScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      document.documentElement.style.overflowY = "hidden"
    }

    return () => {
      document.documentElement.style.overflowY = ""
    }
  }, [isLocked])
}
