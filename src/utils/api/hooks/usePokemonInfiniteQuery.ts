import { useInfiniteQuery } from "@tanstack/react-query"

import { getPokemons } from "../requests"

interface UsePokemonInfiniteQuery {
  limit: number
}

export const usePokemonInfiniteQuery = ({ limit }: UsePokemonInfiniteQuery) =>
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
