import type { AxiosRequestConfig } from "axios"

import type { Pokemon } from "@/../@types/pokeapi"

import { pokeApi } from "../../../instance"

export interface GetPokemonParams {
  id: Pokemon["id"]
}

interface GetPokemonRequestConfig {
  config?: AxiosRequestConfig
  params: GetPokemonParams
}

export const getPokemon = ({ config, params }: GetPokemonRequestConfig) =>
  pokeApi.get<Pokemon>(`pokemon/${params.id}`, config)
