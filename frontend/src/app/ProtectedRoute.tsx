import type { ReactNode } from "react"

import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

import { useProfile } from "@/components/Profile/useProfile"
import { PageLoader } from "@/components/ui"
import { routes } from "@/utils/config"

interface ProtectedRouteProps {
  children?: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const { profile, isLoading } = useProfile()

  useEffect(() => {
    if (!profile && !isLoading) {
      navigate(routes.auth.getHref(), {
        replace: true,
      })
    }
  }, [profile, isLoading])

  if (isLoading || !profile) {
    return <PageLoader />
  }

  return children || <Outlet />
}
