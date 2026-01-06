import Cookies from "js-cookie"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

import { getUser } from "@/utils/api/requests"
import { COOKIE } from "@/utils/constants"
import { useAuthStore } from "@/utils/stores"

type OAuthProvider = "github" | "google"

interface OAuthSuccessMessage {
  accessToken: string
  type: "oauth-success"
}

interface OAuthErrorMessage {
  error: string
  type: "oauth-error"
}

type OAuthMessage = OAuthErrorMessage | OAuthSuccessMessage

const POPUP_WIDTH = 500
const POPUP_HEIGHT = 600

const PROVIDER_NAMES: Record<OAuthProvider, string> = {
  github: "GitHub",
  google: "Google",
}

const getPopupPosition = () => {
  const left = window.screenX + (window.outerWidth - POPUP_WIDTH) / 2
  const top = window.screenY + (window.outerHeight - POPUP_HEIGHT) / 2
  return { left, top }
}

export const useOAuthPopup = () => {
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(
    null,
  )
  const popupRef = useRef<Window | null>(null)
  const checkIntervalRef = useRef<number | null>(null)
  const authCompletedRef = useRef(false)

  const { setIsLoggedIn, setUser } = useAuthStore()

  const clearPopupCheck = useCallback(() => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current)
      checkIntervalRef.current = null
    }
  }, [])

  const handleOAuthSuccess = useCallback(
    async (accessToken: string) => {
      authCompletedRef.current = true
      clearPopupCheck()

      Cookies.set(COOKIE.ACCESS_TOKEN, accessToken)

      try {
        const userResponse = await getUser()
        setUser(userResponse.data)
        setIsLoggedIn(true)
        toast.success("Successful login to account")
      } catch {
        Cookies.remove(COOKIE.ACCESS_TOKEN)
        toast.error("Failed to get user data")
      } finally {
        setLoadingProvider(null)
      }
    },
    [setIsLoggedIn, setUser, clearPopupCheck],
  )

  const handleOAuthError = useCallback(
    (errorMessage: string) => {
      authCompletedRef.current = true
      clearPopupCheck()
      setLoadingProvider(null)
      toast.error(errorMessage || "Authentication failed")
    },
    [clearPopupCheck],
  )

  const handlePopupClosed = useCallback(
    (provider: OAuthProvider) => {
      if (!authCompletedRef.current) {
        toast.info(`Login with ${PROVIDER_NAMES[provider]} was cancelled`)
      }
      setLoadingProvider(null)
      clearPopupCheck()
    },
    [clearPopupCheck],
  )

  const handleMessage = useCallback(
    (event: MessageEvent<OAuthMessage>) => {
      if (event.origin !== window.location.origin) {
        const apiOrigin = new URL(import.meta.env.VITE_API_URL).origin
        if (event.origin !== apiOrigin) return
      }

      if (event.data?.type === "oauth-success" && event.data.accessToken) {
        handleOAuthSuccess(event.data.accessToken)
      } else if (event.data?.type === "oauth-error" && event.data.error) {
        handleOAuthError(event.data.error)
      }
    },
    [handleOAuthSuccess, handleOAuthError],
  )

  useEffect(() => {
    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [handleMessage])

  useEffect(() => {
    return () => {
      clearPopupCheck()
    }
  }, [clearPopupCheck])

  const openOAuthPopup = useCallback(
    (provider: OAuthProvider) => {
      authCompletedRef.current = false
      setLoadingProvider(provider)

      const { left, top } = getPopupPosition()
      const features = `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`

      popupRef.current = window.open(
        `${import.meta.env.VITE_API_URL}/auth/${provider}/login`,
        `oauth-${provider}`,
        features,
      )

      if (!popupRef.current || popupRef.current.closed) {
        setLoadingProvider(null)
        toast.error(
          "Popup was blocked. Please allow popups for this site and try again",
        )
        return
      }

      clearPopupCheck()

      checkIntervalRef.current = window.setInterval(() => {
        if (popupRef.current?.closed) {
          handlePopupClosed(provider)
        }
      }, 500)
    },
    [clearPopupCheck, handlePopupClosed],
  )

  return {
    isOAuthLoading: loadingProvider !== null,
    loadingProvider,
    openOAuthPopup,
  }
}
