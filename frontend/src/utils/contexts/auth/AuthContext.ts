import type { Dispatch, SetStateAction } from "react"

import { createContext } from "react"

interface AuthContextProps {
  isAuth: boolean
  setIsAuth: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  setIsAuth: () => {},
})
