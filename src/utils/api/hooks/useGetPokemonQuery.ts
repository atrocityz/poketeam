import { useQuery } from "@tanstack/react-query"

import type { GetPokemonParams } from "../requests/pokemon/id"

import { getPokemon } from "../requests/pokemon/id"

export const useGetPokemonQuery = (
  params: GetPokemonParams,
  settings?: QuerySettings<typeof getPokemon>,
) =>
  useQuery({
    queryKey: ["pokemon", params.id],
    queryFn: () => getPokemon({ params, config: settings?.config }),
    ...settings?.options,
  })
