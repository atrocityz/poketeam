import { BrowserRouter, Navigate, Route, Routes } from "react-router"

import { Layout } from "@/components/layouts"
import { AuthPage, PokemonPage, PokemonsPage, ProfilePage } from "@/pages"
import { routes } from "@/utils/config"

import { useAuth } from "./utils/contexts"

export const AuthApp = () => (
  <Routes>
    <Route element={<AuthPage />} path={routes.auth.path} />
    <Route element={<Navigate to={routes.auth.path} />} path="*" />
  </Routes>
)

export const App = () => {
  const { isAuth } = useAuth()

  return (
    <BrowserRouter>
      {!isAuth && <AuthApp />}
      {isAuth && (
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={<PokemonsPage />}
              path={routes.pokemons.path}
            />
            <Route element={<ProfilePage />} path={routes.profile.path} />
            <Route element={<PokemonPage />} path={routes.pokemon.path} />
            <Route
              element={<Navigate to={routes.pokemons.getHref()} />}
              path="*"
            />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}
