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
    try {
      const getUserResponse = await getUser()
      useAuthStore.setState({ isLoggedIn: true, user: getUserResponse.data })
    } catch {
      useAuthStore.setState({ isLoggedIn: false })
      Cookies.remove(COOKIE.ACCESS_TOKEN)
    }
  } else {
    useAuthStore.setState({ isLoggedIn: false })
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
