import { toast } from "sonner"

import type { Pokemon } from "@/../@types/pokeapi"

import { useGetPokemonQuery } from "@/utils/api/hooks"
import { dbPokemonToPokemonEntity } from "@/utils/helpers"

export const usePokemonPreviewDialog = (
  pokemonId: Pokemon["id"],
  onClose: () => void,
) => {
  const pokemonQuery = useGetPokemonQuery(
    { id: pokemonId },
    {
      options: {
        throwOnError: (error) => {
          onClose()
          toast.error(error.message)

          return true
        },
      },
    },
  )

  const pokemon =
    pokemonQuery.data && dbPokemonToPokemonEntity(pokemonQuery.data.data)

  return {
    state: {
      pokemon,
      isPokemonQueryLoading: pokemonQuery.isLoading,
    },
  }
}
