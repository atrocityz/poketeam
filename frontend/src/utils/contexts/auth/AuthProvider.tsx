import type { ReactNode } from "react"

import Cookies from "js-cookie"
import { useMemo, useState } from "react"

import { COOKIE } from "@/utils/constants"

import { AuthContext } from "./AuthContext"

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    !!Cookies.get(COOKIE.ACCESS_TOKEN),
  )

  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth])

  return <AuthContext value={value}>{children}</AuthContext>
}
