import type { UseQueryOptions } from "@tanstack/react-query"

import { useQuery } from "@tanstack/react-query"

import { POKEMONS } from "@/utils/constants"
import { QUERY_KEYS } from "@/utils/constants/queries"

import { getPokemons } from "../requests"

export const useGetLastPokemonIdUrlQuery = (
  options?: UseQueryOptions<string>,
) =>
  useQuery({
    queryKey: [QUERY_KEYS.POKEMON.GET_LAST_POKEMON_ID_URL],
    queryFn: async () => {
      const countResponse = await getPokemons({
        params: { limit: 1, offset: 0 },
      })
      const safeOffset = Math.max(
        POKEMONS.SAFE_POKEMON_COUNT,
        countResponse.data.count - 1,
      )

      const lastResponse = await getPokemons({
        params: { limit: 1, offset: safeOffset },
      })

      return lastResponse.data.results[0].url
    },
    ...options,
  })
