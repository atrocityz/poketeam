import type { Pokemon, PokemonStat, PokemonType } from "../pokeapi"

export interface User {
  avatarUrl: string
  createdAt: Date
  email: string
  id: string
  login?: string
  updatedAt: Date
}

export interface PokemonEntity {
  id: Pokemon["id"]
  img: string
  name: string
  stats: PokemonStat[]
  types: PokemonType[]
}

export interface Team {
  id: string
  pokemons: PokemonEntity[]
  userId: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface ErrorResponse {
  error: string
  message: string
  statusCode: number
}
