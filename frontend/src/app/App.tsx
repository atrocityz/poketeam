import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { Toaster } from "sonner"

import { SpinnerIcon } from "@/components/icons"
import { Layout } from "@/components/layouts"
import { AuthPage, PokemonPage, PokemonsPage, TeamPage } from "@/pages"
import { routes } from "@/utils/config"
import { useAuthStore, useThemeStore } from "@/utils/stores"

export const AuthApp = () => (
  <Routes>
    <Route element={<AuthPage />} path={routes.auth.path} />
    <Route element={<Navigate to={routes.auth.path} />} path="*" />
  </Routes>
)

export const App = () => {
  const { isLoggedIn, isLoading } = useAuthStore()
  const theme = useThemeStore((state) => state.theme)

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <SpinnerIcon className="h-20 w-20 animate-spin" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      {!isLoggedIn && <AuthApp />}
      {isLoggedIn && (
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={<PokemonsPage />}
              path={routes.pokemons.path}
            />
            <Route element={<TeamPage />} path={routes.team.path} />
            <Route element={<PokemonPage />} path={routes.pokemon.path} />
            <Route
              element={<Navigate to={routes.pokemons.getHref()} />}
              path="*"
            />
          </Route>
        </Routes>
      )}
      <Toaster theme={theme} />
    </BrowserRouter>
  )
}
