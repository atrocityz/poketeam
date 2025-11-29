import Cookies from "js-cookie"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "./App"
import { Providers } from "./providers"
import { getUser } from "./utils/api/requests"
import { COOKIE } from "./utils/constants"
import { useAuthStore } from "./utils/stores"

import "./main.css"

const init = async () => {
  const accessToken = Cookies.get(COOKIE.ACCESS_TOKEN)

  if (accessToken) {
    const getUserResponse = await getUser({})
    useAuthStore.setState({ isLoggedIn: true, user: getUserResponse.data })
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>,
  )
}

init()
