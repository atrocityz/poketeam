import { BrowserRouter, Route, Routes } from "react-router"

import { AuthPage, PokemonPage, PokemonsPage, ProfilePage } from "@/pages"
import { routes } from "@/utils/config"

import { ProtectedRoute } from "./ProtectedRoute"

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<PokemonsPage />} path={routes.pokemons.path} />
        <Route element={<ProfilePage />} path={routes.profile.path} />
      </Route>
      <Route element={<PokemonPage />} path={routes.pokemon.path} />
      <Route element={<AuthPage />} path={routes.auth.path} />
    </Routes>
  </BrowserRouter>
)
