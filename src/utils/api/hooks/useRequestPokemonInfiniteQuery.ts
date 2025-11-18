import { useInfiniteQuery } from "@tanstack/react-query"

import { getPokemons } from "../requests"

interface UseRequestPokemonInfiniteQuery {
  limit: number
}

export const useRequestPokemonInfiniteQuery = ({
  limit,
}: UseRequestPokemonInfiniteQuery) =>
  useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam }) =>
      getPokemons({
        params: {
          offset: pageParam,
          limit,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (_lastPage, pages) => pages.length * limit,
  })
