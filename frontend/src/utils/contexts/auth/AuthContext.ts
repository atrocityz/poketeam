import { createContext } from "react"

import type { User } from "@/../@types/auth"

interface AuthContextProps {
  isLoading: boolean
  user?: User
  onLogout: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  isLoading: false,
  onLogout: () => {},
})
