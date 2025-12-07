import type { AxiosRequestConfig } from "axios"

import type { Pokemon } from "@/../@types/pokeapi"

import { pokeApi } from "../../../instance"

export interface GetPokemonByNameParams {
  name: Pokemon["name"]
}

interface GetPokemonByNameRequestConfig {
  config?: AxiosRequestConfig
  params: GetPokemonByNameParams
}

export const getPokemon = ({ config, params }: GetPokemonByNameRequestConfig) =>
  pokeApi.get<Pokemon>(`pokemon/${params.name}`, config)
