import type { Pokemon } from "@/../@types/pokeapi"

export const routes = {
  pokemons: {
    path: "/",
    getHref: () => "/",
  },
  profile: {
    path: "/profile",
    getHref: () => "/profile",
  },
  pokemon: {
    path: "/pokemon/:pokemonId",
    getHref: (id: Pokemon["id"]) => `/pokemon/${id}`,
  },
  auth: {
    path: "/auth",
    getHref: () => "/auth",
  },
} as const
