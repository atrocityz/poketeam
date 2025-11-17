import { BrowserRouter, Route, Routes } from "react-router"

import { PokemonPage, PokemonsPage } from "@/pages"
import { ROUTES } from "@/utils/constants"

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<PokemonsPage />} path={ROUTES.POKEMONS} />
      <Route element={<PokemonPage />} path={ROUTES.POKEMON} />
    </Routes>
  </BrowserRouter>
)
