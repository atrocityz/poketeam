import { useQuery } from "@tanstack/react-query"

import type { Pokemon } from "@/../@types/Pokemon/Pokemon"

import { getPokemon } from "../requests/pokemon/id"

interface UseRequestPokemonQuery {
  id: Pokemon["id"]
}

export const useRequestPokemonQuery = ({ id }: UseRequestPokemonQuery) =>
  useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemon({ params: { id } }),
  })
