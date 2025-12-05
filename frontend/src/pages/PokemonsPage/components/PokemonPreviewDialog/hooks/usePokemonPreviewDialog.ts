import type { Pokemon } from "@/../@types/pokeapi"

import { useGetPokemonQuery } from "@/utils/api/hooks"
import { dbPokemonToPokemonEntity } from "@/utils/helpers"

export const usePokemonPreviewDialog = (pokemonId: Pokemon["id"]) => {
  const pokemonQuery = useGetPokemonQuery({ id: pokemonId })

  const pokemon =
    pokemonQuery.data && dbPokemonToPokemonEntity(pokemonQuery.data.data)

  return {
    state: {
      pokemon,
      isPokemonQueryLoading: pokemonQuery.isLoading,
    },
  }
}
