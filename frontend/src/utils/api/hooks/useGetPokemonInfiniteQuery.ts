import { useInfiniteQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/utils/constants/queries"

import type { GetPokemonsParams } from "../requests"

import { getPokemons } from "../requests"

export const useGetPokemonInfiniteQuery = (
  params: GetPokemonsParams,
  settings?: InfinityQuerySettings<typeof getPokemons>,
) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEYS.POKEMON.GET_POKEMONS],
    queryFn: ({ pageParam }) =>
      getPokemons({
        params: {
          ...params,
          offset: pageParam as number,
        },
        config: settings?.config,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.next) {
        return pages.length * params.limit
      }
    },
    ...settings?.options,
  })
