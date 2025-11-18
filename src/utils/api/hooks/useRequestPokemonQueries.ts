import { useQueries } from "@tanstack/react-query"

import { getPokemon } from "../requests"

interface UseRequestPokemonQueries {
  offset: number
}

export const useRequestPokemonQueries = ({
  offset,
}: UseRequestPokemonQueries) =>
  useQueries({
    queries: Array.from({ length: offset }).map((_item, index) => {
      const pokemonId = index + 1

      return {
        queryKey: ["pokemon", pokemonId],
        queryFn: () => getPokemon({ params: { id: pokemonId } }),
      }
    }),
  })
