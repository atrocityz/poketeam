import Cookies from "js-cookie"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "./app/App"
import { Providers } from "./app/providers"
import { getUser } from "./utils/api/requests"
import { COOKIE } from "./utils/constants"
import { useAuthStore } from "./utils/stores"

import "./main.css"

const checkAuth = async () => {
  const accessToken = Cookies.get(COOKIE.ACCESS_TOKEN)

  if (accessToken) {
    const getUserResponse = await getUser()
    useAuthStore.setState({ isLoggedIn: true, user: getUserResponse.data })
  } else {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")

    if (token) {
      Cookies.set(COOKIE.ACCESS_TOKEN, token)
      const getUserResponse = await getUser()
      useAuthStore.setState({ isLoggedIn: true, user: getUserResponse.data })
    } else {
      useAuthStore.setState({ isLoggedIn: false })
    }
  }
}

const init = async () => {
  await checkAuth()

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>,
  )
}

init()
