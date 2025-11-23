import type { Pokemon } from "@/../@types/pokeapi"

export const formatPokemonId = (id: Pokemon["id"]) => {
  const formattedId = String(id).padStart(3, "0")

  return `#${formattedId}`
}
