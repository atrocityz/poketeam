import type { UseQueryOptions } from "@tanstack/react-query"

import { useQuery } from "@tanstack/react-query"

import { POKEMONS_QUERY } from "@/utils/constants"

import { getPokemons } from "../requests"

export const useGetLastPokemonIdUrlQuery = (
  options?: UseQueryOptions<string>,
) =>
  useQuery({
    queryKey: ["lastPokemonIdUrl"],
    queryFn: async () => {
      const countResponse = await getPokemons({
        params: { limit: 1, offset: 0 },
      })
      const safeOffset = Math.max(
        POKEMONS_QUERY.SAFE_POKEMON_COUNT,
        countResponse.data.count - 1,
      )

      const lastResponse = await getPokemons({
        params: { limit: 1, offset: safeOffset },
      })

      return lastResponse.data.results[0].url
    },
    ...options,
  })
