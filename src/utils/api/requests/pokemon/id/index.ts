import type { Pokemon } from "@/../@types/Pokemon/Pokemon"

import { api } from "../../../instance"

interface GetPokemonRequestConfig {
  id: Pokemon["id"]
}

export type GetPokemonConfig = AxiosRequestConfig<GetPokemonRequestConfig>

export const getPokemon = async ({ config, params }: GetPokemonConfig) => {
  const response = await api.get<Pokemon>(`pokemon/${params.id}`, config)

  return response.data
}
