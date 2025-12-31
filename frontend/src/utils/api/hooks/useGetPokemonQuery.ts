import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/utils/constants/queries"

import type { GetPokemonByIdParams } from "../requests/pokemon/id"

import { getPokemon } from "../requests/pokemon/id"

export const useGetPokemonQuery = (
  params: GetPokemonByIdParams,
  settings?: QuerySettings<typeof getPokemon>,
) =>
  useQuery({
    queryKey: [QUERY_KEYS.POKEMON.GET_POKEMON, params.id],
    queryFn: () => getPokemon({ params, config: settings?.config }),
    staleTime: Infinity,
    ...settings?.options,
  })
