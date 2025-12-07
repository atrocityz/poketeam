import type { AxiosRequestConfig } from "axios"

import type { Pokemon } from "@/../@types/pokeapi"

import { pokeApi } from "../../../instance"

export interface GetPokemonByIdParams {
  id: Pokemon["id"]
}

interface GetPokemonByIdRequestConfig {
  config?: AxiosRequestConfig
  params: GetPokemonByIdParams
}

export const getPokemon = ({ config, params }: GetPokemonByIdRequestConfig) =>
  pokeApi.get<Pokemon>(`pokemon/${params.id}`, config)
