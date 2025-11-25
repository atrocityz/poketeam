import { BrowserRouter, Navigate, Route, Routes } from "react-router"

import { Layout } from "@/components/layouts"
import { PageLoader } from "@/components/ui"
import { AuthPage, PokemonPage, PokemonsPage, ProfilePage } from "@/pages"
import { routes } from "@/utils/config"
import { useAuth } from "@/utils/contexts"

export const App = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <BrowserRouter>
      {!user && <AuthPage />}
      {user && (
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={<PokemonsPage />}
              path={routes.pokemons.path}
            />
            <Route element={<ProfilePage />} path={routes.profile.path} />
            <Route element={<PokemonPage />} path={routes.pokemon.path} />
            <Route element={<Navigate to={routes.pokemons.path} />} path="*" />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}
