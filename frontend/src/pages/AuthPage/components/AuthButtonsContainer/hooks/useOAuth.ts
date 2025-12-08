import Cookies from "js-cookie"
// hooks/useOAuth.ts
import { useEffect } from "react"

import { COOKIE } from "@/utils/constants"
import { useAuthStore } from "@/utils/stores"

export const useOAuth = () => {
  useEffect(() => {
    const handleOAuthMessage = async (event: MessageEvent) => {
      if (event.data?.type === "OAUTH_SUCCESS") {
        const { token, user } = event.data

        Cookies.set(COOKIE.ACCESS_TOKEN, token)
        useAuthStore.setState({ isLoggedIn: true, user })
      }
    }

    window.addEventListener("message", handleOAuthMessage)
    return () => window.removeEventListener("message", handleOAuthMessage)
  }, [])

  const openOAuthPopup = (provider: "github" | "google") => {
    const width = 500
    const height = 600
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    const url = `${import.meta.env.VITE_API_URL}/auth/${provider}/login`

    window.open(
      url,
      `oauth-${provider}`,
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes`,
    )
  }

  return { openOAuthPopup }
}
