import { BrowserRouter, Route, Routes } from "react-router"

import { AuthPage, PokemonPage, PokemonsPage } from "@/pages"
import { routes } from "@/utils/config"

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<PokemonsPage />} path={routes.pokemons.path} />
      <Route element={<PokemonPage />} path={routes.pokemon.path} />
      <Route element={<AuthPage />} path={routes.auth.path} />
    </Routes>
  </BrowserRouter>
)
