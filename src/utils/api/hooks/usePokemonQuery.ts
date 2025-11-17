import { useQuery } from "@tanstack/react-query"

import type { Pokemon } from "@/../@types/Pokemon/Pokemon"

import { getPokemon } from "../requests/pokemon/id"

interface UsePokemonQuery {
  id: Pokemon["id"]
}

export const usePokemonQuery = ({ id }: UsePokemonQuery) =>
  useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemon({ params: { id } }),
  })
