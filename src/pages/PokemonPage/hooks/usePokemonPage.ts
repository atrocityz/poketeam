import { useParams } from "react-router"

import { usePokemonQuery } from "@/utils/api/hooks"
import { dbPokemonToPokemonEntity } from "@/utils/helpers"

export const usePokemonPage = () => {
  const params = useParams()
  const { data: pokemonQueryData, isLoading: isPokemonQueryLoading } =
    usePokemonQuery({
      id: +(params.pokemonId as string),
    })

  const pokemon =
    pokemonQueryData && dbPokemonToPokemonEntity(pokemonQueryData.data)

  const prevPokemonId = pokemon && Math.max(1, pokemon.id - 1)
  const nextPokemonId = pokemon && pokemon.id + 1

  return {
    state: {
      pokemon,
      isPokemonQueryLoading,
      prevPokemonId,
      nextPokemonId,
    },
  }
}
