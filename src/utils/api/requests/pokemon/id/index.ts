import type { Pokemon } from "@/../@types/Pokemon/Pokemon"

import { api } from "../../../instance"

export interface GetPokemonParams {
  id: Pokemon["id"]
}

export type GetPokemonRequestConfig = AxiosRequestConfig<GetPokemonParams>

export const getPokemon = ({ config, params }: GetPokemonRequestConfig) =>
  api.get<Pokemon>(`pokemon/${params.id}`, config)
